import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NavController,
  LoadingController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from "../../../services/common.service";
import { ImgcropperComponent } from "../../../components/imgcropper/imgcropper.component";
import { DataService } from "../../../services/data.service";
import { HttpService } from "../../../services/http.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = "";
  public Blobimage: any = [];
  public showMoreBar: boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  isSelectDisabled: boolean = false;

  error_messages = {
    title: [{ type: "required", message: "Title is required." }],
    category: [{ type: "required", message: "Category is required." }],
    email: [
      { type: "required", message: "Email is required." },
      { type: "email", message: "Enter a valid email." },
    ],
    contact: [
      { type: "required", message: "Contact is required." },
      { type: "pattern", message: "Contact must be 10 digits." },
    ],
  };

  constructor(
    sanitizer: DomSanitizer,
    public commonservice: CommonService,
    public formBuilder: FormBuilder,
    public common: CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public successmodal: ModalController,
    public router: Router,
    private location: Location,
    public alertController: AlertController
  ) {
    this.sanitizer = sanitizer;
    this.imageUrls = [];
  }

  async ngOnInit() {
    this.commonservice.show();
    this.ionicForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      category: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      contact: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: [""],
    });
    await this.GetDashboard();
    this.event_details();
  }

  GetDashboard() {
    return new Promise<any>((resolve, reject) => {
      let apidata = {
        user_token: this.dataservice.getUserData(),
      };
      this.chatconnect.postData(apidata, "user_dashboard").then(
        (result: any) => {
          if (result.Response.status == 1) {
            this.dataservice.events_categories = result.Response.all_categories;
            resolve(true);
          } else {
            this.common.presentToast("Oops", result.Response.message);
          }
        },
        (err) => {
          console.log("Connection failed Messge");
          reject(err);
        }
      );
    });
  }

  async view(img: any, showflag: string) {
    const modal = await this.modalController.create({
      component: ImgcropperComponent,
      cssClass: "my-menubar",
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
        if (data.data.cropped_image) {
          this.dataservice.convertBase64ToBlob(data.data.cropped_image);
          if (showflag == "event") {
            this.imageUrls = [];
            this.imageUrls.unshift(data.data.cropped_image);
            localStorage.setItem("event_images", data.data.cropped_image);
          }
        }
      }
    });
    return await modal.present();
  }

  loadImageFromDevice(event: { target: { files: any[] } }, showflag: string) {
    const photo = event.target.files[0];
    this.file_uploaddata = photo;
    let formData = new FormData();
    formData.append("photo", photo, photo.name);

    this.Blobimage.push(photo);
    this.dataservice.blobToBase64(photo).then((res: any) => {
      this.dataservice.event_base64img = res;
      this.view(res, showflag);
    });

    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);
      let blobURL: string = URL.createObjectURL(blob);
      if (showflag == "event") {
        this.imageUrls.unshift(this.sanitizer.bypassSecurityTrustUrl(blobURL));
      }
    };
    reader.onerror = (error) => {};
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        subHeader: "Please Enter all details",
        buttons: ["Dismiss"],
      });
      alert.present();
    } else {
      const userToken = this.dataservice.getUserData();
      const id = this.dataservice.GetAccountuser();

      var formData = new FormData();
      formData.append("account_id", id);
      const images = localStorage.getItem("event_images");

      if (images !== null && !this.dataservice.isNullOrUndefined(images)) {
        formData.append(
          "images",
          this.dataservice.convertBase64ToBlob(images)
        );
      }
      if (userToken !== null) {
        formData.append("user_token", userToken);
      }
      formData.append("title", this.ionicForm.get("title")?.value);
      formData.append("category", this.ionicForm.get("category")?.value);
      formData.append("email", this.ionicForm.get("email")?.value);
      formData.append("contact", this.ionicForm.get("contact")?.value);
      formData.append("address", this.ionicForm.get("address")?.value);
      formData.append("previous_image", this.dataservice.previous_img);

      this.chatconnect.postFormData(formData, "edit_paid_account").then(
        (result: any) => {
          this.common.hide();
          if (result.Response.status == 1) {
            localStorage.removeItem("event_images");
            this.common.presentToast("", result.Response.message);
            this.location.back();
          } else {
            this.common.presentToast("Oops", result.Response.message);
          }
        },
        (err) => {
          this.common.hide();
          console.log("Connection failed Messge");
        }
      );
    }
  }

  event_details() {
    const id = this.dataservice.GetAccountuser();
    let apidata = {
      user_token: this.dataservice.getUserData(),
      account_id: id,
    };

    this.chatconnect.postData(apidata, "paid_user_dashboard").then(
      (result: any) => {
        this.commonservice.hide();
        if (result.Response.status == 1) {
          const eventData = result.Response.user_data;
          this.ionicForm.patchValue({
            title: eventData.account_name,
            email: eventData.email,
            contact: eventData.contact,
            address: eventData.address,
          });

          // handle event category
          const selectedCategory = this.dataservice.events_categories.find(
            (category: any) => category.name === eventData.category
          );
          this.ionicForm.patchValue({
            category: selectedCategory ? selectedCategory.id : null,
          });

          const imageUrl = eventData.account_image;
          if (imageUrl !== null) {
            this.imageUrls.push(imageUrl);
          }
        } else {
          this.common.presentToast("Oops", result.Response.message);
        }
      },
      (err) => {
        console.log("Connection failed Message");
      }
    );
  }
}
