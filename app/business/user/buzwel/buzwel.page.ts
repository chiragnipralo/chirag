import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ModalController,AlertController, PopoverController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-buzwel',
  templateUrl: './buzwel.page.html',
  styleUrls: ['./buzwel.page.scss'],
})
export class BuzwelPage implements OnInit {
  events_data=[];
  params: any;
  constructor(
  	public commonservice:CommonService,
  	public dataservice: DataService,
  	public chatconnect: HttpService,
  	private _router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    public modalController: ModalController,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.GetUserAccount();
  }

  goBack() {
    this.navCtrl.back();
this._router.navigate(['/tabs/dashboard'])
  }
  // backbuttom(){
    //this.navCtrl.back();
  //   this._router.navigate(['/tabs/dashboard'])
  // }

  GetUserAccount(){
    this.commonservice.show("Please Wait");
    let apidata={
      user_token:this.dataservice.getUserData(),
    }
    this.chatconnect.postData(apidata,"show_account").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.events_data=result.Response.my_paid_account;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      this.commonservice.hide();
      console.log("Connection failed Messge");
    });
  }
  
  async view_account(params: any) {
    console.log("This Is Data==>", params)
    if (params.payment_status == 1){
      this.dataservice.setAccountuser(params.id);
      if (params.type == 1) {
        this._router.navigate(['/buztabs/map'])
      } else if (params.type == 2) {
        this._router.navigate(['/buztabs/dashboard'])
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Pay Now',
        message: 'Your Subscription Expire ..',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Pay Now',
            handler: () => { 
              this.dataservice.setAccountuser(params.id);
              this._router.navigate(['/choose-plan', { select_type: params.account_type }]);
            }
          }
        ]
      });
      await alert.present();
    }
  }
}