import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-successcom',
  templateUrl: './successcom.page.html',
  styleUrls: ['./successcom.page.scss'],
})
export class SuccesscomPage implements OnInit {

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
