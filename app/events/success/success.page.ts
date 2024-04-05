import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from "../../services/data.service";
@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public dataservice: DataService,
    ) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }

}
