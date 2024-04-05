import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';

@Component({
  selector: 'app-profilecards',
  templateUrl: './profilecards.page.html',
  styleUrls: ['./profilecards.page.scss'],
})

export class ProfilecardsPage implements OnInit {
  
  @ViewChild('modal', { static: false }) modalRef!: ElementRef;
  showCreateButton: boolean = false;
  isBusinessModalOpen: boolean = false;
  isPersonalModalOpen: boolean = false;
  modalData: any;
  modalData1: any;
  modalData2: any;

  constructor(
    public commonservice:CommonService,
    public common: CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public router: Router,
    public alertController: AlertController
    ) {
  }

  ngOnInit() {
    console.log("IF Enter into the page")
  }
   ionViewDidEnter() {
    this.pageWillEnter(1);
    this.pageWillEnter(2);
  }

  async share_pers_card(url: any, params: any) {
    const token = this.dataservice.getUserData()
    const fullUrl = `${url}${params}?token=${token}&&?card_type=1`;
    await Share.share({
      title: 'Personal Card',
      text: '..',
      url: fullUrl,
    });
  }
 
  async share_biz_card(url: any, params: any) {
    const token = this.dataservice.getUserData()
    const fullUrl = `${url}${params}?token=${token}&&?card_type=2`;

    await Share.share({
      title: 'Business Card',
      text: '..',
      url: fullUrl,
    });
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
  
  pageWillEnter(requestType: number) {
    console.log("If Here ==>")
    let apidata = {
      user_token: this.dataservice.getUserData(),
      request_type: requestType
    };
    console.log('api data', apidata);
    this.chatconnect.postData(apidata, "show_card").then((result: any) => {
      console.log(result);
      if (result.Response.status == 1) {
        if (requestType === 1) {
          // Personal card data
          this.modalData1 = result.Response.pesonal_card;
          console.log('personal card', this.modalData1);
        } else if (requestType === 2) {
          // Business card data
          this.modalData2 = result.Response.pesonal_card;
        }
      } else {
        this.common.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
      this.common.presentToast("Create Digital Card", "Please create your digital card first.");
    });
  }
 
  showCard(requestType: number) {
    const apidata = {
      user_token: this.dataservice.getUserData(),
      request_type: requestType
    };
    this.chatconnect.postData(apidata, "show_card").then((result: any) => {
      console.log(result);
      if (result.Response.status == 1) {
        this.modalData = result.Response.pesonal_card;
          if (requestType === 1) {
            this.modalData1 = result.Response.pesonal_card;
            this.isPersonalModalOpen = true;
          } else if (requestType === 2) {
            this.modalData2 = result.Response.pesonal_card;
            this.isBusinessModalOpen = true;
          }
      } else {
        this.common.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
      this.common.presentToast("Create Digital Card", "Please create your digital card first.");
    });
  }

  navigateToCreatePage(requestType: number) {
    this.router.navigate(['pages/create-card', { requestType }]);
    console.log('parameter',requestType);
  }

  navigateToEditPage(requestType: number) {
    this.router.navigate(['/editcard', { requestType }]);
    console.log('parameter',requestType);
  }

  dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  closeBusinessModal() {
    this.isBusinessModalOpen = false;
  }

  closePersonalModal() {
    this.isPersonalModalOpen = false;
  }

  cardOpen(){
    this.router.navigate(['pages/personal-card']);
  }
  busiOpen(){
    this.router.navigate(['pages/business-card']);
  }
  buOpen(){
    this.router.navigate(['/personalcard']);
  }
}