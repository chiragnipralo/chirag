import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {

  memberData:any;
  constructor( public commonservice:CommonService,
    private _router: Router,
    public dataservice: DataService,
    public authservice: AuthenticationService,
    private _route: ActivatedRoute,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  member_Details(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      user_id:this._route.snapshot.params['user_id']
    }
    this.chatconnect.postData(apidata,"user_details").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.memberData = result.Response.memberDetails[0];
        console.log("Member Details ==> ", this.memberData)
      }
      else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }
  ngOnInit() {
    console.log(this._route.snapshot.params['user_id']);
    this.member_Details();
  }
}
