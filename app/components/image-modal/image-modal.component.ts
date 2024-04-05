import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
  
export class ImageModalComponent  implements OnInit {
  ngOnInit() {}

  @Input()
  originalEventImages!: string[];

  constructor(public commonservice: CommonService,
    public dataservice: DataService,
    private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}