import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  encapsulation: ViewEncapsulation.None // Add this line

})

export class RegisterPage implements OnInit {
  
  isModalOpen = false;
  ionicForm: FormGroup;
  isSubmitted = false;
  termss = false;
  isUsernameValid: boolean = false;
  separateDialCode = true;
	SearchCountryField= SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  msgg!: string;

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
      { type: 'required', message: 'Mobile number is required.' }
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
    'username':[
      { type: 'required', message: 'Username is required.' }
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
    private renderer: Renderer2,
    public router: Router, public navCtrl: NavController,
    public loadingController: LoadingController) {
    this.ionicForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      username:['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+,[A-Z|a-z]{2,}$/)]],
      date_birth:[],
      gender:[],
      is_terms_checked: [false,[Validators.requiredTrue]]
    });
  }

  getMaxDate(): string {
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    return fiveYearsAgo.toISOString().split('T')[0];
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
      username:['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      date_birth:[],
      gender:[],
      is_terms_checked: [false,[Validators.requiredTrue]]
    })
  }

  onUsernameInput(username: string) {
    if (username.length > 3) {
      let apidata = {
        username: username,
      }
      this.chatconnect.postData(apidata, "username_validator").then((result: any) => {
        if (result.Response.status == 1) {
          this.isUsernameValid = true;
          this.msgg =result.Response.message
        } else {
          this.isUsernameValid = false;
          this.msgg = result.Response.message
        }
      }, (err) => {
        this.common.hide();
        console.log("Connection failed Messge");
      });
    } else {
      this.msgg = 'noMsg';
    }
  }

  async submit(){
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched(); 
    console.log("Res==>", this.isUsernameValid)
    if (!this.ionicForm.valid || !this.isUsernameValid){
      let alert = await this.alertController.create({
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      const phoneNumber1 = this.ionicForm.value.mobile_number.internationalNumber.replace(new RegExp(`^\\${this.ionicForm.value.mobile_number.dialCode}\\s*`), '');
      const phoneNumber = phoneNumber1.replace(/\s+/g, '');
      
      this.common.show("Please Wait");
      let apidata={
        user_name: this.ionicForm.value.full_name,
        last_name: this.ionicForm.value.last_name,
        username:this.ionicForm.value.username,
        mobile_number: phoneNumber,
        numberDetails: this.ionicForm.value.mobile_number,
        email_id:this.ionicForm.value.email_id,
        date_birth:this.ionicForm.value.date_birth,
        gender:this.ionicForm.value.gender,
        request_type:"user_signup",
        is_terms_checked:this.ionicForm.value.is_terms_checked,
      }

      console.log("This is Api data ==>", apidata)
      this.chatconnect.postData(apidata,"sendregisterotp").then((result:any)=>{
        this.common.hide();
        if(result.Response.status == 1){
          this.dataservice.is_user_login_or_signup=result.Response.request_type;
          this.dataservice.set_user_signup = this.ionicForm.value;
          this.dataservice.setOtp(result.Response.code)
          this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_signup' } });
          if(result.Response.request_type == 'user_login'){
            this.dataservice.setUserData(result.Response.userdata.user_token);
          }
        }else{
          this.common.presentToast("",result.Response.message)
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      });
    }
  }

  ionViewWillLeave() {
    this.dataservice.mobile_number = null;
  }
}