import { AlertController,IonSearchbar,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.page.html',
  styleUrls: ['./community-post.page.scss'],
})
export class CommunityPostPage implements OnInit {
  events_data=[];
  showSearchBar = false;
  searchQuery = '';
  filterData = [];
  communityData: any;
  post: any;

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

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.post.filter((data:any) => {
        return (data.user_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
  }
  
  constructor( public commonservice:CommonService,
    private _router: Router,
    private _route: ActivatedRoute,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.GetCommunityPost();
  }

  GetCommunityPost(){
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id:this._route.snapshot.params['community_id']
    }

    this.chatconnect.postData(apidata,"paid_community_details_by_id").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.communityData = result.Response.Details;
        this.post = this.communityData[0].timeline;
        this.filterData = this.post
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  verifytimeline(params: any,params1: any) {
    console.log("Member Id ==>", params)
    this.commonservice.show("Please Wait");
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id: this._route.snapshot.params['community_id'],
      member_id: params,
      row_id:params1,
      command: "verify",
      premium: 1,
      command_Type: "timeline"
    }

    console.log("this is api data ==>", apidata)
    this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.commonservice.presentToast("", result.Response.message);
        this.GetCommunityPost();
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  deletetimeline(params: any,params1: any) {
    console.log("Member Id ==>", params)
    this.commonservice.show("Please Wait");
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id: this._route.snapshot.params['community_id'],
      member_id: params,
      row_id:params1,
      command: "delete",
      premium: 1,
      command_Type: "timeline"
    }

    this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.commonservice.presentToast("", result.Response.message);
        this.GetCommunityPost();
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });  
  }
}
