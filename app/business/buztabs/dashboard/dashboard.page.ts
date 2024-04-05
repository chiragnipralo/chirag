import { AlertController, IonSlides } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpService } from '../../../services/http.service';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
	
export class DashboardPage implements OnInit {

	showSearchBar = false;
 	searchQuery = '';
	segment_one: string | undefined;
	coordinate: any;
	watchCoordinate: any;
	watchId: any;
	community_data: any;
	member: any;
	timeline: any;
	adminpost: any;
	my_completed_events=[];
	messages: any[] = [];
	message: string = '';
	selectedFile: File | undefined;
	fileName: string = '';
	selectedFileName: string = '';

	@ViewChild('slider', { static: true })
	private slider!: IonSlides;

	segment = 0;
	
	async segmentChanged() {
		await this.slider.slideTo(this.segment);
	  }
	
	slideChanged() {
		this.slider.getActiveIndex().then(index => {     
		  this.segment = index;
		});
	}
	
	toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
		if (!this.showSearchBar) {
			this.searchQuery = '';
		}
	}

	toggleChanged(event: any) {
		if (event.detail.checked) {
		  this._router.navigate(['/tabs/dashboard']);
		}
	}

	doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}

	constructor( public commonservice:CommonService,
		private _router: Router,
		private sanitizer: DomSanitizer,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		public chatconnect: HttpService,
		private alertController: AlertController,
		private zone: NgZone) { 
		this.segment_one = "members";
	}

	@ViewChild('showCal') showCal: { setFocus: () => void; } | undefined ;
	  
	public showCaldate : boolean = false;

	GetUserCommunity() {
		const id = this.dataservice.GetAccountuser();
		console.log("This is Final Id ==> ",id);
		this.commonservice.show("Please Wait");
		let apidata={
		  	user_token:this.dataservice.getUserData(),
			community_id:id,
		}
		console.log("This is api Data ==> ", apidata)
		this.chatconnect.postData(apidata,"paid_community_details_by_id").then((result:any)=>{
			this.commonservice.hide();
			console.log(result);
			if(result.Response.status == 1){
				this.community_data = result.Response.Details[0];
				//console.log("this is community data ==> ", this.community_data)
				this.member = this.community_data.member;
				// console.log("this is community data memeber ==> ", this.member)
				this.timeline = this.community_data.timeline;
				console.log("this is community data memeber ==> ", this.timeline)
				this.adminpost = this.community_data.adminpost;
			}else{
				this.commonservice.presentToast("Oops",result.Response.message)
		  	}
		},(err)=>{
		  console.log("Connection failed Messge");
		});    
	}

	create_event() {
		this._router.navigate(['/create-event', {event_for:"community"}]);
	}

	onFileSelected(event: any) {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
		  this.selectedFile = event.target.files[0];
	  
		  if (this.selectedFile) {
			this.fileName = this.selectedFile.name;
			this.selectedFileName = fileInput.files[0].name;
		  }
		}
	  }
	
	adminPost() {
		const userToken = this.dataservice.getUserData();
		const id = this.dataservice.GetAccountuser();

		if (!this.message && !this.selectedFile) {
		  return; 
		}
		const formData = new FormData();
		
		if (userToken !== null) {
			formData.append('user_token', userToken);
		}
		formData.append('community_id', id);
	
		if (this.selectedFile) {
			const isImage = this.selectedFile.type.startsWith('image/');
		  
			if (isImage) {
			  formData.append('community_images', this.selectedFile, this.selectedFile.name);
			}
		}
	
		if (this.message) {
		  formData.append('message', this.message);
		}
	
		formData.append('community_type',"2");
		this.chatconnect.postFormData(formData, 'community_admin_post').then(
		  (result: any) => {
			console.log(result);
			this.selectedFile = undefined;
			this.fileName = '';
			if (this.message) {
			  let message = {
				text: this.message,
				time: new Date(),
				sender: 'admin'
			  };
			  this.messages.push(message);
			  this.messages.sort((a, b) => a.time.getTime() - b.time.getTime());
			}
			this.ngOnInit();
		  },
		  (err) => {
			console.error(err);
			this.selectedFile = undefined;
			this.fileName = '';
		  }
		);
		this.message = '';
	}
	
	ionViewWillEnter() {
		console.log("Refresheing page....")
	}
	
 	add_member() {
		const id = this.dataservice.GetAccountuser();
		const navigationExtras: NavigationExtras = {
		  queryParams: {
				value1: id,
		  }
		};
	  
		console.log("This is Extra Params ==> ",navigationExtras);
		this._router.navigate(['/add-member'], navigationExtras);
	}

	GoToEvents(params:any){
		this._router.navigate(['/events/allevent',{view_event:params}])
	}

	delete_post(params: any, params1: any) {
		//this.commonservice.show("Please Wait");
		const id = this.dataservice.GetAccountuser();
		let apidata={
			user_token: this.dataservice.getUserData(),
			community_id: id,
			member_id: params,
			row_id:params1,
			command: "delete",
			premium: 1,
			command_Type: "timeline"
		}

		this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
			//this.commonservice.hide();
			//console.log(result);
			if(result.Response.status ==1){
				this.commonservice.presentToast("", result.Response.message);
				this.ngOnInit();
			}else{
				this.commonservice.presentToast("Oops",result.Response.message)
			}
			},(err)=>{
			console.log("Connection failed Messge");
		});  
	}

	delete_admin_post(params: any, params1: any) {
		const id = this.dataservice.GetAccountuser();
		let apidata={
			user_token: this.dataservice.getUserData(),
			community_id: id,
			member_id: params,
			row_id:params1,
			command: "delete",
			premium: 1,
			command_Type: "adminpost"
		}

		this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
			console.log(result);
			if(result.Response.status ==1){
				this.commonservice.presentToast("", result.Response.message);
				this.ngOnInit();
			}else{
				this.commonservice.presentToast("Oops",result.Response.message)
			}
			},(err)=>{
			console.log("Connection failed Messge");
		});  
	}

	// view_details(params){
	// 	console.log(params)
	// 	this.dataservice.setEventData(params);
	// 	this._router.navigate(['/detailseve'])
	// }

	// transform(url) {
	// 	return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	// }

	ngOnInit(){
		console.log("ngOnInit");
		this.GetUserCommunity();
	}
	formatIndianDate(dateString: string | undefined): string {
	    if (!dateString) {
	      return ''; 
	    }
	  
	    const options: Intl.DateTimeFormatOptions = {
	      day: 'numeric',
	      month: 'long',
	      year: 'numeric',
	      hour: 'numeric',
	      minute: 'numeric',
	      second: 'numeric',
	      timeZone: 'Asia/Kolkata',
	    };
	  
	    const indianDate = new Date(dateString).toLocaleString('en-IN', options);
	    return indianDate;
	}  
	
}