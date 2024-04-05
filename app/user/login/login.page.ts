import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';

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
    'mobile_number':[
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile number min 10 digit required.' },
      { type: 'pattern', message: 'Please enter a valid, no special characters or text.' },
      { type: 'required', message: 'Please enter a valid .' }
      ]
  }

  constructor(public formBuilder: FormBuilder,
    public alertController: AlertController,
    public common:CommonService,
    private smsRetriever: SmsRetriever,
    public authservice: AuthenticationService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public router: Router, public navCtrl: NavController,
    private platform: Platform,
    public loadingController: LoadingController) {
    this.ionicForm = this.formBuilder.group({
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
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
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: "Allow 'Location Access' to access your location while you are using the apps",
  //     message: 'We need to access your location to show relevant search results',
  //     buttons: [{
  //       text: "Don't Allow",
  //       cssClass: 'alert-button',
  //       // handler: () => {
  //       //   console.log('Confirm Cancel: blah');
  //       //   this.router.navigate(['/tabs/account']);
  //       // },
  //     },{
  //       text: 'Allow',
  //       cssClass: 'alert-button',
  //       // handler: () => {
  //       //   console.log('Confirm Cancel: blah');
  //       //   this.router.navigate(['/tabs/account']);
  //       // },
  //     },],

  //   });

  //   await alert.present();
  // }

  ngOnInit(){
    this.ionicForm = this.formBuilder.group({
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
    })  
    this.getHashCode();
  }

  getHashCode() {
    this.smsRetriever.getAppHash().then((res: any) => {
      console.log(res);
      this.dataservice.appHashString = res;
      console.log(res);
    }).catch((error: any) => console.error(error));
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
        mobile_number:this.ionicForm.value.mobile_number,
        app_hash:this.dataservice.appHashString,
        request_type:"user_login",
      }
      this.dataservice.is_user_login_or_signup="user_login";
      this.chatconnect.postData(apidata,"sendloginotp").then((result:any)=>{
        console.log(result);
        this.common.hide();
        if(result.Response.status ==1){
          this.dataservice.set_user_signup=this.ionicForm.value;
          this.dataservice.setOtp(result.Response.code)
          //this.router.navigate(['/res-otp'])
          this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_login' } });
          if(result.Response.request_type == 'user_login'){
            this.dataservice.user_req_token=result.Response.userdata.user_token;
            // this.dataservice.setUserData(result.Response.userdata.user_token);
            console.log("THIS is the req type ====>",result.Response.request_type)
            // this.dataservice.setUserData(result.Response.user_token);
          }else{
            this.common.presentToast("Oops","Please Register")
            this.router.navigate(['/register'])
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
