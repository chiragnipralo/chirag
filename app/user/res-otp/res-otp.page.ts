import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';

@Component({
  selector: 'app-res-otp',
  templateUrl: './res-otp.page.html',
  styleUrls: ['./res-otp.page.scss'],
})
  
export class ResOtpPage implements OnInit {
  requestType: string = 'user_login';
  otp: string = '';

  constructor(
    public commonservice: CommonService,
    private _router: Router,
    public nav: NavController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public authservice: AuthenticationService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private smsRetriever: SmsRetriever
  ) {}

  ngOnInit() {
    console.log("Dataservice ==>",this.dataservice.set_user_signup)
    this.route.queryParams.subscribe(params => {
      this.requestType = params['requestType'] || 'user_login'; 
    });
    this.requestOTP()
  }

  requestOTP() {
    this.smsRetriever.startWatching().then((res: any) => {
      const otp = res.Message.toString().substr(33, 4);
      this.otp = otp;
    }).catch((error: any) => {
      console.error('Error starting SMS Retriever:', error);
    });
  }

  otpInputChange() {
    console.log(this.otp);
    if (this.otp.length === 4) {
      // this.signup_password();
    }
  }
 
  signup_password() {
    if (this.otp === '' || this.otp.length < 4) {
      this.commonservice.presentToast("Oops", "Please Enter Otp")
    } else {
      console.log(this.dataservice);
      if (this.dataservice.getOtp() === this.otp){
        if (this.dataservice.is_user_login_or_signup === "user_signup"){
          this.RegisterUser()
        } else {
          if (this.dataservice.is_user_login_or_signup == 'user_login'){
            this.authservice.isAuthenticated.next(true);
            this.dataservice.setUserData(this.dataservice.user_req_token);
            this.nav.navigateRoot(['/tabs']);
          }
        }
      } else {
        this.commonservice.presentToast("Oops", "Invalid Otp")
      }
    }
  }
 
  async RegisterUser(){
    this.commonservice.show("Please Wait");  

    const phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp(`^\\${this.dataservice.set_user_signup.mobile_number.dialCode}\\s*`), '');
    const phoneNumber = phoneNumber1.replace(/\s+/g, '');
    
    let user_data1 = {
      ...this.dataservice.set_user_signup,
      mobile_number: phoneNumber,
      numberDeatails:this.dataservice.set_user_signup.mobile_number
    };
    console.log("user data ==>",user_data1)

    let apidata={
      user_data:user_data1,
    }

    console.log("API Data ==>",apidata)
    this.chatconnect.postData(apidata,"user_register").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.authservice.isAuthenticated.next(true);
        this.dataservice.setUserData(result.Response.user_token);
        this.nav.navigateRoot(['/tabs']);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      this.commonservice.hide();
      console.log("Connection failed Messge");
    });    
  }
 
  async Resend() {
    this.commonservice.show("Please Wait");
    const phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp(`^\\${this.dataservice.set_user_signup.mobile_number.dialCode}\\s*`), '');
    const phoneNumber = phoneNumber1.replace(/\s+/g, '');
    
    let apidata = {
      mobile_number: phoneNumber,
      request_type: this.requestType,
      app_hash: this.dataservice.appHashString,
    };
 
    this.requestOTP();
    this.chatconnect.postData(apidata, "sendloginotp").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        this.dataservice.setOtp(result.Response.code);
        if (result.Response.request_type === 'user_login') {
         // this.dataservice.setUserData(result.Response.userdata.user_token);
        }
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      this.commonservice.hide();
      console.log("Connection failed Message");
    });
  }
 
  async signResend() {
    this.commonservice.show("Please Wait");
    const phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp(`^\\${this.dataservice.set_user_signup.mobile_number.dialCode}\\s*`), '');
    const phoneNumber = phoneNumber1.replace(/\s+/g, '');
    let apidata = {
      mobile_number: phoneNumber,
      request_type: this.requestType,
      app_hash: this.dataservice.appHashString,
    };
    this.requestOTP();
    this.chatconnect.postData(apidata, "sendregisterotp").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        this.dataservice.setOtp(result.Response.code);
        if (result.Response.request_type === 'user_signup') {
          this.dataservice.setUserData(result.Response.userdata && result.Response.userdata.user_token);
        }
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      this.commonservice.hide();
      console.log("Connection failed Message");
    });
  }
}