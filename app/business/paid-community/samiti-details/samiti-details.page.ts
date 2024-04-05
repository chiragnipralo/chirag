import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-samiti-details',
  templateUrl: './samiti-details.page.html',
  styleUrls: ['./samiti-details.page.scss'],
})
  
export class SamitiDetailsPage implements OnInit {

  communityData: any;
  samiti: any;
  showSearchBar = false;
  searchQuery = '';
  filterData:any;
  samiti_member: [] | undefined;
  
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public commonservice: CommonService,
    private alertController: AlertController
  ) { }

  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.GetSamitiDetails();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }
  
  ionViewDidEnter() {
    console.log('page enter');
    this.GetSamitiDetails();
  }

  ngOnInit() {
    console.log("If Here in Console")
    console.log("samiti ID:",this._route.snapshot.params['samiti_id'])
    // this.GetSamitiDetails();
  }

  GetSamitiDetails() {
    this.commonservice.show("");
    const id = this.dataservice.GetAccountuser();
    let apidata={
      user_token: this.dataservice.getUserData(),
      samiti_id:this._route.snapshot.params['samiti_id']
    }
 
    this.chatconnect.postData(apidata, "samiti_details_by_id").then((result: any) => {
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.samiti = result.Response.samiti_details[0];
        this.filterData = this.samiti;
        this.samiti_member = this.samiti.samiti_member
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  add_member() {
    this.router.navigate(['add-samiti-member',{samiti_id:this._route.snapshot.params['samiti_id']}])
  }

  async deleteSamitiMember(params:any) {
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
            console.log("Member table Id ==>", params)
            const id = this.dataservice.GetAccountuser();
             
            let apidata = {
              user_token: this.dataservice.getUserData(),
              community_id: id,
              samiti_id: this._route.snapshot.params['samiti_id'],
              row_id: params,
              command: "remove_member",
              type: "samiti",
              premium:"yes"
            }
 
            this.chatconnect.postData(apidata, "samiti_obitury_command").then((result: any) => {
              console.log(result);
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.GetSamitiDetails();
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
}