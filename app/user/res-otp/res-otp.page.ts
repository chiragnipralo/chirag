import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
 
@Component({
  selector: 'app-res-otp',
  templateUrl: './res-otp.page.html',
  styleUrls: ['./res-otp.page.scss'],
})

export class ResOtpPage implements OnInit {
  requestType: string = 'user_login';
  otp: any;
  otpInput1: string = '';
  otpInput2: string = '';
  otpInput3: string = '';
  otpInput4: string = '';

  constructor(
    public commonservice:CommonService, 
    private _router: Router,
    public nav: NavController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public authservice: AuthenticationService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private smsRetriever: SmsRetriever
    ) {}
 
  requestOTP(){
    console.log("STARTED WATCHING here")
    this.smsRetriever.startWatching().then((res: any) => {
      console.log("STARTED WATCHING here res",res)
        // const otp = res.Message.replace(/[^0-9]/g, ''); // Extract only the OTP digits
        const otp = res.Message.toString().substr(33,4); // Extract only the OTP digits
        this.populateOTPInputs(otp);
      }).catch((error: any) => {
        console.error('Error starting SMS Retriever:', error);
      });
    }

    populateOTPInputs(otp: string) {
      const otpLength = 4; // Assuming the OTP length is 4 digits
      if (otp.length === otpLength) {
        this.otpInput1 = otp.charAt(0);
        this.otpInput2 = otp.charAt(1);
        this.otpInput3 = otp.charAt(2);
        this.otpInput4 = otp.charAt(3);
      }
    }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Allow 'Location Access' to access your location while you are using the app",
      // message: 'We need to access your location to show relevant search results',
      buttons: [{
        text: "Don't Allow",
        cssClass: 'alert-button',
        // handler: () => {
        //   console.log('Confirm Cancel: blah');
        //   this._router.navigate(['/tabs/account']);
        // },
      },{
        text: 'Allow',
        cssClass: 'alert-button',
        // handler: () => {
        //   console.log('Confirm Cancel: blah');
        //   this._router.navigate(['/tabs/account']);
        // },
      },],
    });
    await alert.present();
  }
  next(el: { setFocus: () => void; }) {
    el.setFocus();
  }
 
  otpController(event: any, next: any, prev: any){
    console.log(event.target.value)
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
    return 0;
  }
 
  signup_password(form: NgForm){
    console.log(form.value)
    const frm = form.value;
    const userOtp = Object.values(frm).join('').toString();
    console.log(userOtp)
    if (userOtp === '' || userOtp.length < 4) {
      console.log("FAILED")
      this.commonservice.presentToast("Oops","Please Enter Otp")
    } else {
      console.log(this.dataservice);
      if (this.dataservice.getOtp() === userOtp){
        if(this.dataservice.is_user_login_or_signup =="user_signup"){
          // this._router.navigate(['/fav-cat']);
          this.RegisterUser()
        }else{
          if(this.dataservice.is_user_login_or_signup == 'user_login'){
            this.authservice.isAuthenticated.next(true);
            this.dataservice.setUserData(this.dataservice.user_req_token);
            this.nav.navigateRoot(['/tabs']);
          }
        }
      }else{
        this.commonservice.presentToast("Oops","Invalid Otp")
      }
    }
  }
 
  async RegisterUser(){
    this.commonservice.show("Please Wait");
    let apidata={
      user_data:this.dataservice.set_user_signup,
    }
    this.chatconnect.postData(apidata,"user_register").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.authservice.isAuthenticated.next(true);
        this.dataservice.setUserData(result.Response.user_token);
        // this._router.navigate(['/tabs'])
        this.nav.navigateRoot(['/tabs']);
        // this.dataservice.setOtp(result.Response.code)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      this.commonservice.hide();
      console.log("Connection failed Messge");
    });    
  }
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.requestType = params['requestType'] || 'user_login'; // Default to 'user_login' if not provided
    });
    const otpLength = 4; // Assuming the OTP length is 4 digits
    this.otp = this.dataservice.getOtp();
    // //Check if the fetched OTP is valid and has the expected length
    // if (this.otp && this.otp.length === otpLength) {
    //   // Split the OTP into individual digits
    //   const otpDigits = this.otp.split('');
    //   // Update the ngModel values for each OTP input
    //   for (let i = 0; i < otpLength; i++) {
    //     this['otpInput' + (i + 1)] = otpDigits[i];
    //   }
    // }
    this.requestOTP()
  }
 
  async Resend() {
    this.commonservice.show("Please Wait");
    let apidata = {
      mobile_number: this.dataservice.set_user_signup.mobile_number,
      request_type: this.requestType,
      app_hash: this.dataservice.appHashString,
    };
 
    this.requestOTP();
    this.chatconnect.postData(apidata, "sendloginotp").then((result: any) => {
      console.log("RESPONSE -->", result);
      this.commonservice.hide();
      if (result.Response.status == 1) {
        this.dataservice.setOtp(result.Response.code);
        if (result.Response.request_type === 'user_login') {
          this.dataservice.setUserData(result.Response.userdata.user_token);
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
    let apidata = {
      mobile_number: this.dataservice.set_user_signup.mobile_number,
      request_type: this.requestType,
      app_hash: this.dataservice.appHashString,
    };
    this.requestOTP();
    this.chatconnect.postData(apidata, "sendregisterotp").then((result: any) => {
      console.log("RESPONSE -->", result);
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