import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exploreeve',
  templateUrl: './exploreeve.page.html',
  styleUrls: ['./exploreeve.page.scss'],
})
export class ExploreevePage implements OnInit {

  segment: string | undefined;
  events_type: { title: string }[] = [];
  filterData: { title: string }[] = [];

  @ViewChild('searchBar', { read: ElementRef }) searchBarRef!: ElementRef<IonSearchbar>;
  showSearchBar: boolean | undefined;
  searchQuery: string = '';

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
  
  
  constructor( public commonservice:CommonService,
    private _router: Router,
    public dataservice: DataService,
    public authservice: AuthenticationService,
    private _route: ActivatedRoute,
    public chatconnect: HttpService,
    private datePipe: DatePipe,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  filterItems(event: any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.events_type.filter((st) => {
        return (st.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.All_events();
  }

  All_events(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      event_categ_id:this._route.snapshot.params['event_id']
    }
    this.chatconnect.postData(apidata,"explore_events_byid").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.events_type=result.Response.explore_events;
        this.filterData=this.events_type;
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  view_details(params: any){
    console.log(params)
    // this.dataservice.setEventData(params);
    this.dataservice.user_event_data=params;
    this._router.navigate(['/detailseve'])
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

