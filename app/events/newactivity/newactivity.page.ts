import { Component, OnInit } from '@angular/core';
import { ModalController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-newactivity',
  templateUrl: './newactivity.page.html',
  styleUrls: ['./newactivity.page.scss'],
})
export class NewactivityPage implements OnInit {

  activity_details:any;
  activity_name:any;

  constructor(  public modalController: ModalController) {}

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
      'activity_name': this.activity_name,
      'activity_details': this.activity_details,
    });
  }

}


