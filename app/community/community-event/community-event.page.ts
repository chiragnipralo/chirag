import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController, IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-community-event',
  templateUrl: './community-event.page.html',
  styleUrls: ['./community-event.page.scss'],
})
  
export class CommunityEventPage implements OnInit {

  events_data=[];
  filterData = [];
  public premium!: number;

  @ViewChild('searchBar', { read: ElementRef })
  searchBarRef!: ElementRef<IonSearchbar>;
  showSearchBar: boolean | undefined;
  searchQuery: string | undefined;
  
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
    public commonservice: CommonService,
    public authservice: AuthenticationService,
    public dataservice: DataService,
    private route: ActivatedRoute,
    private _router: Router,
    public chatconnect: HttpService,
    private alertController: AlertController,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.premium = +params['value'];
      console.log(this.premium);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.All_events();
  }

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.events_data.filter((data:any) => {
        return (data.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  All_events(){
    this.commonservice.show();
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id: this.dataservice.user_community_data.id,
      premium:  this.premium.toString()
    }
    console.log("This is API Data ==> ",apidata)

    this.chatconnect.postData(apidata,"view_event_by_community_id").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.events_data;
        this.filterData = this.events_data
        console.log("This is Result ==> ",result);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  view_details(params:any){
    console.log("This Is Event Details ==> " ,params)
    this.dataservice.setEventData(params);
    if (this.premium == 0) {
      this._router.navigate(['/detailseve'])
    } else if (this.premium == 1) {
      this._router.navigate(['/event-details'])
      console.log("IF premium")
    }
  }
}
