import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-curr-plan',
  templateUrl: './curr-plan.page.html',
  styleUrls: ['./curr-plan.page.scss'],
})
export class CurrPlanPage implements OnInit {

  current_plan = [];

  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
  }
  
  constructor(
    public commonservice:CommonService,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService) { }

  ngOnInit() {
    this.CurrentPlan();
  }

  CurrentPlan() {
    const id = this.dataservice.GetAccountuser();
    this.commonservice.show("Please Wait");
    let apidata={
      user_token:this.dataservice.getUserData(),
      account_id:id,
    }
    this.chatconnect.postData(apidata,"premium_payment_plan").then((result:any)=>{
      this.commonservice.hide();
      if (result.Response.status == 1) {
        console.log("IF HERe",result.Response)
        this.current_plan = result.Response.current_plan;
        console.log("This is Current Plan ==>",this.current_plan);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }
}
