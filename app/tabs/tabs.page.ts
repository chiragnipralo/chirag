import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonTabs, ModalController, NavController, Platform } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],

  animations: [
    trigger('slideInFromBottom', [
      state('void', style({ opacity: 0, transform: 'translateY(100%)' })),
      transition(':enter', [
        animate('2000ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
  
export class TabsPage implements OnInit {
  @ViewChild('tabs', { static: false })
  tabs!: IonTabs;
  selectedTab: any;

  constructor(
    public _router: Router,
    public modalController: ModalController,
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router
  ) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/tabs/trending' || this.router.url === '/tabs/about' || this.router.url === '/tabs/chat') {
        this.navCtrl.navigateRoot('/tabs/dashboard');
      }
      else {
        this.navCtrl.back();
      }
      if (this.platform.is('android') && this.platform.is('cordova')) {
        if (window.location.pathname === '/tabs/dashboard') {
          (navigator as any)['app'].exitApp();
        }
      }
    });
  }
  ngOnInit() {
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
  }

  qrcode() {
    this._router.navigate(['qrcode'], {
      queryParams: { scanActive: true }
    });
    this.modalController.dismiss();
  }  

  create_event() {
    // const navigationExtras: NavigationExtras = {
		// 	queryParams: {
    //     value1: 1,
    //     value2:''
		// 	}
		// };
		//this._router.navigate(['events/create'],navigationExtras)
    this._router.navigate(['pages/event-type']);
    this.modalController.dismiss();
  }

  create_community() {
    const navigationExtras: NavigationExtras = {
			queryParams: {
			  value: 1
			}
		};
		this._router.navigate(['create-community'],navigationExtras)
    this.modalController.dismiss();
  }
  
  digital_card(){
		this._router.navigate(['profilecards'])
    this.modalController.dismiss();
  }

  my_events(){
		this._router.navigate(['myevent'])
    this.modalController.dismiss();
  }
  
  my_community(){
		this._router.navigate(['my-community'])
    this.modalController.dismiss();
  }

  manageevent(){
		this._router.navigate(['managevent'])
    this.modalController.dismiss();
  }
  
  manage_community(){
		this._router.navigate(['manage-community'])
    this.modalController.dismiss();
  }
}
