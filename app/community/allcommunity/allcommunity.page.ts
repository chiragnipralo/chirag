import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-allcommunity',
  templateUrl: './allcommunity.page.html',
  styleUrls: ['./allcommunity.page.scss'],
})
  
export class AllcommunityPage implements OnInit {

  showSearchBar = false;
  searchQuery = '';
  community_data=[];
  filterData = [];
  community_name = '';

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
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    if (this._route.snapshot.params['view_community'] == "community") {
      this.community_name = "My Communities";
    }else if (this._route.snapshot.params['view_community'] == "invite community") {
      this.community_name = "Invited Communities";
    } else if (this._route.snapshot.params['view_community'] == "popular community"){
      this.community_name = "Popular Communities";
    } else {
      this.community_name = "Communities";
    }
    this.All_community();
  }

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.community_data.filter((data:any) => {
        return (data.community_title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  view_details(params:any){
    console.log(params)
    this.dataservice.setCommunityData(params);
    this._router.navigate(['/community-details'])
  }

  All_community(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      event_type: this._route.snapshot.params['view_community'],
      account_type: 1,
      community_type :1
    }

    this.chatconnect.postData(apidata,"all_community").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.community_data=result.Response.community_data;
        this.filterData = this.community_data
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }   
}