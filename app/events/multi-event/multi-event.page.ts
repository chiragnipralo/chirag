import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { NavController,LoadingController,ModalController,AlertController, IonTextarea, IonInput } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SuccessPage } from 'src/app/events/success/success.page';

@Component({
  selector: 'app-multi-event',
  templateUrl: './multi-event.page.html',
  styleUrls: ['./multi-event.page.scss'],
})

export class MultiEventPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata=''
  public showMoreBar : boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  // public Blobimage=[];
  Blobimage: any[] = [];

  showSubmitButton = false;
  public accountType!: number;

  constructor(sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public common:CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public createv4omdal: ModalController,
    public successmodal: ModalController,
    public contactpagemodal: ModalController,
    public router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController){
    this.sanitizer = sanitizer;
    this.imageUrls = [];
    this.route.queryParams.subscribe(params => {
      this.accountType = +params['value'];
      console.log(this.accountType);
    });
  }  

  error_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
    ]
  }

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      start_date: [''],
      end_date: [''],
    })
    await this.GetDashboard()
  }

  GetDashboard(){    
    return new Promise<any>((resolve, reject) => {
      let apidata={
        user_token:this.dataservice.getUserData()
      }
      this.chatconnect.postData(apidata,"user_dashboard").then((result:any)=>{
        console.log(result);
        if(result.Response.status ==1){
          this.dataservice.events_categories =result.Response.all_categories;
          resolve(true);
        }else{
          this.common.presentToast("Oops",result.Response.message)
        }
      },(err)=>{
        console.log("Connection failed Messge");
        reject(err);
      });    
    });
  }

  async submit(){
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    console.log(this.ionicForm)
    if (!this.ionicForm.valid){
      let alert = await this.alertController.create({
        header: '',
        subHeader: 'Please Enter Details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      var formData = new FormData();
      formData.append('user_token', this.dataservice.getUserData()?.toString() ?? '');
      
      const eventImages: string = localStorage.getItem('event_images') ?? '';
      if (!this.dataservice.isNullOrUndefined(eventImages)) {
        formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
      } else {
        formData.append('event_images', '');
      }

      const titleValue = this.ionicForm.get('title')?.value ?? '';
      formData.append('title', titleValue);

      const descriptionValue = this.ionicForm.get('description')?.value ?? '';
      formData.append('description', descriptionValue);

      const startDateValue = this.ionicForm.get('start_date')?.value ?? '';
      formData.append('start_date', startDateValue);

      const endDateValue = this.ionicForm.get('end_date')?.value ?? '';
      formData.append('end_date', endDateValue);

      console.log(formData);
      this.chatconnect.postFormData(formData,"multiple_event").then((result:any)=>{
        this.common.hide();
        if (result.Response.status == 1) {
          this.router.navigate(['pages/successmul',{multievent_id:result.Response.last_id}])
        }else{
          this.common.presentToast("Oops",result.Response.message)
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      });
    }
  }

  async view(img: any,showflag: string) {
    const modal = await this.modalController.create({
      component: ImgcropperComponent,
      cssClass: 'my-menubar',
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
        if (data.data.cropped_image) {
          this.dataservice.convertBase64ToBlob(data.data.cropped_image)
          if (showflag == "event"){
            this.imageUrls=[]
            this.imageUrls.unshift(data.data.cropped_image);
            localStorage.setItem("event_images", data.data.cropped_image);
          }
        }
      } else {
        this.imageUrls=[]
      }
    });
    return await modal.present();
  }

  loadImageFromDevice(event: { target: { files: any[]; }; },showflag: string) {
    const photo = event.target.files[0];
    this.file_uploaddata=photo;
    let formData = new FormData();
    formData.append("photo", photo, photo.name);
    this.Blobimage.push(photo);
    this.dataservice.blobToBase64(photo).then((res:any) => {
      this.dataservice.event_base64img=res
      this.view(res,showflag)
    });
 
    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
     if (showflag == "event"){
        this.imageUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      }
    };
    reader.onerror = (error) => { };
  };
}