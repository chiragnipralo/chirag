import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multi-event',
  templateUrl: './multi-event.page.html',
  styleUrls: ['./multi-event.page.scss'],
})

export class MultiEventPage implements OnInit {
  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = '';
  public imageUrls: SafeUrl[];
  currentDate: string;

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private common: CommonService,
    private dataservice: DataService,
    private navCtrl: NavController,
    private chatconnect: HttpService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.imageUrls = [];
    const today = new Date();
    today.setDate(today.getDate());
    this.currentDate = today.toISOString().split('T')[0];
  }

  error_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
    ],
    'start_date': [
      { type: 'required', message: 'Start date is required.' },
    ],
    'end_date': [
      { type: 'required', message: 'End date is required.' },
    ]
  };

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  
    await this.GetDashboard();
  }
  
  GetDashboard() {
    return new Promise<any>((resolve, reject) => {
      let apidata = {
        user_token: this.dataservice.getUserData()
      };
      this.chatconnect.postData(apidata, "user_dashboard").then((result: any) => {
        if (result.Response.status == 1) {
          this.dataservice.events_categories = result.Response.all_categories;
          resolve(true);
        } else {
          this.common.presentToast("Oops", result.Response.message);
        }
      }, (err) => {
        console.log("Connection failed Message");
        reject(err);
      });
    });
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    
    let alertMessage = '';
  
    if (!this.ionicForm.valid) {
      if (this.ionicForm.get('title')?.hasError('required')) {
        alertMessage += 'Title is required.\n';
      }
      if (this.ionicForm.get('description')?.hasError('required')) {
        alertMessage += 'Description is required.\n';
      }
      if (this.ionicForm.get('start_date')?.hasError('required')) {
        alertMessage += 'Start date is required.\n';
      }
      if (this.ionicForm.get('end_date')?.hasError('required')) {
        alertMessage += 'End date is required.\n';
      }
      if (!this.imageUrls.length) {
        alertMessage += 'Please upload an image.\n';
      }
  
      let alert = await this.alertController.create({
        header: 'Please Enter Details',
        subHeader: alertMessage,
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    } 
    
    this.common.show("Please wait...");
    var formData = new FormData();
    formData.append('user_token', this.dataservice.getUserData()?.toString() ?? '');
  
    const eventImages: string = localStorage.getItem('event_images') ?? '';
    if (eventImages) {
      formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
    } else {
      formData.append('event_images', '');
    }
  
    formData.append('title', this.ionicForm.get('title')?.value ?? '');
    formData.append('description', this.ionicForm.get('description')?.value ?? '');
    formData.append('start_date', this.ionicForm.get('start_date')?.value ?? '');
    formData.append('end_date', this.ionicForm.get('end_date')?.value ?? '');
  
    console.log('Form Data:', formData);
    
    this.chatconnect.postFormData(formData, "multiple_event").then((result: any) => {
      this.common.hide();
      console.log('Response:', result);
      if (result.Response.status == 1) {
        this.ionicForm.reset();
        localStorage.removeItem('event_images');
        this.imageUrls = [];
        this.router.navigate(['pages/successmul', { multievent_id: result.Response.last_id }]);
      } else {
        this.common.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      this.common.hide();
      console.log("Connection failed:", err);
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
          this.dataservice.convertBase64ToBlob(data.data.cropped_image);
          if (showflag == "event") {
            this.imageUrls = [];
            this.imageUrls.unshift(data.data.cropped_image);
            localStorage.setItem("event_images", data.data.cropped_image);
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
    this.file_uploaddata = photo;
    let formData = new FormData();
    formData.append("photo", photo, photo.name);
    this.dataservice.blobToBase64(photo).then((res: any) => {
      this.dataservice.event_base64img = res;
      this.view(res, showflag);
    });

    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
      if (showflag == "event") {
        this.imageUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      }
    };
    reader.onerror = (error) => { };
  }
}
