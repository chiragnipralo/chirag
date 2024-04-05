import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.page.html',
	styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
	segment: string;
	events_categories = [];
	filterData = [];

	constructor( public commonservice:CommonService,
		private _router: Router,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		public chatconnect: HttpService,
		private alertController: AlertController) { 
		this.segment = "community";
	}

	ngOnInit() {
	}


	filterItems(event: { detail: { value: string; }; }){
		console.log(event.detail.value)
		if(!this.dataservice.isNullOrUndefined(event.detail.value)){
			this.filterData = this.events_categories.filter((st:any) => {
				return (st.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
			});
		}
	}


	ionViewDidEnter(){
		console.log("ionViewDidEnter")
		this.All_events();
	}


	All_events(){
		let apidata={
			user_token:this.dataservice.getUserData()
		}
		this.chatconnect.postData(apidata,"all_categories").then((result:any)=>{
			console.log(result);
			if(result.Response.status ==1){
				this.events_categories=result.Response.all_categories;
				this.filterData = this.events_categories
			}else{
				this.commonservice.presentToast("Oops",result.Response.message)
			}
		},(err)=>{ 
			console.log("Connection failed Messge");
		});    
	}

	ExploreEv(params:any){
		console.log(params);
		this._router.navigate(['/exploreeve',{event_id:params.id}])
	}
}
