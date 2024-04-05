import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allevent',
  templateUrl: './allevent.page.html',
  styleUrls: ['./allevent.page.scss'],
})

export class AlleventPage implements OnInit {
  
  showSearchBar = false;
  searchQuery = '';
  events_data=[];
  filterData = [];
  event_name = '';

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

  constructor(
    public commonservice:CommonService,
    public dataservice: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public chatconnect: HttpService,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.event_name = this._route.snapshot.params['view_event'];
    console.log("ionViewDidEnter")
    this.All_events();
  }

  filterItems(event: { detail: { value: string; }; }){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.events_data.filter((data:any) => {
        return (data.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  view_details(params: any){
    console.log(params)
    this.dataservice.setEventData(params);
    this._router.navigate(['/detailseve'])
  }

  All_events(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      event_type:this._route.snapshot.params['view_event']
    }

    this.chatconnect.postData(apidata,"all_events").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.events_data;
        this.filterData = this.events_data
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
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

    // Format the dummy date using DatePipe
    const formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
    return formattedTime || time;
  }
}