import { AlertController,IonSearchbar,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit { 

  notification=[];
  filterData = [];
  showSearchBar = false;
  searchQuery = '';

  constructor( public commonservice:CommonService,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
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
  }

  filterItems(event:any){
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.notification.filter((st:any) => {
        return (st.notification_msg.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  AllNotifications(){
    let apidata={
      user_token: this.dataservice.getUserData(),
      type:"view_notification",
    }
    this.chatconnect.postData(apidata,"notifications").then((result:any)=>{
      if(result.Response.status ==1){
        this.notification=result.Response.notification;
        this.filterData = this.notification
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  } 

  ionViewWillEnter() {
    this.AllNotifications(); 
  }

  deleteNotification(params:number){
    let apidata={
      user_token: this.dataservice.getUserData(),
      type: "delete_notification",
      row_id:params
    }
    this.chatconnect.postData(apidata,"notifications").then((result:any)=>{
      if(result.Response.status ==1){
        this.notification=result.Response.notification;
        this.filterData = this.notification
        this.ionViewWillEnter();
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  } 

  view_details(params: any) {
    let apidata={
      user_token: this.dataservice.getUserData(),
      type: "update_status",
      row_id:params.id
    }
    this.chatconnect.postData(apidata,"notifications").then((result:any)=>{
      if (result.Response.status == 1) { 
        this.ionViewWillEnter();
      } else {
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });  

    //this.dataservice.setEventData(params);
    if (params.type == "free_event") {
      this.dataservice.user_event_data.id = params.notification_id
      this._router.navigate(['/detailseve'])  
    }
    else if (params.type == "paid_event") {
      let apidata={
        user_token:this.dataservice.getUserData(),
        event_id:params.notification_id
      }
      
      this.chatconnect.postData(apidata,"view_paid_events_by_id").then((result:any)=>{
        if(result.Response.status ==1){
          this.dataservice.setEventData(result.Response.events_data);
          this._router.navigate(['/event-details']) 
        }else{
          this.commonservice.presentToast("Oops",result.Response.message)
        }
      },(err)=>{ 
        console.log("Connection failed Messge");
      });    
    }
    else if (params.type == "free_community") {
      this.dataservice.user_community_data.id = params.notification_id;
      this.dataservice.user_community_data.account_type = 1;
      this._router.navigate(['/community-details']) 
    }
    else if (params.type == "free_draft_event") {
      this.dataservice.user_event_data.id = params.notification_id
      this._router.navigate(['/edit-event'])  
    }
    else if (params.type == "paid_draft_event") {
      this.dataservice.user_event_data.id = params.notification_id
      this._router.navigate(['/edit-paid-event'])  
    }
    else if (params.type == "free_community") {
      let apidata = {
        premium: 0,
        user_token: this.dataservice.getUserData(),
        type:1,
        community_id:params.notification_id
      }
      this.chatconnect.postData(apidata,"view_community_by_id").then((result:any)=>{
        if(result.Response.status ==1){
          this.dataservice.setCommunityData(result.Response.community_data);
          this._router.navigate(['/premium-community-details']) 
        }else{
          this.commonservice.presentToast("Oops",result.Response.message)
        }
      },(err)=>{ 
        console.log("Connection failed Messge");
      }); 
    }
  }
}