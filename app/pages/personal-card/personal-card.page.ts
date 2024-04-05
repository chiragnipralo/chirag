import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import html2canvas from 'html2canvas';
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

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;


  generateAndSharePDF() {
    const content = this.pdfTable.nativeElement;
    console.log("IF Here ==>", content);
    html2canvas(content).then(canvas => {
      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.9); // 90% quality JPEG image
      const base64Data = imgDataUrl.split(',')[1];
      const blob = this.base64toBlob(base64Data, 'image/jpeg');

      // Ensure that this.dataservice.getUserData() is not null
      const userToken = this.dataservice.getUserData() || '';

      const formData = new FormData();
      formData.append('user_token', userToken);
      formData.append('idd', this.modalData.id);
      formData.append('card_type', '1');

      // Wrap the Blob in a BlobPart with a filename
      formData.append('Pdf_generated', new Blob([blob], { type: 'image/jpeg' }), 'contentToPdf.pdf');

      this.chatconnect.postFormData(formData, 'save_card').then(
        (result: any) => {
          console.log(result);
          // this.common.hide();
          if (result.Response.status == 1) {
            this.common.presentToast('', result.Response.message);
            this.sharePDF(result.Response.pdfLink);
          }
        },
      );
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