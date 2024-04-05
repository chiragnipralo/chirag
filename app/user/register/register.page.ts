import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  isModalOpen = false;
  ionicForm: FormGroup;
  isSubmitted = false;
  termss = false;

  capitalizeName(input: any) {
    const value = input.value;
    if (value) {
      input.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid Email address.' },
    ],
    'mobile_number':[
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile number min 10 digit required.' },
      { type: 'pattern', message: 'Please enter a valid, no special characters or text.' },
      { type: 'required', message: 'Please enter a valid .' }
      ],
    'your_name': [
      { type: 'required', message: 'First name is required.' },
      { type: 'minlength', message: 'minimum 2 characters is required.' },
      { type: 'pattern', message: 'Only text Allowed .' }, 
      { type: 'maxlength', message: 'First name length.' },
    ],
    'last_name': [
      { type: 'required', message: 'Last name is required.' },
      { type: 'minlength', message: 'minimum 2 characters is required.' },
      { type: 'pattern', message: 'Only text Allowed .' }, 
      { type: 'maxlength', message: 'Last name length.' },
      ],
    // 'password': [
    //   { type: 'required', message: 'Password is required.' },
    //   ],
  }

  constructor(public formBuilder: FormBuilder,
    public alertController: AlertController,
    public common:CommonService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public router: Router, public navCtrl: NavController,
    public loadingController: LoadingController) {
    this.ionicForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
      // email_id: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      email_id: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+,[A-Z|a-z]{2,}$/)]],
      // password: ['', [Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z ]*')]],
      date_birth:[],
      gender:[],
      is_terms_checked: [false,[Validators.requiredTrue]]
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  settOpen(isOpen: boolean) {
    this.termss = isOpen;
  }

  GoToSignIn() {
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
      email_id: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // password: ['', [Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z ]*')]],
      date_birth:[],
      gender:[],
      is_terms_checked: [false,[Validators.requiredTrue]]
    })
  }
  
  async submit(){
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched(); 
    console.log(this.ionicForm)
    if (!this.ionicForm.valid){
      let alert = await this.alertController.create({
        //header: 'Please Enter',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.common.show("Please Wait");
      let apidata={
        user_name: this.ionicForm.value.full_name,
        last_name:this.ionicForm.value.last_name,
        mobile_number:this.ionicForm.value.mobile_number,
        email_id:this.ionicForm.value.email_id,
        date_birth:this.ionicForm.value.date_birth,
        gender:this.ionicForm.value.gender,
        // password:this.ionicForm.value.password,
        request_type:"user_signup",
        is_terms_checked:this.ionicForm.value.is_terms_checked,
      }
      this.chatconnect.postData(apidata,"sendregisterotp").then((result:any)=>{
        console.log(result);
        this.common.hide();
        if(result.Response.status == 1){
          this.dataservice.is_user_login_or_signup=result.Response.request_type;
          this.dataservice.set_user_signup=this.ionicForm.value;
          this.dataservice.setOtp(result.Response.code)
          //this.router.navigate(['/res-otp'])
          this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_signup' } });
          if(result.Response.request_type == 'user_login'){
            this.dataservice.setUserData(result.Response.userdata.user_token);
          }

        }else{
          this.common.presentToast("",result.Response.message)
          // if(result.Response.message=="user not found"){
          //   this.dataservice.clearUserData();
          // }
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      });
      console.log(this.ionicForm.value)
    }
  }
}