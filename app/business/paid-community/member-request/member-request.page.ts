import { AlertController,IonSearchbar,ModalController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.page.html',
  styleUrls: ['./member-request.page.scss'],
})
export class MemberRequestPage implements OnInit {

  events_data=[];
  showSearchBar = false;
  searchQuery = '';
  filterData = [];
  communityData: any;
  member: any;

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

  filterItems(event: { detail: { value: string; }; }){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.filterData.filter((data:any) => {
        return (data.full_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
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
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.GetUserEvents();
  }

  GetUserEvents() {
    const id = this.dataservice.GetAccountuser();
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id:id
    }

    this.chatconnect.postData(apidata,"paid_community_details_by_id").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.communityData = result.Response.Details[0];
        this.member = this.communityData.member;
        this.filterData = this.member.filter((ui: { request: number; }) => ui.request === 1)
        console.log("This is Filter Data ==> ",this.filterData)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  memberdetails(params: any) {
    console.log("This is member ID ==>", params)
    this._router.navigate(['/member-details',{user_id:params}]);
  }

  async verifymember(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to accept member request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("Member Id ==>", params)
            this.commonservice.show("Please Wait");
            const id = this.dataservice.GetAccountuser();
            let apidata = {
              user_token: this.dataservice.getUserData(),
              community_id: id,
              member_id: params,
              command: "verify",
              premium: 1,
              command_Type: "member"
            }
            console.log("this is api Data ==>", apidata)
            this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
              this.commonservice.hide();
              console.log(result);
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.GetUserEvents();
              } else {
                this.commonservice.presentToast("Oops", result.Response.message)
              }
            }, (err) => {
              console.log("Connection failed Messge");
            });
          }
        }
      ],
    });
    await alert.present();
  }

  async deletemember(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to delete member request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("Member Id ==>", params)
            this.commonservice.show("Please Wait");
            const id = this.dataservice.GetAccountuser();
            let apidata={
              user_token: this.dataservice.getUserData(),
              community_id: id,
              member_id:params,
              command: "delete",
              premium: 1,
              command_Type: "member"
            }

            this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
              this.commonservice.hide();
              console.log(result);
              if(result.Response.status ==1){
                this.commonservice.presentToast("", result.Response.message);
                this.GetUserEvents();
              }else{
                this.commonservice.presentToast("Oops",result.Response.message)
              }
              },(err)=>{
                console.log("Connection failed Messge");
            }); 
          }
        }
      ],
    });
    await alert.present();
  }
}