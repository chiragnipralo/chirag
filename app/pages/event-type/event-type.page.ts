import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.page.html',
  styleUrls: ['./event-type.page.scss'],
})
export class EventTypePage implements OnInit {

  constructor(
    private _router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    console.log("This is ngOnit")
  }

  ionViewDidEnter() {
		console.log('Refreshing page...');
  }
  
  multievent() {
		this._router.navigate(['multi-event']);
    console.log("This is Multi event!!")
  }

  goBack(){
    this.navCtrl.pop();
  }

  singleevent() {
    const navigationExtras: NavigationExtras = {
		  queryParams: {
				value1: 1,
			  	value2:''
		  }
		};
	  
		this._router.navigate(['events/create'], navigationExtras);
    console.log("This is single event!!",navigationExtras)
  }
}
