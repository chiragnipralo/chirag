import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-manage-community',
  templateUrl: './manage-community.page.html',
  styleUrls: ['./manage-community.page.scss'],
})
export class ManageCommunityPage implements OnInit {

  showSearchBar = false;
  searchQuery = '';
  community_data=[];
  filterData = [];

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

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.community_data.filter((data:any) => {
        return (data.community_title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  ionViewDidEnter() {
    this.All_community();
  }

  All_community(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
    }

    this.chatconnect.postData(apidata,"manage_community").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.community_data=result.Response.manage_community;
        this.filterData = this.community_data.filter(item => item !== null);
        console.log("Length",this.filterData.length)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }  
  
  view_details(params:any){
    console.log(params)
    if (params.is_premium) {
      this.dataservice.user_community_data = params;
      this._router.navigate(['/premium-community-details'])
    } else {
      this.dataservice.setCommunityData(params);
      this._router.navigate(['/community-details'])
    }
  }

}
