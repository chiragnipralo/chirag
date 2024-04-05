import { AlertController,ModalController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
 
@Component({
  selector: 'app-allmember',
  templateUrl: './allmember.page.html',
  styleUrls: ['./allmember.page.scss'],
})
 
export class AllmemberPage implements OnInit {
 
  communityData: any;
  member: any;
  showSearchBar = false;
  searchQuery = '';
  filterData = [];
 
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchQuery = '';
    }
  }
 
  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.member.filter((data:any) => {
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
        this.communityData = result.Response.Details;
        this.member = this.communityData[0].member;
        this.filterData = this.member
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }
 
  memberdetails(params:any) {
    console.log("This is member ID ==>", params)
    this._router.navigate(['/member-details',{user_id:params}]);
  }
 
  async make_admin(params:any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to make admin?',
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
              command: "admin",
              premium: 1,
              command_Type: "member"
            }
 
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
 
  async remove_admin(params:any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to remove?',
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
              command: "admin_remove",
              premium: 1,
              command_Type: "member"
            }
 
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
  async deletemember(params:any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to remove?',
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
  // deletemember(params) {
  //   console.log("Member Id ==>", params)
  //   this.commonservice.show("Please Wait");
  //   const userResponse = this.dataservice.GetAccountuser();
  //   const id = userResponse.id;
  //   let apidata={
  //     user_token: this.dataservice.getUserData(),
  //     community_id: id,
  //     member_id:params,
  //     command: "delete",
  //     premium: 1,
  //     command_Type: "member"
  //   }
 
  //   this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
  //     this.commonservice.hide();
  //     console.log(result);
  //     if(result.Response.status ==1){
  //       this.commonservice.presentToast("", result.Response.message);
  //       this.GetUserEvents();
  //     }else{
  //       this.commonservice.presentToast("Oops",result.Response.message)
  //     }
  //   },(err)=>{
  //     console.log("Connection failed Messge");
  //   });  
  // }
}