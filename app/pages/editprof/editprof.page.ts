import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editprof',
  templateUrl: './editprof.page.html',
  styleUrls: ['./editprof.page.scss'],
})
export class EditprofPage implements OnInit {

  fileName: string = '';
  selectedFile!: File;
  isSubmitted = false;
  ionicForm!: FormGroup;
  userDetails: any;
  public profile_img: SafeUrl[];

  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
  
  constructor( public commonservice:CommonService,
    private _router: Router,
    public formBuilder: FormBuilder,
    public dataservice: DataService,
    public authservice: AuthenticationService,
    public chatconnect: HttpService,
    private location: Location,
    private alertController: AlertController) { 
      this.profile_img = []
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      profile_img: [''], 
      user_name: ['', Validators.required],
      user_email: ['', Validators.required],
      mobile: [''],
      user_unique_name:['']
    });
    this.showProfile();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  showProfile() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
    };

    this.chatconnect.postData(apidata, "user_profile").then((result: any) => {
      console.log("this is user Data:",result);
      if (result.Response.status == 1) {
        this.userDetails = result.Response.user_data[0];
        this.ionicForm.patchValue({
          user_name: this.userDetails.user_name,
          user_email: this.userDetails.email,
          mobile: this.userDetails.mobile,
          user_unique_name: this.userDetails.user_unique_name,
        });

        this.profile_img.push(
          this.userDetails.profile_img
        )
        console.log("THis is profile Image",this.profile_img)
      } else {
        this.commonservice.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
    });
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        header: 'Please Enter',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss'],
      });
      alert.present();
    } else {
      this.commonservice.show('Please Wait');
      const userToken = this.dataservice.getUserData();
      console.log(userToken);

      let formData = new FormData();
      if (userToken) {
        formData.append('user_token', userToken);
      }
      formData.append('idd', this.userDetails.id);
      formData.append('user_name', this.ionicForm.value.user_name || '');
      formData.append('user_email', this.ionicForm.value.user_email || '');
      if (this.selectedFile) {
        formData.append('profile_img', this.selectedFile, this.selectedFile.name);
      }else{
        formData.append('prev_img', this.userDetails.profile_img);
      }

      this.chatconnect.postFormData(formData, 'update_profile').then(
        (result: any) => {
          console.log(result);
          this.commonservice.hide();
          if (result.Response.status == 1) {
            this.commonservice.presentToast('', result.Response.message);
            this.location.back();
          }
        },
        (err) => {
          this.commonservice.hide();
          console.log('Connection failed Messge');
        }
      );
      console.log(this.ionicForm.value);
    }
  }
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Password',
  //     buttons: ['Save'],
  //     inputs: [
  //     {
  //       placeholder: 'Old Password',
  //     },
  //     {
  //       placeholder: 'New Password',
  //       attributes: {
  //         maxlength: 18,
  //       },
  //     },
  //     {
  //       placeholder: 'Confirm Password',
  //       attributes: {
  //         maxlength: 18,
  //       },
  //     },
  //     ],
  //   });

  //   await alert.present();
  // }
}
