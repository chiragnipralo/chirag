import { AlertController,ModalController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paidmanage',
  templateUrl: './paidmanage.page.html',
  styleUrls: ['./paidmanage.page.scss'],
})
export class PaidmanagePage implements OnInit {

  events_data=[];
  showSearchBar = false;
  searchQuery = '';
  filterData = [];

  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchQuery = '';
    }
  }

  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.events_data.filter((data:any) => {
        return (data.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  constructor( public commonservice:CommonService,
    private _router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.GetUserEvents();
  }

  GetUserEvents(){
    let apidata={
      user_token:this.dataservice.getUserData(),
      account_id:this.dataservice.GetAccountuser(),
    }
    this.chatconnect.postData(apidata,"paid_manage_events").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.manage_events;
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
		this._router.navigate(['/event-details'])
		// this._router.navigate(['/detailseve',{event_id:params.id}])
	}


  async manage_event(params:any){
    this.dataservice.events_guests=params;
    console.log(this.dataservice.events_guests);
    const modal = await this.modalController.create({
      component: GuestListPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: { 
        is_modal: true
      },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)

    });
    return await modal.present();
  }

}
