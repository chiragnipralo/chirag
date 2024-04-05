import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
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
  selector: 'app-add-more-guest',
  templateUrl: './add-more-guest.page.html',
  styleUrls: ['./add-more-guest.page.scss'],
})
export class AddMoreGuestPage implements OnInit {

  is_modal_open: boolean = false;
  ionicForm!: FormGroup;
  isSubmitted = false;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
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
  }

  async ngOnInit() {
    if (this.navParams.data["is_modal"] == true) {
      const EventId = this.navParams.get('event_id');
      this.is_modal_open = true;
    }
    this.ionicForm = this.formBuilder.group({
      person_name: ['', [Validators.required]],
      person_number: ['', [Validators.required]],
      person_gender: ['', [Validators.required]],
    })
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
      const userToken = this.dataservice.getUserData();
      var formData = new FormData();
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('event_id', this.navParams.get('event_id'));
      formData.append('person_name', this.ionicForm.get('person_name')?.value);
      formData.append('person_number', this.ionicForm.get('person_number')?.value);
      formData.append('person_gender', this.ionicForm.get('person_gender')?.value);
      formData.append('event_type', this.navParams.get('event_type'));

      this.chatconnect.postFormData(formData, "add_more_guest_to_event").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.common.presentToast("", result.Response.message)
          this.closeModal();
        }else{
          this.common.presentToast("Oops",result.Response.message)
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      }); 
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
