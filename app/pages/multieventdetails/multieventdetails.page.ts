import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, PopoverController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-multieventdetails',
  templateUrl: './multieventdetails.page.html',
  styleUrls: ['./multieventdetails.page.scss'],
})
export class MultieventdetailsPage implements OnInit {

  doRefresh(refresher: any) {
    this.ngOnInit();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  user_multievent_data: any;
  events_data = []

  constructor(
    public commonservice: CommonService,
    public dataservice: DataService,  
    public chatconnect: HttpService,
    private router: Router,
    private alertController: AlertController,
    public popoverController: PopoverController,
    private _route: ActivatedRoute,
    private navCtrl: NavController,
		private datePipe: DatePipe
  ) { }

  @ViewChild('slider', { static: true }) private slider!: IonSlides;
  segment = 0;
  
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  slideChanged() {
    this.slider.getActiveIndex().then(index => {     
      console.log("Current index: " + index);
      this.segment = index;
    });
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
  
  formatDate(time: string): string {
		const dummyDate = new Date();
		const [hours, minutes] = time.split(':');
		dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

		const formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
		return formattedTime || time;
  }
  
  ngOnInit() {
    this.All_events();
  }

  goBack() {
    this.navCtrl.pop();
  }

  create_event(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        value1: 3,
        value2:this._route.snapshot.params['multievent_id']
      }
    };
    this.router.navigate(['events/create'], navigationExtras);
  }

  async delete_event() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            let apidata={
              user_token: this.dataservice.getUserData(),
              community_id:this._route.snapshot.params['multievent_id'],
              command: "delete",
              command_Type: "multievent"
            }
            this.chatconnect.postData(apidata,"verify_member").then((result:any)=>{
              console.log(result);
              if(result.Response.status ==1){
                this.popoverController.dismiss();
                this.commonservice.presentToast("",result.Response.message)
                this.router.navigate(['/tabs/dashboard'])
              }else{
                this.commonservice.presentToast("Oops",result.Response.message)
              }
            },(err)=>{ 
              console.log("Connection failed Messge");
            }); 
          },
        },
      ],
    });
    await alert.present();
  }

  All_events(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      multievent_id:this._route.snapshot.params['multievent_id']
    }
    console.log("This is API Data ==> ",apidata);
    this.chatconnect.postData(apidata,"multiple_event_details_by_id").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.user_multievent_data = result.Response.multieventdata[0],
        this.events_data = this.user_multievent_data.my_events
        console.log("my data ==>",this.user_multievent_data)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  view_details(params: any){
    console.log(params)
    this.dataservice.setEventData(params);
    this.router.navigate(['/detailseve'])
  } 
  
}