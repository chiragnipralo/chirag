import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Share } from '@capacitor/share';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.page.html',
  styleUrls: ['./personal-card.page.scss'],
})
export class PersonalCardPage implements OnInit {
  modalData: any;

  constructor(
    public commonservice:CommonService,
    public common: CommonService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showCard()
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  async share_card(url: any, params: any) {
    const token = this.dataservice.getUserData()
    const fullUrl = `${url}${params}?token=${token}&&?card_type=1`;
  
    await Share.share({
      title: 'Personal Card',
      text: '..',
      url: fullUrl,
    });
  }

  showCard() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
      request_type:1
    };
    this.chatconnect.postData(apidata, "show_card").then((result: any) => {
      console.log(result);
      if (result.Response.status == 1) {
        this.modalData = result.Response.pesonal_card;
        console.log("This is Personal Card:",this.modalData)
      } else {
        this.common.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
      this.common.presentToast("Create Digital Card", "Please create your digital card first.");
    });
  }

  navigateToEditPage(requestType: number) {
    this.router.navigate(['/editcard', { requestType }]);
    console.log('parameter',requestType);
  }

  async openModal(originalEventImages: string[]) {
    console.log("This Is Image:",originalEventImages)
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        originalEventImages: originalEventImages
      }
    });
    return await modal.present();
  }
}