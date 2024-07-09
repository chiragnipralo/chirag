import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { NavController, LoadingController, ModalController, AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'editcard-card',
  templateUrl: './editcard.page.html',
  styleUrls: ['./editcard.page.scss'],
})

export class EditcardPage implements OnInit {

  requestType!: number;
  fileName: string = '';
  selectedFile!: File;
  selectedImage!: FileList;
  isSubmitted = false;
  ionicForm!: FormGroup;
  showCreateButton: boolean = false;
  isBusinessModalOpen: boolean = false;
  isPersonalModalOpen: boolean = false;
  modalData: any;
  public profile_img: SafeUrl[];
  file_uploaddata = ''
  public imageUrls: SafeUrl[];
  public multiImages: SafeUrl[];
  public Blobimage: any = [];
  private sanitizer: DomSanitizer;
  selectedFiles: File[] = [];
  cardImages: any = [];
  prevImage: any;
  maxAllowedFiles!: number;

  constructor(
    sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public common: CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public successmodal: ModalController,
    public contactpagemodal: ModalController,
    public router: Router,
    private location: Location,
    private _route: ActivatedRoute,
    public alertController: AlertController,
  ) {
    this.sanitizer = sanitizer;
    this.imageUrls = [];
    this.multiImages = [];
    this.profile_img = []
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  onImageSelected(event: any) {
    if (event.target.files.length > this.maxAllowedFiles) {
      this.common.presentToast('File Limit Exceeded', `You can only select up to ${this.maxAllowedFiles} files.`);
      event.target.value = null;
    } else {
      const files: File[] = event.target.files;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = () => {
            this.cardImages.push(reader.result as string);
          };
          reader.readAsDataURL(files[i]);
          this.selectedFiles.push(files[i]);
        }
      }
    }
  }

  removeImage(index: number) {
    this.cardImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  async removePrevImage(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this Image?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            let apidata = {
              user_token: this.dataservice.getUserData(),
              card_id: this.modalData.id,
              row_id: params,
              command: "cardMultiImg",
              premium: 0,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "card_operations").then((result: any) => {
              if (result.Response.status == 1) {
                this.multiImages = [];
                this.showCard();
                this.common.presentToast("", result.Response.message);
              } else {
                this.common.presentToast("Oops", result.Response.message)
              }
            }, (err) => {
              console.log("Connection failed Messge");
            });
          }
        }
      ],
    });
    await alert.present();
  }

  capitalizeName(input: any) {
    const value = input.value;
    if (value) {
      input.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.requestType = +params['requestType'];
      console.log('Received requestType:', this.requestType);
    });

    this.ionicForm = this.formBuilder.group({
      card_type: [''],
      profile_img: [''], // Profile image field
      full_name: ['', Validators.required],
      designation: [''],
      profession: [''],
      mobile_number: ['', Validators.required],
      whatsapp_number: [''],
      landline: [],
      email: ['', [Validators.required, Validators.email]],
      email1: [''],
      email2: [''],
      user_address: [''],
      office_name: [''],
      office_address: [''],
      head_office_address: [''],
      address: [''],
      address1: [''],
      address2: [''],
      website: [''],
      facebook: [''],
      linkedin: [''],
      twitter: [''],
      instagram: [''],
      youtube: [''],
      snapchat: [''],
      about_me: [''],
      about_us: ['']
    });
    this.showCard();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  showCard() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
      request_type: this.requestType
    };

    this.chatconnect.postData(apidata, "show_card").then((result: any) => {
      console.log(result);
      if (result.Response.status == 1) {
        this.modalData = result.Response.pesonal_card;
        this.ionicForm.patchValue({
          full_name: this.modalData.user_name,
          mobile_number: this.modalData.user_contact,
          landline: this.modalData.landline_number,
          designation: this.modalData.user_designation,
          whatsapp_number: this.modalData.whatsapp_number,
          email: this.modalData.user_email,
          email1: this.modalData.email1,
          email2: this.modalData.email2,
          user_address: this.modalData.user_address,
          address: this.modalData.address,
          address1: this.modalData.address1,
          address2: this.modalData.address2,
          office_name: this.modalData.office_name,
          office_address: this.modalData.office_address,
          linkedin: this.modalData.linkedin,
          website: this.modalData.website,
          facebook: this.modalData.facebook,
          instagram: this.modalData.instagram,
          twitter: this.modalData.twitter,
          head_office_address: this.modalData.head_office_address,
          about_me: this.modalData.about_me,
          youtube: this.modalData.youtube,
          profession: this.modalData.user_profession,
          snapchat: this.modalData.snapchatId,
          about_us: this.modalData.about_us
        });

        if (this.modalData.images && Array.isArray(this.modalData.images)) {
          this.multiImages.push(
            this.modalData.images
          )

          const imageCount = this.modalData.images.length;
          this.maxAllowedFiles = 5 - imageCount;
        }

        this.imageUrls.push(
          this.modalData.user_img
        )

        console.log("This is image ==>",this.imageUrls)
        this.prevImage = this.modalData.user_img;
      } else {
        this.common.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
      this.common.presentToast("Edit Digital Card", "Failed to fetch card details. Please try again.");
    });
  }

  async view(img: any, showflag: string) {
    const modal = await this.modalController.create({
      component: ImgcropperComponent,
      cssClass: 'my-menubar',
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
        if (data.data.cropped_image) {
          this.dataservice.convertBase64ToBlob(data.data.cropped_image)
          if (showflag == "event") {
            this.imageUrls = []
            this.imageUrls.unshift(data.data.cropped_image);
            localStorage.setItem("profile_card", data.data.cropped_image);
          }
        }
      } else {
        if (this.prevImage !== null) {
          this.imageUrls = [];
          this.imageUrls.push(this.prevImage)
        } else {
          this.imageUrls = [];
        }
      }
    });
    return await modal.present();
  }

  loadImageFromDevice(event: { target: { files: any[]; }; }, showflag: string) {
    console.log(event)
    const photo = event.target.files[0];
    this.dataservice.orginalImage = photo;
    this.file_uploaddata = photo;
    let formData = new FormData();
    // Add the file that was just added to the form data
    formData.append("photo", photo, photo.name);
    this.Blobimage.push(photo);
    this.dataservice.blobToBase64(photo).then((res: any) => {
      this.dataservice.event_base64img = res
      this.view(res, showflag)
    });
    // const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
      // console.log(blob);
      if (showflag == "event") {
        this.imageUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      }
    };
    console.log(this.Blobimage);
    reader.onerror = (error) => { };
  };

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        header: '',
        subHeader: 'Please Enter Required Fileds.',
        buttons: ['Dismiss'],
      });
      alert.present();
    } else {
      this.common.show('Please Wait');
      const userToken = this.dataservice.getUserData();
      console.log(userToken);

      let formData = new FormData();
      if (userToken) {
        formData.append('user_token', userToken);
      }
      formData.append('idd', this.modalData.id);
      formData.append('user_name', this.ionicForm.value.full_name || '');
      formData.append('contact', this.ionicForm.value.mobile_number || '');
      formData.append('landline', this.ionicForm.value.landline);
      formData.append('email', this.ionicForm.value.email || '');
      formData.append('email1', this.ionicForm.value.email1);
      formData.append('email2', this.ionicForm.value.email2);
      formData.append('designation', this.ionicForm.value.designation);
      formData.append('profession', this.ionicForm.value.profession || '');
      formData.append('card_type', this.requestType.toString());
      formData.append('user_address', this.ionicForm.value.user_address || '');
      formData.append('head_office_address', this.ionicForm.value.head_office_address || '');
      formData.append('address', this.ionicForm.value.address || '');
      formData.append('address1', this.ionicForm.value.address1);
      formData.append('address2', this.ionicForm.value.address2);
      formData.append('about_me', this.ionicForm.value.about_me || '');
      formData.append('youtube', this.ionicForm.value.youtube || '');
      formData.append('facebook', this.ionicForm.value.facebook || '');
      formData.append('linkedin', this.ionicForm.value.linkedin || '');
      formData.append('twitter', this.ionicForm.value.twitter || '');
      formData.append('instagram', this.ionicForm.value.instagram || '');
      formData.append('office_name', this.ionicForm.value.office_name || '');
      formData.append('office_address', this.ionicForm.value.office_address || '');
      formData.append('website', this.ionicForm.value.website || '');
      formData.append('whatsapp_number', this.ionicForm.value.whatsapp_number || '');
      formData.append('snapchat', this.ionicForm.value.snapchat);
      formData.append('about_us', this.ionicForm.value.about_us);
      // Check if an image is selected before appending it

      const profile_card = localStorage.getItem('profile_card');
      if (profile_card !== null && !this.dataservice.isNullOrUndefined(profile_card)) {
        formData.append('profile_img', this.dataservice.convertBase64ToBlob(profile_card));
      } else {
        formData.append('prev_img', this.modalData.user_img);
      }

      this.selectedFiles.forEach((file: File) => {
        formData.append('multi_images[]', file);
      });

      this.chatconnect.postFormData(formData, 'edit_card').then(
        (result: any) => {
          console.log(result);
          this.common.hide();
          if (result.Response.status == 1) {
            localStorage.removeItem('profile_card');
            this.common.presentToast('', result.Response.message);
            this.location.back()
            //this.navCtrl.navigateForward('/profilecards');
          }
        },
        (err) => {
          this.common.hide();
          console.log('Connection failed Messge');
        }
      );
      console.log(this.ionicForm.value);
    }
  }
}