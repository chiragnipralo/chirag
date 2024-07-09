import { Component, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform, NavController } from '@ionic/angular';
import { FirebaseMessaging, GetTokenOptions, Importance, Notification, Visibility} from '@capacitor-firebase/messaging';
import { DataService } from './services/data.service';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
import { App,URLOpenListenerEvent } from '@capacitor/app';

const LOGTAG = '[FirebaseMessagingPage]';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
  
export class AppComponent {
  public token = '';
  public deliveredNotifications: Notification[] = [];
  constructor(
    private platform: Platform,
    private _navController: NavController,
    public dataservice: DataService,
    public commonservice: CommonService,
    private readonly ngZone: NgZone,
    private router: Router
    ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      if(Capacitor.isNativePlatform()){
        this.requestPermissions();
        this.getToken();
        FirebaseMessaging.removeAllListeners().then(() => {
          FirebaseMessaging.addListener('tokenReceived', (event) => {
            console.log(`tokenReceived`, { event });
            this.ngZone.run(() => {
              this.dataservice.user_fcmpush_token=event.token
            });
          });
          FirebaseMessaging.addListener('notificationReceived', (event:any) => {
            console.log(`notificationReceived`, { event });
            if(event.notification){
              console.log(`event.notification ==============>`, event.notification.data.type);
              if (event.notification.data.type == 'create_event') {
                console.log("If Here...")
                //this.commonservice.EventInvitationAlert(event.notification.data.event_id,event.notification.data.type,
                //event.notification.title,event.notification.body)

              } else if (event.notification.data.type == 'community_invite') {
                //this.commonservice.communityInvitationAlert(event.notification.data.event_id,event.notification.data.type,
                  //event.notification.title,event.notification.body)
              }
            }
          });

          FirebaseMessaging.addListener('notificationActionPerformed', (event:any) => {
            console.log(`notificationActionPerformed`, { event });
            if(event.actionId =="tap"){
              console.log(`event.notification alert ==============>`, event.notification);
              if (event.notification.data.type == 'event_chat') {
                this.router.navigate(['tabs/chat'])
              }
              else if (event.notification.data.type == 'create_event' || event.notification.data.type == 'free_event') {
                this.dataservice.user_event_data.id = event.notification.data.event_id
                this.router.navigate(['/detailseve'])
              }
              else if (event.notification.data.type == 'paid_event') {
                this.dataservice.user_event_data.id = event.notification.data.event_id
                this.router.navigate(['/event-details'])
              }
              else if (event.notification.data.type == 'community_invite' || event.notification.data.type == 'free_community') {
                this.dataservice.user_community_data.id = event.notification.data.event_id;
                this.dataservice.user_community_data.account_type = 1;
                this.router.navigate(['/community-details'])
              }
              else if (event.notification.data.type == 'paid_community') {
                this.dataservice.user_community_data.id = event.notification.data.event_id;
                this.dataservice.user_community_data.account_type = 1;
                this.router.navigate(['/premium-community-details'])
              }
              else {
                console.log("Notification Not Working")
              }
            }
          });

        });
      }
    });

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.ngZone.run(() => {
          // const slug = event.url.split(".app").pop();
          // if (slug) {
          //     this.router.navigateByUrl(slug);
        // }
        const domain = 'soeasyapp.com';

        console.log("This Is Domain:",domain)
				const pathArray = event.url.split(domain);
				const appPath = pathArray.pop();
        if (appPath) {
          this.router.navigateByUrl(appPath);
        }
      });
  });
  }

  public async requestPermissions(): Promise<void> {
    await FirebaseMessaging.requestPermissions();
  }

  public async getToken(): Promise<void> {
    const { token } = await FirebaseMessaging.getToken();
    console.log(token);
    this.dataservice.user_fcmpush_token=token
  }

  public async getDeliveredNotifications(): Promise<void> {
    const result = await FirebaseMessaging.getDeliveredNotifications();
    this.deliveredNotifications = result.notifications;
    console.log("this.deliveredNotifications ===============>",this.deliveredNotifications);
  }

  onLogout(): void {
    // this._userDetailService.clearUserData();
    this._navController.navigateRoot('/auth');
  }
}
