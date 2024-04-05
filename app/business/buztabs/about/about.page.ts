import { Component, OnInit } from '@angular/core';
import { AlertController,NavController, } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-about',
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

	ispersonal = false;
	user_data:any;
	personal(isOpen: boolean) {
		this.ispersonal = isOpen;
	} 
	doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	constructor( public commonservice:CommonService,
		public _router: Router,
		public nav: NavController,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		public chatconnect: HttpService,
		private alertController: AlertController) { 
	}
	
	ionViewDidEnter() {
		this.GetData();
	}

	clearUserData(){
		localStorage.clear();
		this.authservice.isAuthenticated.next(false);
  // this._router.navigate(['/login']);
		this.nav.navigateRoot(['/login']);
	}

	Logout(){
		this.clearUserData();
	}

	EditProfile(){
		this._router.navigate(['/editprof'])
	}
	Wishlist(){
		this._router.navigate(['/wishlist'])
	}
	ManageEvent(){
		this._router.navigate(['/paidmanage'])
	}

	InviteEvent(){
		this._router.navigate(['/inviteevent'])
	}

	ngOnInit() {
	}

	GetData(){
		this.commonservice.show("Please Wait");
		let apidata={
			user_token:this.dataservice.getUserData(),
			account_id:this.dataservice.user_account_data.id,
		}
		this.chatconnect.postData(apidata,"paid_user_profile").then((result:any)=>{
			this.commonservice.hide();
			console.log(result);
			if(result.Response.status ==1){
				if(result.Response.user_data){
					this.dataservice.user_profile_data=result.Response.user_data[0];
					this.user_data=result.Response.user_data[0];
				}

			}else{
				this.commonservice.presentToast("Oops",result.Response.message)
			}
		},(err)=>{
			this.commonservice.hide();
			console.log("Connection failed Messge");
		});    
	}


}
