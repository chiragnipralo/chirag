import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-all-samiti',
  templateUrl: './all-samiti.page.html',
  styleUrls: ['./all-samiti.page.scss'],
})
  
export class AllSamitiPage implements OnInit {

  communityData: any;
  samiti: any;
  showSearchBar = false;
  searchQuery = '';
  filterData = [];

  constructor(
    private router: Router,
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

  GoToDetailsPage(params:any) {
    this.router.navigate(['samiti-details', {samiti_id:params}])
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
      this.filterData = this.samiti.filter((data:any) => {
        return (data.samiti_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  ngOnInit() {
    this.GetSamitiDetails();
  }
 
  GetSamitiDetails() {
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
        this.samiti = this.communityData[0].samiti;
        this.filterData = this.samiti
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

}