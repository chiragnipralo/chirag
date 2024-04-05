import { AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  count :number =0;
  is_user_joining:boolean=false;

  constructor(
    public commonservice:CommonService,
    public dataservice: DataService,
    private _router: Router,
    public chatconnect: HttpService,
    private alertController: AlertController,
    private router: Router) {}


  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Payment Done',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Confirm Cancel: done');
          // this.router.navigate(['/tabs/home']);
        },
      },],
    });

    await alert.present();
  }

  ngOnInit() {
    console.log(this.dataservice.user_event_data);
  }

  checkboxClick(event: { detail: { checked: any; }; }){
    console.log(event);
    if(event.detail.checked){
      this.is_user_joining=true
    }

    if(!event.detail.checked){
      this.is_user_joining=false;
      this.count=0
    }
    // contact.checked=!contact.checked;
  }


  join_events(){

    let apidata={
      user_token:this.dataservice.getUserData(),
      event_id:this.dataservice.user_event_data.id,
      people_coming:this.count,
    }
    console.log(apidata);
    this.chatconnect.postData(apidata,"join_events").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this._router.navigate(['/tabs']);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });
  }


}
