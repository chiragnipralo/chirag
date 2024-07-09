import { AlertController,IonSlides,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { GuestListPage } from 'src/app/pages/guest-list/guest-list.page';
import { Component, EventEmitter,NgZone, Input, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-my-community',
  templateUrl: './my-community.page.html',
  styleUrls: ['./my-community.page.scss'],

  animations: [
		trigger('fadeIn', [
		  state('void', style({ opacity: 0 })),
		  transition(':enter', [
			animate('1000ms ease', style({ opacity: 1 })),
		  ]),
		]),
	],

})

export class MyCommunityPage implements OnInit {

  my_community=[];
  my_joined_community: any = [];
  invite_community = [];
  my_paid_joined_community = [];
  community_seg: string | undefined;
  segment: number = 0;
  public crateCommunityCount!: number;
  public joinedCommunityCount!: number;
  public inviteCommunityCount!: number;

  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.GetUserEvents();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
  }
  
  @ViewChild('slider', { static: true })
  private slider!: IonSlides;
  
	async segmentChanged() {
		await this.slider.slideTo(this.segment);
	  }
	
	  slideChanged() {
		this.slider.getActiveIndex().then(index => {     
		  console.log("Current index: " + index);
		  this.segment = index;
		});
	}
	
	// get shouldShowEvents(): boolean {
	// 	return this.segment === 0;
  // }

  constructor( public commonservice:CommonService,
    private _router: Router,
    public router: Router,
    public modalController: ModalController,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private alertController: AlertController) { 
    }

  handlerMessage = '';

  async deleteconfirm() {
    const alert = await this.alertController.create({
      header: 'Are You Sure!!',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Yes',
        role: 'confirm',
      },
      ],
    });

    await alert.present();
  }

  add_staff(params: any){
    console.log(params)
    this.dataservice.staff_data=params;
    this._router.navigate(['events/add-staff'])
  }
  
  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter")
    this.GetUserEvents();
  }

  GetUserEvents(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata,"filter_community").then((result:any)=>{
      this.commonservice.hide();

      console.log(result);
      if(result.Response.status ==1){
        this.my_community = result.Response.my_community;
        if (this.my_community) {
          this.crateCommunityCount = this.my_community.length;
        }

        if (Array.isArray(result.Response.my_joined_community)) {
          if (Array.isArray(result.Response.my_paid_joined_community)) {
            this.my_joined_community = [...result.Response.my_joined_community, ...result.Response.my_paid_joined_community];
          } else {
            this.my_joined_community = result.Response.my_joined_community;
          }
        } else if (Array.isArray(result.Response.my_paid_joined_community)) {
          this.my_joined_community = result.Response.my_paid_joined_community;
        }
        this.joinedCommunityCount = this.my_joined_community.length;

        this.invite_community = result.Response.invite_community;
        this.inviteCommunityCount = this.my_joined_community.length;

        if (this.crateCommunityCount > 0) {
          this.segment = 0;
        } else if (this.joinedCommunityCount > 0) {
          this.segment = 1;
        } else if (this.inviteCommunityCount > 0) {
          this.segment = 2;
        } else {
          this.segment = 0;
        }

        console.log("Joined Result ==> ", this.segment);
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  view_detailss(params:any){
    console.log("Deails Parameter ==> ",params)
    if (params.premium == 1) {
      console.log("This is premium")
      //this.dataservice.setCommunityData(params);
      this.dataservice.user_community_data = params;
      this._router.navigate(['/premium-community-details'])
    } else {
      console.log("This is normal")
      this.dataservice.user_community_data = params;
      this._router.navigate(['/community-details'])
    }
  }

  edit_details(params: any){
    console.log(params)
    this.dataservice.user_community_data=params;
    this._router.navigate(['/edit-event'])
  } 
}