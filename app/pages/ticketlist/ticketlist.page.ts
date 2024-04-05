import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.page.html',
  styleUrls: ['./ticketlist.page.scss'],
})
export class TicketlistPage implements OnInit {

  is_modal_open: boolean = false;
  payments = [];

  constructor(
    public dataservice: DataService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log("THIS IS DATA", this.dataservice.events_guests.is_premium);
    this.payments = this.dataservice.TicketList.slice(0, -1);
    console.log("THis is Payment Data==>", this.payments)
    this.is_modal_open=true;
  }

  async closeModal() {
    console.log("IF Clicked")
    await this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }
}
