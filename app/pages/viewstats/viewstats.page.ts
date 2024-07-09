import { AlertController, LoadingController, NavParams, ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TicketlistPage } from '../ticketlist/ticketlist.page';

@Component({
  selector: 'app-viewstats',
  templateUrl: './viewstats.page.html',
  styleUrls: ['./viewstats.page.scss'],
})
export class ViewstatsPage implements OnInit {
  all_guests = [];
  invited_guests = [];
  coming_guests = [];
  attendees_guests = [];
  invite_acceptance_pending_guests = [];
  event_food_type = [];
  event_male_user = [];
  poll_section = [];
  foodCount = [];
  is_modal_open = false;
  segment: string | undefined;

  isModalInvitedModalOpen = false;
  isModalComingModalOpen = false;
  isModalAttendeesModalOpen = false;
  isModalMaleModalOpen = false;
  isModalFemaleModalOpen = false;

  constructor(
    public commonservice: CommonService,
    private _router: Router,
    public modalCtrl: ModalController,
    public dataservice: DataService,
    public loadingController: LoadingController,
    public navParams: NavParams,
    public modalController: ModalController,
    public chatconnect: HttpService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.is_modal_open = true;
    this.coming_guests = this.dataservice.events_guests.users_coming;
    this.invited_guests = this.dataservice.events_guests.users_invited;
    this.attendees_guests = this.dataservice.events_guests.users_attendees;
    this.invite_acceptance_pending_guests = this.dataservice.events_guests.users_invite_acceptance_pending;
    this.event_food_type = this.dataservice.events_guests.event_food_type;
    this.event_male_user = this.dataservice.events_guests.usersGender;
    this.poll_section = this.dataservice.events_guests.poll_section_stats;
    this.foodCount = this.dataservice.events_guests.foodselected;
  }

  getGuestCount(guests: any[]): number {
    return guests ? guests.length : 0;
  }

  getMaleCount(): number {
    let maleCount = 0;
    if (Array.isArray(this.coming_guests)) {
      this.coming_guests.forEach((guest: any) => {
        if (guest && guest.gender && guest.gender === 'Male') {
          maleCount++;
        }
      });
    }
    return maleCount;
  }

  getFemaleCount(): number {
    let femaleCount = 0;
    if (Array.isArray(this.coming_guests)) {
      this.coming_guests.forEach((guest: any) => {
        if (guest && guest.gender && guest.gender === 'Female') {
          femaleCount++;
        }
      });
    }
    return femaleCount;
  }

  async ticketList() {
    this.dataservice.TicketList = Object.values(this.dataservice.events_guests.Ticketspayments);
    const modal = await this.modalController.create({
      component: TicketlistPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        is_modal: true,
      },
    });
    modal.onDidDismiss().then((data: any) => {});
    return await modal.present();
  }

  getFoodCount(foodId: number): number {
    if (!this.foodCount || this.foodCount.length === 0) {
      return 0;
    }
    let count = 0;
    this.foodCount.forEach((id) => {
      if (id === foodId) {
        count++;
      }
    });
    return count;
  }

  setOpenInvitedModal(isOpen: boolean) {
    this.isModalInvitedModalOpen = isOpen;
  }

  onInviteWillDismiss(event: Event) {
    this.isModalInvitedModalOpen = false;
  }

  setOpenComingModal(isOpen: boolean) {
    this.isModalComingModalOpen = isOpen;
  }

  onComingWillDismiss(event: Event) {
    this.isModalComingModalOpen = false;
  }

  setOpenAttendeesModal(isOpen: boolean) {
    this.isModalAttendeesModalOpen = isOpen;
  }

  onAttendeesWillDismiss(event: Event) {
    this.isModalAttendeesModalOpen = false;
  }

  setOpenMaleModal(isOpen: boolean) {
    this.isModalMaleModalOpen = isOpen;
  }

  onMaleWillDismiss(event: Event) {
    this.isModalMaleModalOpen = false;
  }

  setOpenFemaleModal(isOpen: boolean) {
    this.isModalFemaleModalOpen = isOpen;
  }

  onFemaleWillDismiss(event: Event) {
    this.isModalFemaleModalOpen = false;
  }

  doRefresh(refresher: any) {
    this.ngOnInit();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  async closeModal() {
    await this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
