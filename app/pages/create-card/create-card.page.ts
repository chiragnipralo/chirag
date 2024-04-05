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

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})

export class CreateCardPage implements OnInit {
  selectedImage!: FileList;
  selectedFiles: File[] = [];
  maxAllowedFiles = 5;
  cardImages: any = [];
  requestType!: number;
  fileName: string = '';
  selectedFile!: File;
  file_uploaddata = ''
  isSubmitted = false;
  ionicForm!: FormGroup;
  selectedProfileImage: File | null = null;
  profileImageFileName: string = '';
  public Blobimage: any = [];
  public imageUrls: SafeUrl[];
  private sanitizer: DomSanitizer;

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
    private _route: ActivatedRoute,
    public alertController: AlertController
  ) {
    this.sanitizer = sanitizer;
    this.imageUrls = [];
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
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
    });

    this.ionicForm = this.formBuilder.group({
      profile_img: [''],
      full_name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      email1: [''],
      email2: [''],
      profession: [''],
      designation: [''],
      landline: [''],
      card_type: [''],
      user_address: [''],
      address: [''],
      address1: [''],
      address2: [''],
      about_me: [''],
      facebook: [''],
      linkedin: [''],
      twitter: [''],
      instagram: [''],
      office_name: [''],
      office_address: [''],
      head_office_address: [''],
      website: [''],
      whatsapp_number: [''],
      snapchat: [''],
      youtube: [''],
      about_us: [''],
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
        this.imageUrls = [];
      }
    });
    return await modal.present();
  }

  loadImageFromDevice(event: { target: { files: any[]; }; }, showflag: string) {
    const photo = event.target.files[0];
    this.dataservice.orginalImage = photo;
    this.file_uploaddata = photo;
    let formData = new FormData();
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
    reader.onerror = (error) => { };
  };

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();

    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        header: '',
        subHeader: 'Please fill the required fields..',
        buttons: ['Dismiss'],
      });
      alert.present();
    } else {
      this.common.show('Please Wait');
      const userToken = this.dataservice.getUserData();
      let formData = new FormData();
      if (userToken) {
        formData.append('user_token', userToken);
      }
      formData.append('card_type', this.requestType.toString());
      formData.append('user_name', this.ionicForm.value.full_name);
      formData.append('designation', this.ionicForm.value.designation);
      formData.append('profession', this.ionicForm.value.profession);
      formData.append('contact', this.ionicForm.value.mobile_number);
      formData.append('whatsapp_number', this.ionicForm.value.whatsapp_number);
      formData.append('landline', this.ionicForm.value.landline);
      formData.append('email', this.ionicForm.value.email);
      formData.append('email1', this.ionicForm.value.email1);
      formData.append('email2', this.ionicForm.value.email2);
      formData.append('user_address', this.ionicForm.value.user_address);
      formData.append('head_office_address', this.ionicForm.value.head_office_address);
      formData.append('address', this.ionicForm.value.address);
      formData.append('address1', this.ionicForm.value.address1);
      formData.append('address2', this.ionicForm.value.address2);
      formData.append('office_name', this.ionicForm.value.office_name);
      formData.append('office_address', this.ionicForm.value.office_address);
      formData.append('youtube', this.ionicForm.value.youtube);
      formData.append('linkedin', this.ionicForm.value.linkedin);
      formData.append('website', this.ionicForm.value.website);
      formData.append('twitter', this.ionicForm.value.twitter);
      formData.append('facebook', this.ionicForm.value.facebook);
      formData.append('instagram', this.ionicForm.value.instagram);
      formData.append('snapchat', this.ionicForm.value.snapchat);
      formData.append('about_me', this.ionicForm.value.about_me);
      formData.append('about_us', this.ionicForm.value.about_us);

      const profile_card = localStorage.getItem('profile_card');
      if (profile_card !== null && !this.dataservice.isNullOrUndefined(profile_card)) {
        formData.append('profile_img', this.dataservice.convertBase64ToBlob(profile_card));
      }

      this.selectedFiles.forEach((file: File) => {
        formData.append('multi_images[]', file);
      });

      this.chatconnect.postFormData(formData, 'create_card').then(
        (result: any) => {
          this.fileName = '';
          this.common.hide();
          if (result.Response.status == 1) {
            localStorage.removeItem('profile_card');
            this.common.presentToast('', result.Response.message);
            this.navCtrl.navigateForward('/profilecards');
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