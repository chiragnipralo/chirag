import {AlertController,LoadingController,NavParams,ModalController} from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { DataService } from "../../services/data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HttpService } from "../../services/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Component,EventEmitter,NgZone,Input,OnInit,Output,ViewChild} from "@angular/core";
import { AddMoreGuestPage } from "../add-more-guest/add-more-guest.page";
 
@Component({
  selector: "app-guest-list",
  templateUrl: "./guest-list.page.html",
  styleUrls: ["./guest-list.page.scss"],
})

export class GuestListPage implements OnInit {

  all_guests = [];
  invited_guests = [];
  coming_guests = [];
  attendees_guests = [];
  invite_acceptance_pending_guests = [];
  is_modal_open: boolean = false;
  segment: string | undefined;

  constructor(
    public commonservice: CommonService,
    private _router: Router,
    public modalCtrl: ModalController,
    public dataservice: DataService,
    public loadingController: LoadingController,
    public navParams: NavParams,
    public chatconnect: HttpService,
    private alertController: AlertController
  ) {
    this.segment = "coming";
  }
 
  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.All_events();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }
 
  JoinEvent(ev: { detail: { checked: any; }; }, params: { is_event_checked: any; }) {
    params.is_event_checked = ev.detail.checked;
    this.Save_guest(params);
  }
 
  segmentChanged(ev: { detail: { value: string; }; }) {
    if (ev.detail.value == "invited") {
      this.invited_guests = this.dataservice.events_guests.users_invited;
    }
 
    if (ev.detail.value == "coming") {
      this.coming_guests = this.dataservice.events_guests.users_coming;
    }
 
    if (ev.detail.value == "attendees") {
      this.attendees_guests = this.dataservice.events_guests.users_attendees;
    }
 
    if (ev.detail.value == "invite_acceptance_pending") {
      this.invite_acceptance_pending_guests =
        this.dataservice.events_guests.users_invite_acceptance_pending;
    }
  }
 
  getRepeatCount(scanCount: number): number[] {
    return Array.from({ length: scanCount }, (_, i) => i + 1);
  }
 
  ngOnInit() {
    console.log("Refreshing page...")
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter Refreshing page...")
    this.All_events();
  }
  isAdmin(userId: number): boolean {
    const eventManagers = this.dataservice.events_guests.event_managers;
    const adminUserId = this.dataservice.events_guests.user_id;
    return eventManagers.some((manager: any) => manager.user_id === userId) || userId === adminUserId;
  }
  

  All_events(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      event_id:this.dataservice.events_guests.id
    }
    this.chatconnect.postData(apidata,"view_events_by_id").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if (result.Response.status == 1) {
        this.dataservice.events_guests = result.Response.events_data;
        if (this.dataservice.ValidateArray(this.dataservice.events_guests.users_invited)) {
          this.invited_guests = this.dataservice.events_guests.users_invited;
        }
        if (this.dataservice.ValidateArray(this.dataservice.events_guests.users_coming)) {
          this.coming_guests = this.dataservice.events_guests.users_coming;
        }
        if (this.dataservice.ValidateArray(this.dataservice.events_guests.users_attendees)) {
          this.attendees_guests = this.dataservice.events_guests.users_attendees;
          // this.dataservice.events_guests.users_attendees.forEach((uat: { user_number: any; }, i: any) => {
            //   this.coming_guests.forEach((cog, i) => {
            //     if (uat.user_number == cog.user_number) {
            //       cog.is_event_checked = true;
            //     }
            //   });
            // });
        }
     
        if (!this.dataservice?.events_guests?.same_user_created_event) {
          this.segment = "coming";
        }
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  Manageqr() {
    this._router.navigate(["manageqr"], {
      queryParams: { scanActive: true, event_id:this.dataservice.events_guests.id },
    });
    //this.modalCtrl.dismiss();
  }
 
  filterItems(event: { detail: { value: string; }; }) {
    console.log("SEG VALUE --->", this.segment);
 
    if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
      if (this.segment == "invited") {
        console.log("If Search in Invited")
        this.invited_guests = this.dataservice.events_guests.users_invited.filter(
          (st: { user_name: string; }) => {
            return (
              st.user_name
                .toLowerCase()
                .indexOf(event.detail.value.toLowerCase()) > -1
            );
          }
        );
      }
 
      if (this.segment == "coming") {
        this.coming_guests = this.dataservice.events_guests.users_coming.filter(
          (st: { user_name: string; }) => {
            return (
              st.user_name
                .toLowerCase()
                .indexOf(event.detail.value.toLowerCase()) > -1
            );
          }
        );
      }
 
      if (this.segment == "attendees") {
        this.attendees_guests =
          this.dataservice.events_guests.users_attendees.filter((st: { user_name: string; }) => {
            return (
              st.user_name
                .toLowerCase()
                .indexOf(event.detail.value.toLowerCase()) > -1
            );
          });
      }
 
      if (this.segment == "invite_acceptance_pending") {
        this.invite_acceptance_pending_guests =
          this.dataservice.events_guests.users_invite_acceptance_pending.filter(
            (st: { user_name: string; }) => {
              return (
                st.user_name
                  .toLowerCase()
                  .indexOf(event.detail.value.toLowerCase()) > -1
              );
            }
          );
      }
    }
  }
 
  Save_guest(params: any) {
    console.log(this.dataservice.events_guests);
    console.log(this.coming_guests);
    console.log(
      this.dataservice.events_guests.users_coming.filter(
        (obj: { is_event_checked: any; }) => obj.is_event_checked
      )
    );
 
    let attend_guest = this.dataservice.events_guests.users_coming.filter(
      (obj: { is_event_checked: any; }) => obj.is_event_checked
    );
 
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_users: attend_guest,
      event_id: this.dataservice.events_guests.id,
    };
 
    this.loadingController
      .create({
        spinner: null,
        message: "Please Wait",
        cssClass: "custom-loading",
        backdropDismiss: false,
      })
      .then(async (res) => {
        res.present();
        console.log(apidata);
        this.chatconnect.postData(apidata, "add_users_to_event").then(
          (result: any) => {
            res.dismiss();
            console.log(result);
            if (result.Response.status == 1) {
              this.dataservice.events_guests.users_attendees = attend_guest;
              this.attendees_guests = attend_guest;
              this.commonservice.presentToast("Success", result.message);
            } else {
              res.dismiss();
              this.commonservice.presentToast("Oops", result.message);
            }
          },
          (err) => {
            res.dismiss();
            console.log("Connection failed Messge");
          }
        );
      });
  }
 
  async add_more_guest(){
    const modal = await this.modalCtrl.create({
      component: AddMoreGuestPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        is_modal: true,
        event_id:this.dataservice.events_guests.id
      },
    });
    modal.onDidDismiss().then((data: any) => {
      console.log("THis MOdal is Clicked")
      this.ionViewDidEnter();
    });
    return await modal.present();
  }

  // async closeModal() {
  //   await this.modalCtrl.dismiss({
  //     dismissed: true,
  //   });
  // }
  
  closeModal() {
    this._router.navigate(["tabs/dashboard"]);
  }
}