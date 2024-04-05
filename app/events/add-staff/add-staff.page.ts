import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.page.html',
  styleUrls: ['./add-staff.page.scss'],
})
export class AddStaffPage implements OnInit {
 
  searchTerm:any;
  event_man_role:any;
  user_lists=[];
  ev_managers:any={};
  selectedFromList: boolean = false;
 
  constructor(public commonservice:CommonService,
    public dataservice: DataService,
    public _route: ActivatedRoute,
    public _router: Router,
    public chatconnect: HttpService,
    private location: Location,
    private alertController: AlertController) {}
 
    testFunc(ev: { detail: { value: string | any[]; }; }) {
      console.log(ev.detail.value);
      console.log(ev.detail.value.length);
   
      if (this.selectedFromList) {
        // Reset the flag and return early if selected from the list
        this.selectedFromList = false;
        return;
      }
   
      if (ev.detail.value.length > 3) {
        let apidata = {
          user_token: this.dataservice.getUserData(),
          search_params: ev.detail.value,
        };
   
        this.chatconnect.postData(apidata, "get_all_users").then((result:any) => {
          console.log(result);
          if (result.Response.status == 1) {
            this.user_lists = result.Response.all_users;
          } else {
            this.commonservice.presentToast("Oops", result.Response.message);
          }
        }, (err) => {
          console.log("Connection failed Messge");
        });
      }
    }
   
 
  SetValue(params: { id: any; user_name: any; }){
    console.log(params);
    this.ev_managers.user_id = params.id;
    this.searchTerm = params.user_name;
    this.user_lists = [];
    this.selectedFromList = true;
  }

  SubmitData() {
    const event_type = this._route.snapshot.params['event_type'];

    this.ev_managers.event_role=parseInt(this.event_man_role);
    this.dataservice.staff_data.event_managers.push(this.ev_managers)
    let apidata={
      event_id:this.dataservice.staff_data.id,
      user_token:this.dataservice.getUserData(),
      event_managers: this.dataservice.staff_data.event_managers,
      event_type: event_type,
    }
    console.log(apidata)
    this.chatconnect.postData(apidata,"add_staff_to_event").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.commonservice.presentToast("",result.Response.message)
        // this._router.navigate(['/tabs']);
        this.location.back();
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });
  }
 
  ngOnInit(){
    console.log("Staff_data:", this.dataservice.staff_data)
    if(this.dataservice.ValidateArray(this.dataservice.staff_data.event_managers)){
    }
  }
}