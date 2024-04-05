import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { NavController,LoadingController,ModalController,AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../../services/common.service';
import { ImgcropperComponent } from '../../../components/imgcropper/imgcropper.component';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SuccessPage } from 'src/app/events/success/success.page';

@Component({
  selector: 'app-edit-paid-community',
  templateUrl: './edit-paid-community.page.html',
  styleUrls: ['./edit-paid-community.page.scss'],
})
  
export class EditPaidCommunityPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = '';
  public Blobimage:any=[];
  public showMoreBar : boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  isSelectDisabled: boolean = false;

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
    'email': [
      { type: 'required', message: 'Email is required.' },
    ],
    'contact': [
      { type: 'required', message: 'Contact is required.' },
    ],
    'open_for': [
      { type: 'required', message: 'required.' },
    ],
    'member_status': [
      { type: 'required', message: 'required.' },
    ]
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
    this.imageUrls = []; }

    async ngOnInit() {
      this.commonservice.show();
      this.ionicForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        description: [''],
        category: ['', [Validators.required]],
        email: ['', [Validators.required]],
        contact: ['', [Validators.required]],
        open_for: [''],
        member_status:['']
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
  
    async submit() {
        this.isSubmitted = true;
        this.ionicForm.markAllAsTouched(); 
        if (!this.ionicForm.valid){
          let alert = await this.alertController.create({
            header: 'Please Enter',
            subHeader: 'Please Enter all details',
            buttons: ['Dismiss']
          });
          alert.present();
        } else {
          const userToken = this.dataservice.getUserData()
          const id = this.dataservice.GetAccountuser();

          var formData = new FormData();
          
          formData.append('premium',"1");
          formData.append('community_id', id);
          const community_images = localStorage.getItem('event_images');
        
          if(community_images !==null && !this.dataservice.isNullOrUndefined(community_images)){
            formData.append('community_images', this.dataservice.convertBase64ToBlob(community_images));
          }
          if (userToken !== null) {
            formData.append('user_token', userToken);
          }
          formData.append('title', this.ionicForm.get('title')?.value);
          formData.append('description', this.ionicForm.get('description')?.value);
          formData.append('category', this.ionicForm.get('category')?.value);
          //formData.append('community_type', this.ionicForm.get('category').value);
          formData.append('open_for', this.ionicForm.get('open_for')?.value);
          formData.append('member_status', this.ionicForm.get('member_status')?.value);
          formData.append('previous_image', this.dataservice.previous_img);

          console.log(formData);
            
          this.chatconnect.postFormData(formData, "edit_community").then((result: any) => {
            this.common.hide();
            if (result.Response.status == 1) {
              this.common.presentToast("",result.Response.message)
              this.location.back();
            }else{
              this.common.presentToast("Oops",result.Response.message)
            }
          },(err)=>{
            this.common.hide();
            console.log("Connection failed Messge");
          }); 
        }
    }

    All_community() {
      const id = this.dataservice.GetAccountuser();
      let apidata={
        user_token: this.dataservice.getUserData(),
        community_id:id
      }
  
      this.chatconnect.postData(apidata, "paid_community_details_by_id").then((result: any) => {
        this.commonservice.hide();
        if (result.Response.status == 1) {
          const communityData = result.Response.Details;
          console.log("This is Result ==> ", communityData[0].account_name);
  
          // Update form values
          this.ionicForm.patchValue({
            title: communityData[0].account_name,
            description: communityData[0].description,
            email: communityData[0].email,
            contact: communityData[0].contact,
          });
  
          // handle event category
          const selectedCategory = this.dataservice.events_categories.find((category: any) => category.name === communityData[0].category);
          console.log(selectedCategory);
          this.ionicForm.patchValue({
            category: selectedCategory ? selectedCategory.id : null,
          });
  
          // handle Community is open or closed
          const selectedCommunityType = communityData[0].open_for;
          console.log(selectedCommunityType);
          const selectedType: string | null = selectedCommunityType !== undefined ? selectedCommunityType.toString() : null;
    
          this.ionicForm.patchValue({
            open_for: selectedType,
          });
            
          // handle Community is open or closed
          const selectedCommunityMember = communityData[0].member_details;
          console.log(selectedCommunityType);
          const selectedMember: string | null = selectedCommunityMember !== undefined ? selectedCommunityMember.toString() : null;
    
          this.ionicForm.patchValue({
            member_status: selectedMember,
          });

          const imageUrl = communityData[0].account_image;
          if (imageUrl !== null) {
            this.imageUrls.push(imageUrl);
          }
          console.log("This is Image ==>",this.imageUrls);
        } else {
          this.common.presentToast("Oops", result.Response.message);
        }
      }, (err) => {
        console.log("Connection failed Message");
      });
    }   
}