import { AlertController,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  events_data=[]; 

  constructor( public commonservice:CommonService,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.GetUserEvents();
  }


  GetUserEvents(){
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"manage_events").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.manage_events;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });

  }

  async view_details(params: any){
    this.dataservice.events_guests=params;
    console.log(this.dataservice.events_guests);
    const modal = await this.modalController.create({
      component: GuestListPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: { 
        is_modal: true
      },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)

    });
    return await modal.present();
  }


}
