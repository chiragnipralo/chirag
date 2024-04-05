import { AlertController,IonSlides,ModalController, NavController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Checkout } from 'capacitor-razorpay';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.page.html',
  styleUrls: ['./myevent.page.scss'],

  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
      animate('1000ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class MyeventPage implements OnInit {
  user_data: any;  
  manage_events = [];
  multiEvents = [];
  pending_payment_events = [];
  my_completed_events = [];
  my_draft_events=[];
  my_cancel_events=[];
  my_joined_events=[];
  invited_event=[];
  joined_completed_events=[];
  joined_cancel_events=[];
  upcoming_invited_event=[];
  completed_invited_event=[];
  my_upcoming_events = [];
  
  segment_one:number = 0;
  event_seg:string | undefined;

  //razor_key: string = 'rzp_test_Gfm35q8J327oH6';
  razor_key: string = 'rzp_live_G3jYxHdfoo5gQR';
  currency: string = 'INR';

  doRefresh(refresher: { target: { complete: () => void; }; }) {
    //this.ngOnInit();
    this.GetUserEvents();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  constructor( public commonservice:CommonService,
    private _router: Router,
    public router: Router,
    private navCtrl: NavController,
    public modalController: ModalController,
    public dataservice: DataService,
    private _route: ActivatedRoute,
    public chatconnect: HttpService,
    private datePipe: DatePipe,
    private alertController: AlertController) {
    let segment = this._route.snapshot.params['segment_type'];
    if (!segment) {
      segment = "1";
      let apidata={
        user_token:this.dataservice.getUserData()
      }
      this.chatconnect.postData(apidata,"user_profile").then((result:any)=>{
        if(result.Response.status ==1){
          if(result.Response.user_data){
            this.dataservice.user_profile_data=result.Response.user_data[0];
            this.user_data=result.Response.user_data[0];
          }
        }else{
          this.commonservice.presentToast("Oops",result.Response.message)
        }
      },(err)=>{
        console.log("Connection failed Messge");
      }); 
    }

    console.log("This is Selected",segment)
      this.event_seg="create";
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.slideTo(this.segment_one);
      this.slider.ionSlideDidChange.subscribe(() => {
        this.slideChanged();
      });
    }
  }

  @ViewChild('slider', { static: false }) private slider!: IonSlides;

  async segmentChanged() {
    if (this.slider) {
      await this.slider.slideTo(this.segment_one);
    }
  }  

  async isManinsegmentChanged() {
    if (this.slider) {
      this.slider.slideTo(0);
      this.segment_one = 0;
      this.slider.ionSlideDidChange.subscribe(() => {
        this.slideChanged();
      });
    }
  }  

  slideChanged() {
    if (this.slider) {
      this.slider.getActiveIndex().then(index => {
        this.segment_one = index;
      });
    }
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

  add_staff(params: any){
    this.dataservice.staff_data=params;
    this._router.navigate(['events/add-staff'])
  }

  ionViewDidEnter(){
    this.GetUserEvents();
  }

  ngOnInit() {
  }

  GetUserEvents(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"filter_events").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if (result.Response.status == 1) {
        this.multiEvents = result.Response.my_multiple_events;
        this.pending_payment_events = result.Response.pending_payment_events;
        this.my_upcoming_events=result.Response.my_upcoming_events;
        this.my_completed_events = result.Response.my_completed_events;
        this.my_draft_events=result.Response.my_draft_events;
        this.my_cancel_events=result.Response.my_cancel_events;
        this.invited_event=result.Response.invited_event;
        this.my_joined_events=result.Response.my_joined_events;
        this.joined_completed_events=result.Response.joined_completed_events;
        this.joined_cancel_events=result.Response.joined_cancel_events;
        this.upcoming_invited_event=result.Response.upcoming_invited_event;
        this.completed_invited_event=result.Response.completed_invited_event;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  multievent_details(params:any){
    if (params.event_flag === 3) {
      this._router.navigate(['pages/multieventdetails',{multievent_id:params.id}])
    }
  }

  async view_details(params:any){
    this.dataservice.events_guests=params;
    const modal = await this.modalController.create({
      component: GuestListPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        is_modal: true
      },
    });
    modal.onDidDismiss().then((data:any) => {
    });
    return await modal.present();
  }

  async presentAlertFeedback() {
    this.router.navigate(['/pages/feedback'])
  }

  view_detailss(params:any){
    this.dataservice.user_event_data = params;
    //this.dataservice.setEventData(params);
    if (!params.is_premium) {
      this._router.navigate(['/detailseve'])
    } else {
      this._router.navigate(['/event-details'])
    }
  }

  edit_details(params:any,draft_event:any){
    this.dataservice.user_event_data = params;
    this._router.navigate(['/edit-event',{event_draft:draft_event}])
  }

  async payNow(id: any, params: any) {
    const alert = await this.alertController.create({
      header: 'Pay Now',
      message: `Pay ${params.length} for Event`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Pay Now',
          handler: () => { 
            var UserCheckout = {
              "contact_person": this.user_data['user_name'],
              "contact_number": this.user_data['mobile'],
              "user_token": this.dataservice.getUserData(),
              "rp_payment_id": "",
              "retry_payment": 0,
              "method": 'Online',
              "amount": params.length,
              "products": id,
              "type":  'events_invite',
              "reason": 'events_invite',
              "duration": "",
              "start_date": "",
              "end_date": "",
              "action_type":'sendSMS',
            }
            
            const options = {
              currency: this.currency,
              key: this.razor_key,
              amount: (params.length * 100).toString(),
              name: 'SoEasy',
              description: 'Genesis',
              image: 'https://soeasyapp.com/dashboard/img/soeasy.png',
              prefill: {
                email: this.user_data['email'],
                contact: this.user_data['mobile'],
              },
              theme: {
                color: '#3399cc'
              }
            }
          
            try {
              Checkout.open(options).then((response: any) => {
                UserCheckout['rp_payment_id'] = response.response['razorpay_payment_id'];
                this.chatconnect.postData(UserCheckout, "checkout").then((result: any) => {
                  if (result.Response.status == 1) {
                    this.ionViewDidEnter();
                    this.commonservice.presentToast("", "Payment Done Successfully")
                  } else {
                    this.commonservice.presentToast("Oops", result.Response.message)
                  }
                }, (err) => {
                  console.log("Connection failed Messge");
                });
              });
            } catch (error: any) {
              if (typeof error === 'string') {
                let errorObj = JSON.parse(error);
                this.commonservice.show(errorObj.description)
              } else {
                console.error('Unhandled error:', error);
              }
            }
          }
        }
      ]
    });
    await alert.present();
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

  goBack() {
    this._router.navigate(['/tabs/home']);
  }
}