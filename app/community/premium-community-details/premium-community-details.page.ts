import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController,AlertController, PopoverController, IonSlides, NavController } from '@ionic/angular';
import { ChatPage } from '../../pages/chat/chat.page';
import { MapActivityPage } from 'src/app/events/map-activity/map-activity.page';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Share } from '@capacitor/share';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { CommunityMemberPage } from '../community-member/community-member.page';
import { AddObituryPage } from '../add-obitury/add-obitury.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-premium-community-details',
  templateUrl: './premium-community-details.page.html',
  styleUrls: ['./premium-community-details.page.scss'],
})
  
export class PremiumCommunityDetailsPage implements OnInit {
  events_data=[];
  filterData = [];
  count :number =0;
  is_user_joining:boolean=false;
  fileName: string = '';
  fileAdminName: string = '';
  showMsg:any;
  senderMsg:any;
  selectedFile: File | undefined;
  jData = [];
  cData:any;
  messages: any[] = [];
  message: string = '';
  selectedFileName: string = '';
  selectedAdminFile: File | null = null;
  communityDescription!: SafeHtml;

  @ViewChild('slider', { static: true })
  private slider!: IonSlides;
  segment = 0;

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  slideChanged() {
    this.slider.getActiveIndex().then(index => {     
      console.log("Current index: " + index);
      this.segment = index;
    });
  }
  
  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.ngOnInit();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  constructor(private alertController: AlertController,
    public sanitizer: DomSanitizer,
    public commonservice:CommonService,
    public dataservice: DataService,  
    public modalController: ModalController,
    public popoverController: PopoverController,
    private _route: ActivatedRoute,
    public mapmodal: ModalController,
    public chatconnect: HttpService,
    private _router: Router,
    private navCtrl: NavController,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location) {
  }

  goBack(){
    this.navCtrl.pop();
  }

  async Viewmember() {
    if (this.dataservice?.user_community_data.member_details == 1) {
      const alert = await this.alertController.create({
        header: 'Locked',
        message: 'You Cannot see community Members!!',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            cssClass: 'secondary',
          },
        ],
      });
      await alert.present();
    } else {
      this.dataservice.community_member = this.dataservice?.user_community_data;
      this.dataservice.is_premium = 1;
      this.dataservice.community_type = 2;
      console.log(this.dataservice.community_member);
      const modal = await this.modalController.create({
        component: CommunityMemberPage,
        cssClass: 'pindialog-container',
        handle: true,
        componentProps: {
          is_modal: true,
        },
      });
      modal.onDidDismiss().then((data: any) => {
        console.log("DATA HERE --->", data)

      });
      return await modal.present();
    }
  }

  async  Share_Event(){
    await Share.share({
      title: 'Commmunity Link',
      text: 'Join!!',
      url: this.dataservice?.user_community_data.community_url,
      dialogTitle: 'Share with buddies',
    });
  }

  community_post() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
  
    if (popover) {
      this.router.navigate(['/community-post', { community_id: this.dataservice.user_community_data.id }]);
      popover.dismiss();
    }
  }
  
  community_events() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
    if (popover) {

      const navigationExtras: NavigationExtras = {
        queryParams: {
          value: 1
        }
      };
      this.dataservice.user_community_data = this.dataservice.user_community_data;
      console.log(this.dataservice.user_community_data)
      this._router.navigate(['/community-event'], navigationExtras)
      popover.dismiss();
    }
  }

  All_community() {
    console.log("This Is Admin Post ==> ",this.dataservice?.user_community_data.admin_post)
    console.log("This Is Timeline Post ==> ",this.dataservice?.user_community_data.community_timeline)

    this.commonservice.show();
    let apidata = {
      premium: 1,
      user_token: this.dataservice.getUserData(),
      type:this.dataservice.user_community_data.type,
      community_id:this.dataservice.user_community_data.id
    }
    this.chatconnect.postData(apidata,"view_community_by_id").then((result:any)=>{
      this.commonservice.hide();
      console.log("This is result",result);
      if(result.Response.status ==1){
        this.dataservice.setCommunityData(result.Response.community_data);
        this.formatDescription(this.dataservice?.user_community_data?.community_description)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  formatDescription(description: string) {
    const convertedDescription = description.replace(/\r\n/g, '<br>');
    this.communityDescription =  this.sanitizer.bypassSecurityTrustHtml(convertedDescription);
  }

  join_community() {
    this.commonservice.show("Please Wait");
    let apidata={
      user_token:this.dataservice.getUserData(),
      community_id: this.dataservice.user_community_data.id,
      premium:1
    }
    console.log(apidata);
    this.chatconnect.postData(apidata,"join_community").then((result:any)=>{
      this.commonservice.hide();
      console.log(result);
      if(result.Response.status == 1){
        //this.modalController.dismiss();
        this.location.back();
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });
  }

  onFileSelectedAdminPost(event: any) {
    this.selectedAdminFile = event.target.files[0];
    this.fileAdminName = this.selectedAdminFile?.name || '';
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = event.target.files[0];
  
      if (this.selectedFile) {
        this.fileName = this.selectedFile.name;
        this.selectedFileName = fileInput.files[0].name;
      }
    }
  }

  adminPost() {
		if (!this.message && !this.selectedAdminFile) {
		  return; 
    }
    const userToken = this.dataservice.getUserData()
		const formData = new FormData();
		
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
		formData.append('community_id', this.dataservice?.user_community_data.id);
	
		if (this.selectedAdminFile) {
      const isImage = this.selectedAdminFile.type.startsWith('image/');
    
      if (isImage) {
        formData.append('community_images', this.selectedAdminFile, this.selectedAdminFile.name);
      }
    }
    
		if (this.message) {
		  formData.append('message', this.message);
		}
	
    formData.append('community_type', "2");
    
		this.chatconnect.postFormData(formData, 'community_admin_post').then(
		  (result: any) => {
			console.log(result);
      this.selectedAdminFile = null;
			this.fileAdminName = '';
			if (this.message) {
			  let message = {
				text: this.message,
				time: new Date(),
				sender: 'admin'
			  };
			  this.messages.push(message);
			  this.messages.sort((a, b) => a.time.getTime() - b.time.getTime());
			}
			this.ngOnInit();
		  },
		  (err) => {
			console.error(err);
      this.selectedAdminFile = null;
			this.fileAdminName = '';
		  }
		);
		this.message = '';
  }
  
  delete_timeline(params: any,params1: any) {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
    if (popover) {
      let apidata={
        user_token: this.dataservice.getUserData(),
        community_id: this.dataservice.user_community_data.id,
        member_id: params,
        row_id:params1,
        command: "delete",
        premium: 1,
        command_Type: "timeline"
      }
  
      this.chatconnect.postData(apidata, "verify_member").then((result: any) => {
        if(result.Response.status ==1){
          this.commonservice.presentToast("", result.Response.message);
          this.ngOnInit();
        }else{
          this.commonservice.presentToast("Oops",result.Response.message)
        }
        },(err)=>{
        console.log("Connection failed Messge");
      });  
      popover.dismiss();  
    }
  }

  timelinePost() {
    if (!this.message && !this.selectedFile) {
      return; 
    }
    const userToken = this.dataservice.getUserData()
    const formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('community_id', this.dataservice?.user_community_data.id);
    formData.append('isadmin', this.dataservice?.user_community_data.same_user_created_community ? '1' : '0');
    formData.append('status', '1');

    if (this.selectedFile) {
      const isImage = this.selectedFile.type.startsWith('image/');
    
      if (isImage) {
        formData.append('post_images', this.selectedFile, this.selectedFile.name);
      }
    }

    if (this.message) {
      formData.append('message', this.message);
    }

    formData.append('community_type',  this.dataservice?.user_community_data.type);
    this.chatconnect.postFormData(formData, 'community_timelime').then(
      (result: any) => {
        console.log(result);
        this.selectedFile = undefined;
        this.selectedFileName = '';
        console.log("Timeline Post",this.selectedFile)
        this.fileName = '';
        if (this.message) {
          let message = {
            text: this.message,
            time: new Date(),
            sender: 'admin'
          };
          this.messages.push(message);
          this.messages.sort((a, b) => a.time.getTime() - b.time.getTime());
        }
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
        this.selectedFile = undefined;
        this.fileName = '';
      }
    );
    this.message = '';
  }

  All_events(){
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id: this.dataservice.user_community_data.id,
      premium:  '1',
    }
    console.log("This is API Data ==> ",apidata)

    this.chatconnect.postData(apidata,"view_event_by_community_id").then((result:any)=>{
      // this.commonservice.hide();
      console.log(result);
      if(result.Response.status ==1){
        this.events_data=result.Response.events_data;
        this.filterData = this.events_data
        console.log("This is Result ==> ",result);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

  view_details(params: any){
    console.log("This Is Event Details ==> " ,params)
    this.dataservice.setEventData(params);
    this._router.navigate(['/event-details'])
    console.log("IF premium")
  }

  async leave_community() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
    if (popover) {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: 'Are you sure you want to Leave this community?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Yes',
            handler: () => {                    
              let apidata = {
                user_token: this.dataservice.getUserData(),
                community_id:  this.dataservice.user_community_data.id,
                premium: 1,
              }
              this.chatconnect.postData(apidata, "exit_community").then((result: any) => {
                if (result.Response.status == 1) {
                  this._router.navigate(['tabs/dashboard'])
                  this.commonservice.presentToast("", result.Response.message);
                } else {
                  this.commonservice.presentToast("Oops", result.Response.message)
                }
              }, (err) => {
                console.log("Connection failed Messge");
              });
            }
          }
        ],
      });
      await alert.present();
      popover.dismiss();
    }
  }

  async ngOnInit() {
    console.log("ngOnInit");
    await this.All_community();
    this.All_events();
  }

  async add_obituary(){
    const modal = await this.modalController.create({
      component: AddObituryPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: { 
        is_modal: true,
        community_id:this.dataservice.user_community_data.id
      },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)

    });
    return await modal.present();
  }

  getFormattedDate(eventDate: string): string {
      const date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
        const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
        return formattedDate || '';
      } else {
        return '';
      }
  }

}