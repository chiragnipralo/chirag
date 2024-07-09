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
import { SuccesscomPage } from '../successcom/successcom.page';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.page.html',
  styleUrls: ['./create-community.page.scss'],
})
  
export class CreateCommunityPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata=''
  public showMoreBar : boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  public Blobimage:any =[];
  public accountType: number | undefined;
  showSubmitButton = false;
  sortedCategories!: any[];

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

  customAlertOptions = {
    header: 'Select Category',
    translucent: true,
  };

  EventOptions = {
    header: 'Select Type',
    translucent: true,
  };

  error_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
    ],
    'category': [
      { type: 'required', message: 'Category is required.' },
    ],
    'community_type': [
      { type: 'required', message: 'Community Type is required.' },
    ],
  }

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      category: ['',[Validators.required]],
      community_type: ['',[Validators.required]],
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
          this.dataservice.events_categories = result.Response.all_categories;
          this.sortedCategories = this.dataservice.events_categories.sort((a: any, b: any) => a.name.localeCompare(b.name));
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
        subHeader: 'Please enter required fields',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.common.show("Please wait");
      const userToken = this.dataservice.getUserData()
      var formData = new FormData();
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      const community_images = localStorage.getItem('event_images');
      if(community_images !==null && !this.dataservice.isNullOrUndefined(community_images)){
        formData.append('community_images', this.dataservice.convertBase64ToBlob(community_images));
      }
      
      formData.append('title', this.ionicForm.get('title')?.value);
      formData.append('description', this.ionicForm.get('description')?.value);
      formData.append('category', this.ionicForm.get('category')?.value);
      formData.append('community_type', this.ionicForm.get('community_type')?.value);
      formData.append('account_type', this.accountType?.toString() || '');

      console.log(formData);
      this.chatconnect.postFormData(formData,"create_community").then((result:any)=>{
        this.common.hide();
        if(result.Response.status ==1){
          localStorage.removeItem('event_images');
          this.OpenSuccess(result.Response.token_url);
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
      }else {
        this.imageUrls=[]
      }
    });
    return await modal.present();
  }

  loadImageFromDevice(event: { target: { files: any[]; }; },showflag: string) {
    console.log(event)
    const photo = event.target.files[0];
    console.log(photo);
    this.file_uploaddata=photo;
    console.log(photo)
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
    console.log(this.Blobimage);
    reader.onerror = (error) => { };
  };

  async OpenSuccess(params:any){
    this.dataservice.shareable_event_url=params;
    const modal = await this.modalController.create({
      component: SuccesscomPage,
      cssClass: 'pindialog-container',
      handle: true,
      // componentProps: {
      //   share_url:params,
      // },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)
      if(data.data!= undefined){
        if(this.dataservice.shareable_event_url){
          this.closeModal();
          this.navCtrl.navigateRoot('/tabs/dashboard');
        }

      }
    });
    return await modal.present();
  }
  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }
}
