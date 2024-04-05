import { AlertController,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],

  animations: [
		trigger('fadeIn', [
		  state('void', style({ opacity: 0 })),
		  transition(':enter', [
			animate('1000ms ease', style({ opacity: 1 })),
		  ]),
		]),
	],
})

export class MapPage implements OnInit {

  manage_events=[];
  my_completed_events=[];
  my_cancel_events=[];
  my_joined_events=[];
  invited_event=[];
  joined_completed_events=[];
  joined_cancel_events=[];
  upcoming_invited_event=[];
  completed_invited_event=[];
  my_upcoming_events=[];
  segment_one:String | undefined;
  event_seg:string | undefined;

  doRefresh(refresher:any) {
		//this.ngOnInit();
    this.GetUserEvents();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}

  constructor( public commonservice:CommonService,
    private _router: Router,
    public router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { 
      this.event_seg="create";
      this.segment_one="upcoming";
    }

  handlerMessage = '';

  async deleteconfirm() {
    const alert = await this.alertController.create({
      header: 'Are You Sure!!',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Yes',
        role: 'confirm',
      },
      ],
    });
    await alert.present();
  }

  add_staff(params:any){
    console.log(params)
    this.dataservice.staff_data=params;
    this._router.navigate(['events/add-staff'])
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter")
    this.GetUserEvents();
  }

  ngOnInit() {
    //this.GetUserEvents();
  }
  
  GetUserEvents(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"filter_events").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.my_upcoming_events=result.Response.my_upcoming_events;
        // this.manage_events=result.Response.manage_events;
        this.my_completed_events=result.Response.my_completed_events;
        this.my_cancel_events=result.Response.my_cancel_events;
        this.invited_event=result.Response.invited_event;
        this.my_joined_events=result.Response.my_joined_events;
        this.joined_completed_events=result.Response.joined_completed_events;
        this.upcoming_invited_event=result.Response.upcoming_invited_event;
        this.completed_invited_event=result.Response.completed_invited_event;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  async view_details(params:any){
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
  
  async presentAlertFeedback() {
    this.router.navigate(['/pages/feedback'])
  }

  view_detailss(params:any){
    console.log(params)
    // this.dataservice.setEventData(params);
    this.dataservice.user_event_data=params;
    this._router.navigate(['/detailseve'])
  }

  edit_details(params:any){
    console.log(params)
    this.dataservice.user_event_data=params;
    this._router.navigate(['/edit-event'])
  }

}