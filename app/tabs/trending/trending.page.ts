import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, IonSlides } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.page.html',
	styleUrls: ['./trending.page.scss'],
	animations: [
		trigger('fadeIn', [
		  state('void', style({ opacity: 0 })),
		  transition(':enter', [
			animate('1000ms ease', style({ opacity: 1 })),
		  ]),
		]),
	],
})

export class TrendingPage implements OnInit {

	showSearchBar = false;
	searchQuery = '';
	fadeInState = 'void';
	events_categories: { name: string }[] = [];
	filterData: any = [];
	segment = 0;
	
	@ViewChild('searchBar', { read: ElementRef }) searchBarRef!: ElementRef<IonSearchbar>;
	@ViewChild('slider', { static: true }) private slider!: IonSlides;

	async segmentChanged() {
		await this.slider.slideTo(this.segment);
	}
	
	slideChanged() {
		this.slider.getActiveIndex().then(index => {     
		  console.log("Current index: " + index);
		  this.segment = index;
		});
	}
	
	get shouldShowEvents(): boolean {
		return this.segment === 0;
	}

    toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
		if (this.showSearchBar) {
			setTimeout(() => {
			const searchBar = this.searchBarRef.nativeElement;
			searchBar.setFocus();
			}, 100);
		} else {
			this.searchQuery = '';
		}
    }

	constructor( public commonservice:CommonService,
		private _router: Router,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		public chatconnect: HttpService,
		private alertController: AlertController) { 
	}

	ngOnInit() {
	}

	filterItems(event:any){
		console.log(event.detail.value)
		if(!this.dataservice.isNullOrUndefined(event.detail.value)){
			this.filterData = this.events_categories.filter((st) => {
				return (st.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
			});
			this.triggerFadeInAnimation();
		}
	}

	triggerFadeInAnimation() {
		this.fadeInState = 'in';
	}

	ionViewDidEnter(){
		console.log("ionViewDidEnter")
		this.All_events();
	}

	All_events() {
	  this.commonservice.show();
	  let apidata = {
	    user_token: this.dataservice.getUserData()
	  };
	  
	  this.chatconnect.postData(apidata, "all_categories").then((result: any) => {
	    this.commonservice.hide();
	    console.log(result);
	    
	    if (result.Response.status === 1) {
	      this.events_categories = result.Response.all_categories;
	      
	      // Sort the events_categories array alphabetically by the 'name' property
	      this.events_categories.sort((a, b) => {
	        const nameA = a.name.toLowerCase();
	        const nameB = b.name.toLowerCase();
	        return nameA.localeCompare(nameB);
	      });
	      
	      // Assign the sorted array to filterData
	      this.filterData = this.events_categories;
	    } else {
	      this.commonservice.presentToast("Oops", result.Response.message);
	    }
	  }, (err) => {
	    console.log("Connection failed Messge");
	  });
	}
	
	ExploreEv(params:any){
		console.log(params);
		this._router.navigate(['/exploreeve',{event_id:params.id}])
	}

	ExploreCom(params:any){
		console.log(params);
		this._router.navigate(['/exeplorecom',{community_id:params.id}])
	}
}