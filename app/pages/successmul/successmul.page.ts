import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-successmul',
  templateUrl: './successmul.page.html',
  styleUrls: ['./successmul.page.scss'],
})
export class SuccessmulPage implements OnInit {

  event_id: any;
  
  constructor(
    private _router: Router,
    public modalController: ModalController,
    private navCtrl: NavController,
    private _route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.event_id = this._route.snapshot.params['multievent_id']
    console.log("this is multievent ==> ", this.event_id);
  }

  async closeModal(){
    this.navCtrl.navigateRoot('/tabs/dashboard');
  }

  goto() {
    this._router.navigate(['pages/multieventdetails', { multievent_id: this.event_id}])
  }
}
