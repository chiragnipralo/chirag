import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isToastPresent = false;
  isLoading = false;
  selected_business:any;
  constructor(private _router: Router,private toastController: ToastController,public loadingCtrl: LoadingController,private alertController: AlertController,public dataservice: DataService) {}

  async presentToast(header: string,message: string): Promise<void> {
    if (!this.isToastPresent) {
      this.isToastPresent = true;
      const toast = await this.toastController.create({
        message: message,
        header: header || undefined,
        duration: 3000,
        position: 'bottom',
        cssClass: 'custom-toast',
        // color: color,
      });
      toast.present();
      await Haptics.impact({ style: ImpactStyle.Medium });
      toast.onDidDismiss().then(() => (this.isToastPresent = false));
    }
  }

  async SuccessToast(header: string,message: string): Promise<void> {
    if (!this.isToastPresent) {
      this.isToastPresent = true;
      const toast = await this.toastController.create({
        message: message,
        header: header || undefined,
        duration: 3000,
        position: 'bottom',
        cssClass: 'success-toast',
        // color: color,
      });
      toast.present();
      await Haptics.impact({ style: ImpactStyle.Medium });
      toast.onDidDismiss().then(() => (this.isToastPresent = false));
    }
  } 
  
  async show(msg?: any) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    console.log("called hide");
    this.isLoading = false;
    while (await this.loadingCtrl.getTop() !== undefined) {
      await this.loadingCtrl.dismiss();
    }
  } 
  
  // async EventInvitationAlert(eventid: any, notify_type: any, title?: string, subtitle?: string) {
  //     const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: title ? title : "Invitation",
  //     backdropDismiss: false,
  //     message: subtitle ? subtitle : "Invitation",
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah: any) => {
  //           console.log('Confirm Cancel: blah', blah);
  //           console.log(eventid);
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {
  //           console.log(eventid);
  //           console.log(title);
  //           console.log(notify_type); 
  //           this.view_details(eventid,notify_type);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // async communityInvitationAlert(eventid: any, notify_type: any, title?: string, subtitle?: string) {
  //   const alert = await this.alertController.create({
  //   cssClass: 'my-custom-class',
  //   header: title ? title : "Invitation",
  //   backdropDismiss: false,
  //   message: subtitle ? subtitle : "Invitation",
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: (blah: any) => {
  //         console.log('Confirm Cancel: blah', blah);
  //         console.log(eventid);
  //       }
  //     }, {
  //         text: 'Yes',
  //         handler: () => {
  //           console.log(eventid);
  //           this.view_details(eventid,notify_type);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  view_details(params: any,notify_type:any) {
    if (notify_type == "create_event") {
      this.dataservice.user_event_data.id = params
      console.log("This is Id",this.dataservice.user_event_data.id)
      this._router.navigate(['/detailseve'])
    }
    else if (notify_type == "community_invite") {
      this.dataservice.user_community_data.id = params;
      this.dataservice.user_community_data.account_type = 1
      this._router.navigate(['/community-details']) 
    }
  }

}