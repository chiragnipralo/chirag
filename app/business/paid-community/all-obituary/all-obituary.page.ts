import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-all-obituary',
  templateUrl: './all-obituary.page.html',
  styleUrls: ['./all-obituary.page.scss'],
})
  
export class AllObituaryPage implements OnInit {
  communityData: any;
  obitury: any;
  showSearchBar = false;
  searchQuery = '';
  filterData = [];

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    public commonservice:CommonService,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController
  ) { }

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
      this.filterData = this.obitury.filter((data:any) => {
        return (data.person_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  ngOnInit() {
    this.GetObituary();
  }
 
  GetObituary() {
    this.commonservice.show("");
    const id = this.dataservice.GetAccountuser();
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id:id
    }
 
    this.chatconnect.postData(apidata, "paid_community_details_by_id").then((result: any) => {
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.communityData = result.Response.Details;
        this.obitury = this.communityData[0].obitury;
        this.filterData = this.obitury
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  async verify_obituary(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to accept request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            this.popoverController.dismiss();
            const id = this.dataservice.GetAccountuser();
            let apidata = {
              user_token: this.dataservice.getUserData(),
              community_id: id,
              row_id: params,
              command: "verify_obituary",
              premium: "yes",
              type: "obituary"
            }
            console.log("this is api Data ==>", apidata)
            this.chatconnect.postData(apidata, "samiti_obitury_command").then((result: any) => {
              console.log(result);
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.GetObituary();
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

  async delete_obituary(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            this.popoverController.dismiss();
            console.log("Member Id ==>", params)
            const id = this.dataservice.GetAccountuser();
            let apidata={
              user_token: this.dataservice.getUserData(),
              community_id: id,
              row_id: params,
              command: "remove_obituary",
              premium: "yes",
              type: "obituary"
            }

            this.chatconnect.postData(apidata, "samiti_obitury_command").then((result: any) => {
              console.log(result);
              if(result.Response.status ==1){
                this.commonservice.presentToast("", result.Response.message);
                this.GetObituary();
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