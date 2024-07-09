import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  public smsTextmessage: string = '';
  public appHashString: string = '';
  isSubmitted = false;
  
  error_messages = {
    'mobile_number': [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'pattern', message: 'Enter a valid mobile number.' }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public common: CommonService,
    private smsRetriever: SmsRetriever,
    public authservice: AuthenticationService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public router: Router, 
    public navCtrl: NavController,
    private platform: Platform,
    public loadingController: LoadingController
  ) {
    this.ionicForm = this.formBuilder.group({
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Ensuring the mobile number is 10 digits
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/login') {
        this.navCtrl.navigateRoot('/login');
      } else {
        this.navCtrl.back();
      }
      if (this.platform.is('android') && this.platform.is('cordova')) {
        if (window.location.pathname === '/login') {
          (navigator as any)['app'].exitApp();
        }
      }
    });
  }

  GoToSignUp() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.getHashCode();
  }

  getHashCode() {
    this.smsRetriever.getAppHash().then((res: any) => {
      console.log(res);
      this.dataservice.appHashString = res;
    }).catch((error: any) => console.error(error));
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid) {
      const alert = await this.alertController.create({
        subHeader: 'Please Enter valid Mobile Number',
        buttons: ['Dismiss']
      });
      await alert.present();
      return;
    }

    const phoneNumber = this.ionicForm.value.mobile_number;

    this.common.show("Please Wait");
    let apidata = {
      mobile_number: phoneNumber,
      numberDetails: this.ionicForm.value.mobile_number,
      app_hash: this.dataservice.appHashString,
      request_type: "user_login",
    };
    this.dataservice.is_user_login_or_signup = "user_login";

    this.chatconnect.postData(apidata, "sendloginotp").then(async (result: any) => {
      this.common.hide();
      if (result.Response.status == 1) {
        this.dataservice.set_user_signup = this.ionicForm.value;
        this.dataservice.setOtp(result.Response.code);
        this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_login' } });
        if (result.Response.request_type == 'user_login') {
          this.dataservice.user_req_token = result.Response.userdata.user_token;
        } else {
          this.common.presentToast("Oops", "Please Register");
          this.router.navigate(['/register']);
        }
      } else {
        this.dataservice.mobile_number = phoneNumber;
        const alert = await this.alertController.create({
          header: 'Please Register...',
          message: result.Response.message,
          cssClass: 'loginAlert',
          buttons: [
            {
              text: 'Register',
              cssClass: 'alert-button-confirm',
              handler: () => {
                this.router.navigate(['/register']);
              }
            },
            {
              text: 'Cancel',
              cssClass: 'alert-button-cancel',
              role: 'cancel',
              handler: () => { }
            }
          ]
        });
        await alert.present();
      }
    }, (err) => {
      this.common.hide();
      console.log("Connection failed Message");
    });
    console.log(this.ionicForm.value);
  }
}
