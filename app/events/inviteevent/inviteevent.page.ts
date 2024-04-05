import { AlertController,IonSearchbar,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inviteevent',
  templateUrl: './inviteevent.page.html',
  styleUrls: ['./inviteevent.page.scss'],
})
  
export class InviteeventPage implements OnInit {
  events_data=[];
  todays_event: any;
  filterData = [];
  showSearchBar = false;
  searchQuery = '';

  constructor( public commonservice:CommonService,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private datePipe: DatePipe,
    private alertController: AlertController) { 
  }

  @ViewChild('searchBar', { read: ElementRef })
  searchBarRef!: ElementRef<IonSearchbar>;
  
  toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
		if (this.showSearchBar) {
			setTimeout(() => {
				const searchBar = this.searchBarRef.nativeElement;
				searchBar.setFocus();
			}, 100);
		} else {
			this.searchQuery = '';
		}
  }
  
  ngOnInit() {
    this.GetUserEvents();
  }

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.events_data.filter((st:any) => {
        return (st.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  GetUserEvents(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"my_invites").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.my_invites;
        this.filterData = this.events_data
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  view_details(params:any){
    console.log(params)
    this.dataservice.setEventData(params);
    if (!params.is_premium) {
      this._router.navigate(['/detailseve'])
    } else {
      this._router.navigate(['/event-details'])
    }
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