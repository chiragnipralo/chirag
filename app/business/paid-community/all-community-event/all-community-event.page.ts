import { AlertController,IonSlides,ModalController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute, RouterOutlet, ActivationStart } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-community-event',
  templateUrl: './all-community-event.page.html',
  styleUrls: ['./all-community-event.page.scss'],
})
export class AllCommunityEventPage implements OnInit {
  upcomingEvent=[];
  completeEvent=[];
  cancelEvent = [];
  draftEvent = [];
  events_data=[];
  event_seg: string | undefined;
  user_data:any;

  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
  }
  
  @ViewChild(RouterOutlet)
  outlet!: RouterOutlet;

  @ViewChild('slider', { static: true })
	private slider!: IonSlides;

	segment_one = 0;
	
	async segmentChanged() {
		await this.slider.slideTo(this.segment_one);
	  }
	
	slideChanged() {
		this.slider.getActiveIndex().then(index => {     
		  this.segment_one = index;
		});
  }
  
  isEventDateValid(eventDate: string): boolean {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);
    console.log("This is Result",eventDateObj > currentDate)
    return eventDateObj > currentDate;
  }
  
  constructor( public commonservice:CommonService,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private datePipe: DatePipe,
    private alertController: AlertController) { 
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
    this._router.navigate(['events/add-staff',{event_type:"paid_event"}]);
  }

  GetUserEvents() {
    const id = this.dataservice.GetAccountuser(); // Replace with the actual method to get the user response
    this.commonservice.show("Please Wait");
    let apidata={
    user_token:this.dataservice.getUserData(),
    community_id:id,
    }
    this.chatconnect.postData(apidata,"paid_community_details_by_id").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if (result.Response.status == 1) {
        this.upcomingEvent = result.Response.my_upcoming_events;
        this.completeEvent = result.Response.my_completed_events;
        this.cancelEvent = result.Response.my_cancel_events;
        this.draftEvent = result.Response.my_draft_events;
        console.log("This is Event data ==> ",this.upcomingEvent)
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
    const alert = await this.alertController.create({
      header: 'Send Review',
      buttons: [{
        text: 'Send',
        cssClass:'alert-button-get',
      }
      ],
      inputs: [
      {
        type: 'textarea',
        placeholder: 'Type here',
      },
      ],
    });

    await alert.present();
  }
  
  view_detailss(params:any){
    console.log(params)
    // this.dataservice.setEventData(params);
    this.dataservice.user_event_data=params;
    this._router.navigate(['/event-details'])
  }

  edit_details(params:any,draft_event:any){
    console.log(params)
    this.dataservice.user_event_data=params;
    this._router.navigate(['/edit-paid-event',{event_draft:draft_event}])
  }

  GetUserAccount(){
    let apidata = {
      user_token: this.dataservice.getUserData(),
    }
    this.chatconnect.postData(apidata,"show_account").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.my_paid_events;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });
  }

  view_account(params:any){
    console.log(params)
    this.dataservice.setAccountuser(params);
    this.modalController.dismiss();
    this._router.navigate(['/buztabs/map'])
  }
  
  ngOnInit() {
    this.GetUserEvents();
    this.GetUserAccount();
  }  

  formatTime(time: string): string {
    const isValidTimeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

    if (!isValidTimeFormat) {
      return time;
    }

    const dummyDate = new Date();
    const [hours, minutes] = time.split(':');
    dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    const formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
    return formattedTime || time;
  }
  
  getCityFromEvent(eventVenues: string): string {
      const city = eventVenues.split(',')[0].trim();
      return city;
  }

  getFormattedDate(eventDate: string): string {
      const date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
        const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
        return formattedDate || '';
      } else {
        return '';
      }
  }
  
}