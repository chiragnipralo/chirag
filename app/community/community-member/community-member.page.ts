import { AlertController, IonSearchbar, ModalController, PopoverController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, NgZone, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-community-member',
  templateUrl: './community-member.page.html',
  styleUrls: ['./community-member.page.scss'],
})
export class CommunityMemberPage implements OnInit {

  events_data = [];
  showSearchBar = false;
  searchQuery = '';
  filterData = [];
  is_modal_open: boolean = false;
  community_members: any = [];
  community_data: any;
  type: any;

  @ViewChild('searchBar', { read: ElementRef })
  searchBarRef!: ElementRef<IonSearchbar>;

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar) {
      setTimeout(() => {
        const searchBar = this.searchBarRef.nativeElement;
        searchBar.setFocus();
      }, 100);
    } else {
      this.searchQuery = '';
    }
  }

  filterItems(event: any) {
    if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
      this.filterData = this.community_members.filter((data: any) => {
        return (data.user_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.ngOnInit();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  constructor(
    public commonservice: CommonService,
    private _router: Router,
    public modalCtrl: ModalController,
    public dataservice: DataService,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    public chatconnect: HttpService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.is_modal_open = true;
    this.type = this.dataservice.community_type;
    this.community_data = this.dataservice.community_member;
    this.All_community();
  }

  All_community() {
    this.commonservice.show();
    let apidata = {
      premium: this.dataservice.is_premium,
      user_token: this.dataservice.getUserData(),
      type: this.dataservice.community_type,
      community_id: this.community_data.id
    }

    this.chatconnect.postData(apidata, "view_community_by_id").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        this.community_data = result.Response.community_data;
        this.community_members = result.Response.community_data.community_member;
        console.log("This is Community details ==>", this.community_data);
        console.log("Community Member ==> ", this.community_members);

        // Remove duplicates based on user_id
        this.community_members = this.community_members.filter((member: any, index: number, self: any) =>
          index === self.findIndex((m: any) => (
            m.user_id === member.user_id
          ))
        );

        this.filterData = this.community_members;
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }
}
