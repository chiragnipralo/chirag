import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { ImgcropperComponent } from 'src/app/components/imgcropper/imgcropper.component';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-obituary',
  templateUrl: './add-obituary.page.html',
  styleUrls: ['./add-obituary.page.scss'],
})
  
export class AddObituaryPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  file_uploaddata = '';
  public imageUrls: SafeUrl[];
  private sanitizer: DomSanitizer;
  public Blobimage:any=[];
  ageControl: AbstractControl<any, any> | null = null;

  error_messages = {
    'person_name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'date_one': [
      { type: 'required', message: 'Date is required.' },
    ],
    'date_two': [
      { type: 'required', message: 'Date is required.' },
    ],
    'desc1': [
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

      const person_img = localStorage.getItem('person_img');
    
      if(person_img !==null && !this.dataservice.isNullOrUndefined(person_img)){
        formData.append('person_img', this.dataservice.convertBase64ToBlob(person_img));
      }
      formData.append('type',"admin");
      formData.append('person_name', this.ionicForm.get('person_name')?.value);
      formData.append('age', this.ionicForm.get('age')?.value);
      formData.append('date_one', this.ionicForm.get('date_one')?.value);
      formData.append('date_two', this.ionicForm.get('date_two')?.value);
      formData.append('date_three', this.ionicForm.get('date_three')?.value);
      formData.append('desc1', this.ionicForm.get('desc1')?.value);
      formData.append('desc2', this.ionicForm.get('desc2')?.value);
      formData.append('valid_till', this.ionicForm.get('valid_till')?.value);
      
      console.log("formData:",formData)
      this.chatconnect.postFormData(formData, "add_obitury").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.common.presentToast("", result.Response.message)
          localStorage.removeItem("person_img");
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
            localStorage.setItem("person_img", data.data.cropped_image);
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
      person_name: ['', [Validators.required]],
      age:[''],
      date_one: ['', [Validators.required]],
      date_two: ['', [Validators.required]],
      date_three: [''],
      desc1: [''],
      desc2: [''],
      valid_till:[''],
    });
    this.ageControl = this.ionicForm.get('age');
    this.subscribeToDateChanges();
  }

  private subscribeToDateChanges() {
    const dateOneControl: AbstractControl<any, any> | null = this.ionicForm.get('date_one');
    const dateTwoControl: AbstractControl<any, any> | null = this.ionicForm.get('date_two');

    dateOneControl?.valueChanges.subscribe(() => this.calculateAge());
    dateTwoControl?.valueChanges.subscribe(() => this.calculateAge());
  }

  private calculateAge() {
    const dateOfBirth: string | undefined = this.ionicForm.get('date_one')?.value;
    const dateOfDeath: string | undefined = this.ionicForm.get('date_two')?.value;

    if (dateOfBirth && dateOfDeath) {
      const age: number = this.calculateYearDifference(dateOfBirth, dateOfDeath);
      this.ageControl?.setValue(age);
    }
  }

  private calculateYearDifference(date1: string, date2: string): number {
    const dob = new Date(date1);
    const dod = new Date(date2);

    const ageDiffMs = Math.abs(dod.getTime() - dob.getTime());
    const ageDate = new Date(ageDiffMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
