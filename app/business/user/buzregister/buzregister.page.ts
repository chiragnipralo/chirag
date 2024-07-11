import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-buzregister',
	templateUrl: './buzregister.page.html',
	styleUrls: ['./buzregister.page.scss'],

	animations: [
		trigger('fadeIn', [
		state('void', style({ opacity: 0 })),
		transition(':enter', [
			animate('1000ms ease', style({ opacity: 1 })),
		]),
		]),
	],
})
	
export class BuzregisterPage implements OnInit {
	selectedValue: string | undefined;
	ionicForm!: FormGroup;
	isSubmitted = false;

	constructor(public formBuilder: FormBuilder,
		public alertController: AlertController,
		public common:CommonService,
		public dataservice: DataService,
		public chatconnect: HttpService,
		public router: Router,
		private _router: Router,
		public navCtrl: NavController,
		public loadingController: LoadingController) {
	}

	GetDashboard(){    
		return new Promise<any>((resolve, reject) => {
		let apidata={
			user_token:this.dataservice.getUserData()
		}
		this.chatconnect.postData(apidata,"user_dashboard").then((result:any)=>{
			console.log(result);
			if(result.Response.status ==1){
			this.dataservice.events_categories =result.Response.all_categories;
			resolve(true);
			}else{
			this.common.presentToast("Oops",result.Response.message)
			}
		},(err)=>{
			console.log("Connection failed Messge");
			reject(err);
		});    
		});
	}
	
	onDivClick(value: string) {
		if (this.selectedValue !== value) {
			this.selectedValue = value;
			console.log("Selected Value ==>", this.selectedValue)
		} else {
		this.selectedValue = undefined;
		}
	}
  
	ngOnInit(){
		this.ionicForm = this.formBuilder.group({
			account_type: [null, [Validators.required]],
			account_name: ['', [Validators.required]],
			contact: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
			address: ['', [Validators.required]],
			category: ['', [Validators.required]],
		})
		this.GetDashboard();
	}

	async submit() {
		this.isSubmitted = true;
		this.ionicForm.markAllAsTouched();
		console.log(this.ionicForm);
		if (!this.ionicForm.valid) {
		  let alert = await this.alertController.create({
			header: 'Please Enter',
			subHeader: 'Please Enter all details',
			buttons: ['Dismiss']
		  });
		  alert.present();
		} else {
		  this.common.show("Please Wait");
		  let apidata = {
			user_token: this.dataservice.getUserData(),
			type: this.selectedValue,
			account_type: this.ionicForm.value.account_type,
			account_name: this.ionicForm.value.account_name,
			email: this.ionicForm.value.email,
			category: this.ionicForm.value.category,
			contact: this.ionicForm.value.contact,
			address: this.ionicForm.value.address,
		  }
	  
		  console.log('API Data:', apidata);  // Log API data
	  
		  this.chatconnect.postData(apidata, "account_register").then((result: any) => {
			console.log('API Result:', result);  // Log API result
			this.common.hide();
			if (result.Response.status == 1) {
			  console.log("Type", this.selectedValue);
			  this.dataservice.setAccountuser(result.Response.account_id);
			  console.log("Type1", this.selectedValue);
			  this.ionicForm.reset();
			  this.router.navigate(['/choose-plan', { select_type: this.selectedValue }]);
			} else {
			  // Display error message if registration failed
			  this.common.presentToast("", result.Response.message);
			}
		  }, (err) => {
			this.common.hide();
			console.log("Connection failed Message");
		  });
		}
	  }
	  
	  
}