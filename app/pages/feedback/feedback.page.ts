import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { NavController,LoadingController,ModalController,AlertController } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})

export class FeedbackPage implements OnInit {
  //for segment
  ionicForm: FormGroup;
  isSubmitted = false;
  private sanitizer: DomSanitizer;

  error_messages = {
    'title':[
      { type: 'required', message: 'Title is required.' },
      ],
    'msg':[
      { type: 'required', message: 'Feedback Description is required.' },
      ],  
  }

  constructor(sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public common:CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public createv4omdal: ModalController,
    public successmodal: ModalController,
    public router: Router,
    public alertController: AlertController){
    this.sanitizer = sanitizer;
    this.ionicForm = this.formBuilder.group({
      events: [false],
      community: [false],
      msg: ['', [Validators.required]],
    });
  }  

  async ngOnInit(){
    this.ionicForm = this.formBuilder.group({
      events: [false],
      community: [false],
      msg: ['', [Validators.required]],
    })
  }

  async submit(){
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    console.log(this.ionicForm)
    if (!this.ionicForm.valid){
      let alert = await this.alertController.create({
        header: '',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.common.show('Please Wait');
      let eventsValue = this.ionicForm.value.events ? '1' : '';
      let communityValue = this.ionicForm.value.community ? '2' : '';
      let selectedValue = (eventsValue || communityValue) ? (eventsValue + (eventsValue && communityValue ? ',' : '') + communityValue) : '';

      console.log("Value==>",selectedValue)
      let apidata = {
        user_token: this.dataservice.getUserData(),
        type: selectedValue,
        msg: this.ionicForm.value.msg,
      };
      this.chatconnect.postData(apidata, 'feedback_about_app').then(
        (result: any) => {
          console.log(result);
          this.common.hide();
          if (result.Response.status == 1) {
            this.common.presentToast('', result.Response.message);
            this.router.navigate(['tabs/about']);
          }
        },
        (err) => {
          this.common.hide();
          console.log('Connection failed Messge');
        }
      );
      console.log(this.ionicForm.value);
    }
  }

  ionViewWillLeave() {
    console.log('leave!');
  }
}