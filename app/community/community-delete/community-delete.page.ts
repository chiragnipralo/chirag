import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { NavController,LoadingController,ModalController,AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-community-delete',
  templateUrl: './community-delete.page.html',
  styleUrls: ['./community-delete.page.scss'],
})
export class CommunityDeletePage implements OnInit {

  isSubmitted = false;
  ionicForm!: FormGroup;

  constructor(
    sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public common: CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public successmodal: ModalController,
    public contactpagemodal: ModalController,
    public router: Router,
    public authservice: AuthenticationService,
    public alertController: AlertController
    ){
  }

  ngOnInit() {
    console.log("This",this.dataservice.user_community_data.id)
    this.ionicForm = this.formBuilder.group({
      reason: ['', Validators.required],
    });
  }
  
  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    console.log(this.ionicForm);
    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        header: 'Please Enter',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss'],
      });
      alert.present();
    } else {
      this.common.show('Please Wait');
      const userToken = this.dataservice.getUserData();
      console.log(userToken);
      let apidata = {
        user_token: userToken,
        community_id:this.dataservice.user_community_data.id,
        reason: this.ionicForm.value.reason,
        premium:0
      };
      this.chatconnect.postData(apidata, 'delete_community').then(
        (result: any) => {
          console.log(result);
          this.common.hide();
          if (result.Response.status == 1) {
            this.common.presentToast('', result.Response.message);
            this.router.navigate(['/tabs/dashboard']);
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
}