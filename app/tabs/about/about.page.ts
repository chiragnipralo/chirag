import { Component, OnInit } from '@angular/core';
import { AlertController,NavController, } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { App, AppInfo } from '@capacitor/app';

@Component({
	selector: 'app-about',
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss'],
})
	
export class AboutPage implements OnInit {
	appInfo: AppInfo | null = null;
  	keys: string[] = [];
	ispersonal = false;
	user_data:any;
	notifyCount: any;
	
	personal(isOpen: boolean) {
		this.ispersonal = isOpen;
	} 

	doRefresh(refresher:any) {
		this.ionViewDidEnter();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	constructor( public commonservice:CommonService,
		public _router: Router,
		public nav: NavController,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		private activatedRoute: ActivatedRoute,
		public chatconnect: HttpService,
		private alertController: AlertController) { 
	}
	
	ionViewDidEnter() {
		this.GetData();
		this.GetDashboard();
	}

	clearUserData(){
		localStorage.clear();
		this.authservice.isAuthenticated.next(false);
  		// this._router.navigate(['/login']);
		this.nav.navigateRoot(['/login']);
	}

	async Logout() {
	  const alert = await this.alertController.create({
	    header: 'Confirm Logout',
	    message: 'Are you sure you want to logout?',
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: () => {
	        }
	      },
	      {
	        text: 'Yes',
	        handler: () => {
	          this.clearUserData();
	        }
	      }
	    ]
	  });
	  await alert.present();
	}

	EditProfile(){
		this._router.navigate(['/editprof'])
	}
	Wishlist(){
		this._router.navigate(['/wishlist'])
	}
	ManageEvent(){
		this._router.navigate(['/managevent'])
	}

	InviteEvent(){
		this._router.navigate(['/inviteevent'])
	}

	paymenthistory() {
		this._router.navigate(['/pages/paydemo'])
	}

	deleteUser(){
		this._router.navigate(['pages/delete-account'])
	}
	
	async ngOnInit() {
		// App.getInfo().then((obj:AppInfo)=>{
		// 	this.appInfo = obj;
		// 	this.keys = Object.keys(obj);
		// });

		this.activatedRoute.url.subscribe(() => {
			console.log("Refreshing..");
			this.GetData();
			this.GetDashboard();
		});
	}

	GetData(){
		// this.commonservice.show();
		let apidata={
			user_token:this.dataservice.getUserData()
		}
		this.chatconnect.postData(apidata,"user_profile").then((result:any)=>{
			//this.commonservice.hide();
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

	GetDashboard() {
		return new Promise<any>((resolve, reject) => {
			let apidata = {
			  user_token: this.dataservice.getUserData(),
			  user_fcm_token: this.dataservice.user_fcmpush_token
			};
	
			this.chatconnect.postData(apidata, "user_dashboard").then((result: any) => {
			  console.log(result);
				if (result.Response.status == 1) {
					this.notifyCount = result.Response.notify_count;
			  } else {
				this.commonservice.presentToast("Oops", result.Response.message);
			  }
			}, (err) => {
			  console.log("Connection failed Message");
			  reject(err);
			});
		  });
	}

	GoToMyEvents(params:any) {
		this._router.navigate(['/myevent', {segment_type:params}])
	}

	// payment() {
	// 	this._router.navigate(['pages/payment-info'])
	// }
}