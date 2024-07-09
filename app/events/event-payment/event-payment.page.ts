import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { SuccessPage } from '../success/success.page';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Checkout } from 'capacitor-razorpay';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-event-payment',
  templateUrl: './event-payment.page.html',
  styleUrls: ['./event-payment.page.scss'],
})
  
export class EventPaymentPage implements OnInit {
  user_data: any;

  //razor_key: string = 'rzp_test_Gfm35q8J327oH6';
  razor_key: string = 'rzp_live_G3jYxHdfoo5gQR';
  currency: string = 'INR';

  constructor(
    public dataservice: DataService,
    public modalController: ModalController,
    public common: CommonService,
    public chatconnect: HttpService,
    public _route: ActivatedRoute,
    public navCtrl: NavController,
    private location: Location
  ) { 
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"user_profile").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        if(result.Response.user_data){
          this.dataservice.user_profile_data=result.Response.user_data[0];
          this.user_data=result.Response.user_data[0];
        }
      }else{
        this.common.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    }); 
  }
 
  ngOnInit() {
    console.log("Invite OR Reinvite ==> ", this._route.snapshot.params['invite_type']);
    console.log("Reinvite for page ==> ",this._route.snapshot.params['type']);

  }

  ionViewDidEnter() {
    console.log("Invite OR Reinvite ==> ", this._route.snapshot.params['invite_type']);
    console.log("Reinvite for page ==> ",this._route.snapshot.params['type']);
  }

  // GoNext(params: number) {
  //   params = 10;
  //   if (params > 0) {

  //     var UserCheckout = {
  //       "contact_person": this.user_data['user_name'],
  //       "contact_number": this.user_data['mobile'],
  //       "user_token": this.dataservice.getUserData(),
  //       "rp_payment_id": "",
  //       "retry_payment": 0,
  //       "method": 'Online',
  //       "amount": params,
  //       "products": this.dataservice.user_event_data.id,
  //       "type": this._route.snapshot.params['type'],
  //       "reason":  this._route.snapshot.params['invite_type']== "invite" ? 'invite' : 'reinvite',
  //       "duration": "",
  //       "start_date": "",
  //       "end_date": "",
  //       "action_type":this._route.snapshot.params['invite_type'] == "invite" ? 'sendSMS' : 'DoNotSendSMS',
  //     }
      
  //     const options = {
  //       currency: this.currency,
  //       key: this.razor_key,
  //       amount: (params * 100).toString(),
  //       name: 'SoEasy',
  //       description: 'Genesis',
  //       image: 'https://soeasyapp.com/dashboard/img/soeasy.png',
  //       prefill: {
  //         email: this.user_data['email'],
  //         contact: this.user_data['mobile'],
  //       },
  //       theme: {
  //         color: '#3399cc'
  //       }
  //     }
    
  //     try {
  //       Checkout.open(options).then((response: any) => {
  //         UserCheckout['rp_payment_id'] = response.response['razorpay_payment_id'];
  //         this.chatconnect.postData(UserCheckout, "checkout").then((result: any) => {
  //           console.log(result);
  //           if (result.Response.status == 1) {
  //             if (this._route.snapshot.params['invite_type'] == "invite") {
  //               this.OpenSuccess(this.dataservice.tokenUrl);
  //             } else {
  //               this.send_invite();
  //             }
  //           } else {
  //             this.common.presentToast("Oops", result.Response.message)
  //           }
  //         }, (err) => {
  //           console.log("Connection failed Messge");
  //         });
  //       });
  //     } catch (error: any) {
  //       if (typeof error === 'string') {
  //         let errorObj = JSON.parse(error);
  //         this.common.show(errorObj.description)
  //       } else {
  //         console.error('Unhandled error:', error);
  //       }
  //     }
  //   } else {
  //     this.common.presentToast("", "Select more Contacts..")
  //   }
  // }

  GoNext(params: number) {
    if (this._route.snapshot.params['invite_type'] != "invite") {
      this.send_invite();  
    } else {
      this.OpenSuccess('any');
      // this.navCtrl.navigateRoot('/tabs/dashboard');
      this.common.presentToast("","Invitation Send Successfully...")
    }
  }

  GoClose() {
    this.OpenSuccess('any');
  }

  send_invite() {
    console.log("Event OR Community ==> ",this._route.snapshot.params['type']);
    const userToken = this.dataservice.getUserData();

    if (this._route.snapshot.params['type'] == "free_community") {
      this.common.show("Please Wait");
      var formData = new FormData();
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('community_title', this.dataservice.user_event_data.community_title);
      formData.append('community_id', this.dataservice.user_event_data.id);
      formData.append('guest_contacts', JSON.stringify(this.dataservice.all_contacts.filter(obj => (obj as any).checked)));
   
      this.chatconnect.postFormData(formData, "invite_for_community").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.navCtrl.navigateRoot('/tabs/dashboard');
          this.common.presentToast("","Invitation Send Successfully...")
        } else {
          this.common.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        this.common.hide();
        console.log("Connection failed Messge");
      });
    } else {
      this.common.show("Please wait, don't press the back button.");
      console.log("Event Invitation")
      var formData = new FormData();
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('event_title', this.dataservice.user_event_data.title);
      formData.append('event_id', this.dataservice.user_event_data.id);
      formData.append('event_dates', JSON.stringify(this.dataservice.user_event_data.event_dates));
      formData.append('guest_contacts', JSON.stringify(this.dataservice.all_contacts.filter(obj => (obj as any).checked)));
       
      if (this._route.snapshot.params['type'] == "paid_event") {
        formData.append('event_type', "paid_event");
      } else {
        formData.append('event_type', "free_event");
      }

      this.chatconnect.postFormData(formData, "invite_for_event").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          if (this._route.snapshot.params['type'] == "paid_event") {
            this.location.back();
            this.location.back();
            
            // this.navCtrl.navigateRoot(['/buztabs/dashboard'])
          } else {
            this.navCtrl.navigateRoot('/tabs/dashboard');
          }
          this.common.presentToast("","Invitation Send Successfully...")
        } else {
          this.common.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        this.common.hide();
        console.log("Connection failed Messge");
      });
    }
  }

  async OpenSuccess(params: any){
    this.dataservice.shareable_event_url=params;
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'pindialog-container',
      handle: true,
      // componentProps: {
      //   share_url:params,
      // },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)
      if(data.data!= undefined){
        if(this.dataservice.shareable_event_url){
          this.closeModal();
          this.navCtrl.navigateRoot('/tabs/dashboard');
        }
 
      }
    });
    return await modal.present();
  }
 
  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }
}