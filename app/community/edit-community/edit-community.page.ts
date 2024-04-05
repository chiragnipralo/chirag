import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { NavController,LoadingController,ModalController,AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SuccessPage } from 'src/app/events/success/success.page';

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.page.html',
  styleUrls: ['./edit-community.page.scss'],
})

export class EditCommunityPage implements OnInit {
  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = '';
  public Blobimage:any=[];
  public showMoreBar : boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  isSelectDisabled: boolean = false;

  premiumImage: any;

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
  }

  constructor(sanitizer: DomSanitizer,
    public commonservice:CommonService,
    public formBuilder: FormBuilder,
    public common:CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public successmodal: ModalController,
    public router: Router,
    private location: Location,
    public alertController: AlertController){
    this.sanitizer = sanitizer;
    this.imageUrls = [];
  }

  async ngOnInit() {
    this.commonservice.show();
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      category: [''],
      community_type: [''],
    })
    await this.GetDashboard()
    this.All_community();
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
    if (!this.ionicForm.valid){
      let alert = await this.alertController.create({
        header: '',
        subHeader: 'Please enter required fields',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      const userToken = this.dataservice.getUserData()
      var formData = new FormData();
      formData.append('premium',"0");
      formData.append('community_id', this.dataservice.user_community_data.id);
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('title', this.ionicForm.get('title')?.value);
      formData.append('description', this.ionicForm.get('description')?.value);
      formData.append('category', this.ionicForm.get('category')?.value);
      formData.append('community_type', this.ionicForm.get('community_type')?.value);
      formData.append('previous_image', this.dataservice.previous_img);
 
      const community_images = localStorage.getItem('event_images');
      
      if(community_images !==null && !this.dataservice.isNullOrUndefined(community_images)){
        formData.append('community_images', this.dataservice.convertBase64ToBlob(community_images));
      }

      console.log(formData);
      this.chatconnect.postFormData(formData, "edit_community").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.common.presentToast("", result.Response.message);
          localStorage.removeItem('event_images');
          this.location.back();
          //this.OpenSuccess(result.Response.token_url);
        }else{
          this.common.presentToast("Oops",result.Response.message)
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      });
    }
  }

  ionViewWillLeave() {
    console.log('leave!');
    this.All_community();
  }

  All_community() {
    console.log('This is community Id',this.dataservice.user_community_data);
    let apidata = {
      user_token: this.dataservice.getUserData(),
      community_id: this.dataservice.user_community_data.id,
      type: this.dataservice.user_community_data.account_type,
      premium: 0      
    };

    this.chatconnect.postData(apidata, "view_community_by_id").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        const communityData = result.Response.community_data;
        // Update form values
        this.ionicForm.patchValue({
          title: communityData.community_title,
          description: communityData.community_description,
        });

        // handle event category
        const selectedCategory = this.dataservice.events_categories.find((category: any) => category.name === communityData.community_category);
        console.log(selectedCategory);
        this.ionicForm.patchValue({
          category: selectedCategory ? selectedCategory.id : null,
        });

        // handle event type
        const selectedEventType = communityData.community_type;
        console.log(selectedEventType);
        const selectedType: string | null = selectedEventType !== undefined ? selectedEventType.toString() : null;

        this.ionicForm.patchValue({
          community_type: selectedType,
        });

        this.imageUrls.push(
          communityData.community_image
        )
        this.premiumImage = communityData.community_image,
        
        this.dataservice.previous_img = communityData.community_image; 
        console.log(this.imageUrls);
      } else {
        this.common.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
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
        if (this.premiumImage !== null) {
          this.imageUrls = [];
          this.imageUrls.push(this.premiumImage)
        } else {
          this.imageUrls = [];
        }
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

    // Add the file that was just added to the form data
    formData.append("photo", photo, photo.name);
    this.Blobimage.push(photo);
    this.dataservice.blobToBase64(photo).then((res:any) => {
      this.dataservice.event_base64img=res
      this.view(res,showflag)
    });

    // const file = event.target.files[0];
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

    console.log(this.Blobimage);
    reader.onerror = (error) => { };
  };

  async OpenSuccess(params:any){
    this.dataservice.shareable_event_url=params;
    const modal = await this.modalController.create({
      component: SuccessPage,
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