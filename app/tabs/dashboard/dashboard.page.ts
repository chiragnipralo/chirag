import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Contacts } from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';
import { DomSanitizer } from "@angular/platform-browser";
import { IonSearchbar, LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../pages/notification/notification.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

	showSearchBar = false;
	showSearch = false;
	searchQuery = '';
	loaded = false;
	events: Event[] = [];
	segment_one: string | undefined;
	free_paid: string | undefined;
	coordinate: any;
	watchCoordinate: any;
	watchId: any;
	events_data = [];
	my_events = [];
	nearby_events = [];
	todays_event = [];
	upcoming_event = [];
	insights_arr = [];
	yt_videos_arr = [];
	free_events = [];
	paid_events = [];
	my_community = [];
	popular_community = [];
	invited_community = [];
	lists = [];
	notifyCount: any;
	public showCaldate: boolean = false;
	isDashboardPage: boolean | undefined;

	contacts: any[] = [];

	constructor(public commonservice: CommonService,
		private _router: Router,
		public appcomponent: AppComponent,
		private sanitizer: DomSanitizer,
		public dataservice: DataService,
		public authservice: AuthenticationService,
		public chatconnect: HttpService,
		private activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		public loadingController: LoadingController,
		private notificationService: NotificationService,
	) {
		this.segment_one = "Popular";
		this.free_paid = "Paid";
	}

	@ViewChild('showCal') showCal: { setFocus: () => void; } | undefined;

	@ViewChild('searchBar', { read: ElementRef }) searchBarRef!: ElementRef<IonSearchbar>;

	ionViewWillEnter() {
		console.log('Refreshing page ionViewWillEnter...');
		this.loaded = false;
		this.GetDashboard();
		this.updateNotifyCount();
	}
	async updateNotifyCount() {
		try {
		  const notifications = await this.notificationService.fetchNotifications();
		  this.notifyCount = this.notificationService.getNotifyCount();
		} catch (error) {
		  console.error('Error fetching notifications:', error);
		}
	  }

	async ngOnInit() {
		this.activatedRoute.url.subscribe(() => {
			this.GetDashboard();
		});

		if (Capacitor.isNativePlatform()) {
			const geoPermResult = await Geolocation.requestPermissions();
			const contactPermResult = await Contacts.requestPermissions();

			if (geoPermResult) {
				this.getCurrentCoordinate();
			}

			if (contactPermResult.contacts === 'granted') {
				const retrievedContacts = JSON.parse(localStorage.getItem('cust_contacts') || 'null');
				if (retrievedContacts && retrievedContacts.length > 0) {
					this.dataservice.all_contacts = retrievedContacts;
				} else {
					await this.retrieveListOfContacts();
				}
			} else if (contactPermResult.contacts === 'denied') {
				console.log('Contacts permission is denied. Please enable it to retrieve contacts.');
			}
			this.appcomponent.requestPermissions();
		}
	}

	async retrieveListOfContacts() {
		try {
			const projection = {
				name: true,
				phones: true,
			};
			const contacts = await Contacts.getContacts({ projection });
			contacts.contacts.forEach((contact: any) => {
				if (contact.name && contact.name.display && contact.phones) {
					for (let i = 0; i < contact.phones.length; i++) {
						if (contact.phones[i].number.length > 9) {
							this.contacts.push({
								'name': contact.name.display,
								'phone_number': contact.phones[i].number.replace(/\D/g, '').slice(-10)
							});
						}
					}
				}
			});
			this.contacts.sort((a, b) => this.compareObjects(a, b, 'name'));
			const unique = this.contacts.filter((value, index, self) => self.findIndex(v => v.phone_number === value.phone_number) === index);
			localStorage.setItem('cust_contacts', JSON.stringify(unique));
			this.dataservice.all_contacts = unique;
		} catch (error) {
			console.error('Error retrieving contacts:', error);
		}
	}

	async getCurrentCoordinate() {
		try {
			const position = await Geolocation.getCurrentPosition();
			this.coordinate = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				accuracy: position.coords.accuracy
			};
		} catch (error) {
			console.error('Error getting current position:', error);
		}
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

	GoToNotification() {
		this.notifyCount = 0; // Reset the count when navigating to the notification page
		this._router.navigate(['/pages/notification']);

	}

	toggleChanged(event: any) {
		if (event.detail.checked) {
			this._router.navigate(['/buzwel']);
		}
	}

	doRefresh(refresher: any) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}

	toggleCal() {
		this.showCaldate = !this.showCaldate;
		if (this.showCaldate)
			setTimeout(() => {
				if (this.showCal) this.showCal.setFocus();
			})
	}

	GetDashboard(refresher?: any) {
		return new Promise<any>((resolve, reject) => {
			let apidata = {
				user_token: this.dataservice.getUserData(),
				user_fcm_token: this.dataservice.user_fcmpush_token
			};

			this.chatconnect.postData(apidata, "user_dashboard").then((result: any) => {
				this.loaded = true;
				console.log("Value Updated==>", this.loaded)
				if (result.Response.status == 1) {
					this.notifyCount = result.Response.notify_count;
					this.dataservice.inviteCharge = result.Response.inviteCharge;
					this.my_community = result.Response.my_community;
					this.invited_community = result.Response.invited_community;
					this.popular_community = result.Response.popular_community;

					this.my_events = [];

					if (Array.isArray(result.Response.my_events)) {
						this.my_events = this.my_events.concat(result.Response.my_events);
					}

					if (Array.isArray(result.Response.my_multiple_events)) {
						this.my_events = this.my_events.concat(result.Response.my_multiple_events);
					}

					this.nearby_events = result.Response.nearby_events;
					this.todays_event = result.Response.todays_event;
					this.upcoming_event = result.Response.upcoming_event;
					this.free_events = result.Response.free_events;
					this.paid_events = result.Response.paid_events;
					this.dataservice.user_profile_data = result.Response.user_profile_data;
					this.insights_arr = result.Response.insights_arr;
					this.yt_videos_arr = result.Response.yt_videos_arr;
					this.dataservice.events_categories = result.Response.all_categories;
					this.dataservice.home_slider = result.Response.banner;
					resolve(true);
				} else {
					this.commonservice.presentToast("Oops", result.Response.message);
				}
				if (refresher) {
					setTimeout(() => {
						refresher.target.complete();
					}, 2000);
				}
			}, (err) => {
				console.log("Connection failed Message");
				reject(err);
			});
		});
	}

	getCityFromEvent(eventVenues: string): string {
		const city = eventVenues.split(',')[0].trim();
		return city;
	}

	getFormattedDate(eventDate: string): string {
		const date = new Date(eventDate);
		if (!isNaN(date.getTime())) {
			const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
			return formattedDate || '';
		} else {
			return '';
		}
	}

	filterItems(ev: any) {
		if (ev.detail.value.length > 2) {
			let apidata = {
				user_token: this.dataservice.getUserData(),
				search_params: ev.detail.value,
			};
			this.chatconnect.postData(apidata, "search").then((result: any) => {
				if (result.Response.status == 1) {
					this.lists = result.Response.search_result;
					console.log("search result ==>", this.lists)
				} else {
					this.commonservice.presentToast("Oops", result.Response.message);
				}
			},
				(err) => {
					console.log("Connection failed Messge");
				}
			);
			this.showSearch = true;
		} else {
			this.showSearch = false;
		}
	}

	create_community() {
		const navigationExtras: NavigationExtras = {
			queryParams: {
				value: 1
			}
		};
		this._router.navigate(['create-community'], navigationExtras);
	}

	create_events() {
		this._router.navigate(['pages/event-type']);
	}

	SearchResult(params: any) {
		if (params.flag == 1) {
			let apidata = {
				user_token: this.dataservice.getUserData(),
				event_id: params.id
			}
			this.chatconnect.postData(apidata, "view_events_by_id").then((result: any) => {
				if (result.Response.status == 1) {
					this.dataservice.setEventData(result.Response.events_data);
					this._router.navigate(['/detailseve'])
				} else {
					this.commonservice.presentToast("Oops", result.Response.message)
				}
			}, (err) => {
				console.log("Connection failed Messge");
			});
		} else if (params.flag === 2) {
			let apidata = {
				premium: 0,
				user_token: this.dataservice.getUserData(),
				type: 1,
				community_id: params.id
			}
			this.chatconnect.postData(apidata, "view_community_by_id").then((result: any) => {
				if (result.Response.status == 1) {
					this.dataservice.setCommunityData(result.Response.community_data);
					this._router.navigate(['/community-details'])
				} else {
					this.commonservice.presentToast("Oops", result.Response.message)
				}
			}, (err) => {
				console.log("Connection failed Messge");
			});
		}
	}

	transform(url: any) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	formatDate(time: string): string {
		const dummyDate = new Date();
		const [hours, minutes] = time.split(':');
		dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
		const formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
		return formattedTime || time;
	}

	view_details(params: any) {
		if (params.event_for == 'multiple_event') {
			this._router.navigate(['pages/multieventdetails', { multievent_id: params.id }])
		} else {
			this.dataservice.setEventData(params);
			this._router.navigate(['/detailseve'])
		}
	}

	view_event_details(params: any) {
		this.dataservice.setEventData(params);
		if (!params.is_premium) {
			console.log("If free event")
			this._router.navigate(['/detailseve'])
		} else {
			console.log("If paid event")
			this._router.navigate(['/event-details'])
		}
	}

	view_community_details(params: any) {
		this.dataservice.setCommunityData(params);
		this._router.navigate(['/community-details'])
	}

	view_insight(params: any) {
		this.dataservice.setInsightData(params);
		this._router.navigate(['/insights'])
	}

	GoToEvents(params: any) {
		this._router.navigate(['/events/allevent', { view_event: params }])
	}

	GoToCommunity(params: any) {
		this._router.navigate(['/allcommunity', { view_community: params }])
	}

	compareObjects(object1: { [key: string]: string }, object2: { [key: string]: string }, key: string) {
		let obj1 = object1[key]?.toUpperCase();
		let obj2 = object2[key]?.toUpperCase();

		if (obj1 < obj2) { return -1; }
		if (obj1 > obj2) { return 1; }

		return 0;
	}
}