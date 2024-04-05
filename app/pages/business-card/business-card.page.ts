import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, AnimationController, IonSlides } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Share } from '@capacitor/share';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
 
@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.page.html',
  styleUrls: ['./business-card.page.scss'],
})
 
export class BusinessCardPage implements OnInit {
 
  modalData: any;
  imageUrls: string[] = [];
  currentSlideIndex: number = 0;

  constructor(
    public commonservice:CommonService,
    public common: CommonService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private animationCtrl: AnimationController,
    private navCtrl: NavController
    ) { }
 
  
    @ViewChild('slides', { static: true })
    slides!: IonSlides;
  
    totalSlides!: number;
  
    ngOnInit() {
      this.slides.length().then(length => {
        this.totalSlides = length;
        console.log("This is Total Number of slides",this.totalSlides)
      });
    }
  
    slideChanged() {
      this.slides.getActiveIndex().then(index => {
        this.currentSlideIndex = index;
        console.log("This is Current Slide",this.currentSlideIndex)
      });
    }
  
    nextSlide() {
      this.slides.slideNext();
    }
  
    prevSlide() {
      this.slides.slidePrev();
    }
  
  isModalAboutUsModalOpen = false;
  isModalAboutCompanyModalOpen = false;
  isModalGalleryModalOpen = false;
  
  setAboutUsModal(isOpen: boolean) {
    this.isModalAboutUsModalOpen = isOpen;
  }

  onAboutUsWillDismiss(event: Event) {
    this.isModalAboutUsModalOpen = false;
  }

  setAboutCompanyModal(isOpen: boolean) {
    this.isModalAboutCompanyModalOpen = isOpen;
  }

  onAboutCompanyWillDismiss(event: Event) {
    this.isModalAboutCompanyModalOpen = false;
  }

  setGalleryModal(isOpen: boolean) {
    this.isModalGalleryModalOpen = isOpen;
  }

  onGalleryWillDismiss(event: Event) {
    this.isModalGalleryModalOpen = false;
  }

  ionViewWillEnter() {
    this.showCard()
  }

  goBack() {
    this.navCtrl.back();
  }

  async share_card(url: any,file_name:any) {
    const token = this.dataservice.getUserData()
    const fullUrl = `${url}${file_name}?token=${token}&&?card_type=2`;
  
    await Share.share({
      title: 'Business Card',
      text: '..',
      url: fullUrl,
    });
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;
 
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
 
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
 
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
 
  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  showCard() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
      request_type:2
    };
    this.chatconnect.postData(apidata, "show_card").then((result: any) => {
      console.log(result);
      if (result.Response.status == 1) {
        this.modalData = result.Response.pesonal_card;
        this.imageUrls = this.modalData.images;
        console.log("This is Personal Card:",this.modalData)
      } else {
        this.common.presentToast("", result.Response.message);
      }
    }).catch((err) => {
      console.log("Connection failed Message", err);
      this.common.presentToast("Create Digital Card", "Please create your digital card first.");
    });
  }
 
  sharePDF(pdfUrl: string) {
    Share.share({
      title: 'Image',
      text: 'Check out this Image!',
      url: pdfUrl,
      dialogTitle: 'Share via...'
    })
    .then(() => {
      console.log('Image shared successfully');
    })
    .catch(error => {
      console.error('Error sharing PDF: ', error);
    });
  }
 
  base64toBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
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