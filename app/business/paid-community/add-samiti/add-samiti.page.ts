import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { ImgcropperComponent } from 'src/app/components/imgcropper/imgcropper.component';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-samiti',
  templateUrl: './add-samiti.page.html',
  styleUrls: ['./add-samiti.page.scss'],
})
export class AddSamitiPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = '';
  public imageUrls: SafeUrl[];
  private sanitizer: DomSanitizer;
  public Blobimage:any=[];

  error_messages = {
    'samiti_name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'description': [
        { type: 'required', message: 'Description is required.' },
    ]
  }

  constructor(
    sanitizer: DomSanitizer,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public common: CommonService,
    public formBuilder: FormBuilder,
    private location: Location,
    public alertController: AlertController
  ) { 
    this.imageUrls = [];
    this.sanitizer = sanitizer;
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched(); 

    if (!this.ionicForm.valid){
      let alert = await this.alertController.create({
        subHeader: 'Please Required details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      const userToken = this.dataservice.getUserData()
      const id = this.dataservice.GetAccountuser();

      var formData = new FormData();
  
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }

      formData.append('community_type',"1");
      formData.append('community_id', id);

      const samiti_image = localStorage.getItem('samiti_image');
    
      if(samiti_image !==null && !this.dataservice.isNullOrUndefined(samiti_image)){
        formData.append('samiti_image', this.dataservice.convertBase64ToBlob(samiti_image));
      }
      formData.append('samiti_name', this.ionicForm.get('samiti_name')?.value);
      formData.append('samiti_desc', this.ionicForm.get('description')?.value);
              
      console.log("formData:",formData)
      this.chatconnect.postFormData(formData, "add_samiti").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.common.presentToast("", result.Response.message)
          this._router.navigate(['/add-samiti-member',{samiti_id:result.Response.samiti_id}])
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
            localStorage.setItem("samiti_image", data.data.cropped_image);
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

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      samiti_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

}