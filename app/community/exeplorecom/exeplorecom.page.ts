import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exeplorecom',
  templateUrl: './exeplorecom.page.html',
  styleUrls: ['./exeplorecom.page.scss'],
})
export class ExeplorecomPage implements OnInit {

  segment: string | undefined;
  community_type = [];
  community_typee = [];

  filterData:any = [];

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
  
  constructor( public commonservice:CommonService,
    private _router: Router,
    public dataservice: DataService,
    public authservice: AuthenticationService,
    private _route: ActivatedRoute,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.All_Community();
  }

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.community_type.filter((st:any) => {
        return (st.community_title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
  }

  All_Community(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      community_categ_id:this._route.snapshot.params['community_id']
    }
    this.chatconnect.postData(apidata,"explore_community_byid").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        if (Array.isArray(result.Response.explore_community)) {
          if (Array.isArray(result.Response.explore_premium_community)) {
            this.filterData = [...result.Response.explore_community, ...result.Response.explore_premium_community];
          } else {
            this.filterData = result.Response.explore_community;
          }
        }else if(Array.isArray(result.Response.explore_premium_community)){
          this.filterData = result.Response.explore_premium_community;
        }
        console.log("Joined Result ==> ",this.filterData)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  view_details(params:any){
    console.log("Deails Parameter ==> ",params)
    if (params.premium == 1) {
      console.log("This is premium")
      this.dataservice.user_community_data = params;
      this._router.navigate(['/premium-community-details'])
    } else {
      console.log("This is normal")
      this.dataservice.user_community_data = params;
      this._router.navigate(['/community-details'])
    }
  }
}