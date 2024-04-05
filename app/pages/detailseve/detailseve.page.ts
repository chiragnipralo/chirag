import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, PopoverController, IonSlides, NavController, IonPopover } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { MapActivityPage } from 'src/app/events/map-activity/map-activity.page';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Share } from '@capacitor/share';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe, Location } from '@angular/common';
import { ViewstatsPage } from '../viewstats/viewstats.page';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

// declare var google: { maps: { LatLng: new (arg0: any, arg1: any) => any; MapTypeId: { ROADMAP: any; }; Map: new (arg0: HTMLElement | null, arg1: { zoom: number; center: any; mapTypeId: any; }) => any; Marker: new (arg0: { position: any; map: any; title: string; }) => any; }; };

declare var google: {
  maps: {
      ControlPosition: any;
      LatLng: new (arg0: any, arg1: any) => any;
      MapTypeId: { ROADMAP: any };
      Map: new (arg0: HTMLElement | null, arg1: { zoom: number; center: any; mapTypeId: any }) => any;
      Marker: new (arg0: { position: any; map: any; title: string }) => any;
      event: {
          addListener: (object: any, event: string, callback: () => void) => void;
      };
  };
};

@Component({
  selector: 'app-detailseve',
  templateUrl: './detailseve.page.html',
  styleUrls: ['./detailseve.page.scss'],
})

export class DetailsevePage implements OnInit {
  ionicForm!: FormGroup;
  isSubmitted = false;
  count: number = 1;
  is_user_joining: boolean = false;
  fileName: string = '';
  fileAdminName: string = '';
  showMsg: any;
  senderMsg: any;
  selectedFile: File | null = null;
  selectedAdminFile: File | null = null;
  jData = [];
  ImageData = [];
  cData: any;
  map: any;
  messages: any[] = [];
  message: string = '';
  selectedFood: any[] = [];
  selectedPoll: any[] = [];
  MultiMenuImgs: any = [];
  user_info: any;
  participent_name: any;
  participent_number: any;
  participent_gender: any;
  public isButtonEnabled = false;
  eventDate!: Date;
  isValid!: boolean;
  isModalOpen = false;
  user_data: any = [];
  //private isDragging = false; // Flag to track dragging state

  @ViewChild('slider', { static: true })
  private slider!: IonSlides;
  segment = 0;

  @ViewChild('map', { static: false })
  mapElement!: ElementRef;

  // doRefresh(refresher: { target: { complete: () => void; }; }) {
  //   this.ionViewDidEnter();
  //   setTimeout(() => {
  //     refresher.target.complete();
  //   }, 2000);
  // }

  @ViewChild('popover', { static: false })
  popover!: IonPopover;
  isPopOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isPopOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  slideChanged() {
    this.slider.getActiveIndex().then(index => {
      this.segment = index;
    });
  }

  constructor(private alertController: AlertController,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public sanitizer: DomSanitizer,
    public commonservice: CommonService,
    public dataservice: DataService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public mapmodal: ModalController,
    public chatconnect: HttpService,
    private _router: Router,
    private navCtrl: NavController,
    private location: Location) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  increment() {
    if (this.count < 7) {
      this.count++;
      this.addParticipant();
    }
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
      this.removeParticipant(this.count - 1);
    }
  }

  checkMobileNumber(participant: { mobileNumber: string; }) {
    if (participant.mobileNumber === '1234567890') {
    } else {
    }
  }

  getDayFromDate(eventDate: string): string {
    const date = new Date(eventDate);
    if (!isNaN(date.getTime())) {
      const day = this.datePipe.transform(date, 'EEEE');
      return day || '';
    } else {
      return '';
    }
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

  formatTime(time: string): string {
    const dummyDate = new Date();
    const [hours, minutes] = time.split(':');
    dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    // Format the dummy date using DatePipe
    const formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
    return formattedTime || time;
  }

  Viewguest() {
    this.dataservice.events_guests = this.dataservice?.user_event_data;
    this._router.navigate(['guest-list']);
  }

  async Viewstats() {
    this.dataservice.events_guests = this.dataservice?.user_event_data;
    const modal = await this.modalController.create({
      component: ViewstatsPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        is_modal: true
      },
    });
    modal.onDidDismiss().then((data: any) => {
      console.log("DATA HERE --->", data)
    });
    return await modal.present();
  }

  async ViewMapActivity() {
    this.dataservice.events_guests = this.dataservice?.user_event_data;
    const modal = await this.mapmodal.create({
      component: MapActivityPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        is_modal: true
      },
    });
    modal.onDidDismiss().then((data: any) => {
    });
    return await modal.present();
  }

  ticket(params: any) {
    const event_id = this.dataservice.user_event_data.id;
    const business = "free";
    this._router.navigate(['pages/ticket', { event_id, business }]);
    this.popoverController.dismiss();
  }

  async Share_Event() {
    await Share.share({
      title: 'Event Invitation Link',
      text: `${this.user_data.user_name} shared ${this.dataservice?.user_event_data?.title} Event`,
      url: this.dataservice?.user_event_data.event_url,
      dialogTitle: 'Share with buddies',
    });
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      user_details: this.formBuilder.array([]),
    })
    this.addParticipant();

    let apidata = {
      user_token: this.dataservice.getUserData()
    }
    this.chatconnect.postData(apidata, "user_profile").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        if (result.Response.user_data) {
          this.dataservice.user_profile_data = result.Response.user_data[0];
          this.user_data = result.Response.user_data[0];
        }
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      this.commonservice.hide();
      console.log("Connection failed Messge");
    });
  }

  addParticipant() {
    const user_infomration = this.formBuilder.group({
      user_info: [''],
      participent_name: [''],
      participent_number: [''],
      participent_gender: [''],
      food: [''],
    });
    this.getParticipantsArray.push(user_infomration);
  }

  removeParticipant(i: number) {
    this.getParticipantsArray.removeAt(i);
  }

  get getParticipantsArray() {
    return (<FormArray>this.ionicForm.get('user_details'));
  }

  async openModal(originalEventImages: string[]) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        originalEventImages: originalEventImages
      }
    });
    return await modal.present();
  }

  foodSelectionChanged(params: any, participantIndex: number) {
    const selectedFoodItem = params;
    const userDetailControl = this.getParticipantsArray.controls[participantIndex];

    if (userDetailControl) {
      const foodControl = userDetailControl.get('food');
      if (foodControl) {
        const currentFoodValue = foodControl.value;

        if (selectedFoodItem !== -1) {
          const selectedFoodArray = currentFoodValue ? currentFoodValue.split(',') : [];
          const index = selectedFoodArray.indexOf(selectedFoodItem.toString());

          if (index === -1) {
            selectedFoodArray.push(selectedFoodItem);
          } else {
            selectedFoodArray.splice(index, 1);
          }

          const updatedFoodValue = selectedFoodArray.join(',');
          userDetailControl.patchValue({ food: updatedFoodValue });
        } else {
          console.log('Invalid food selection.');
        }
      } else {
        console.error('Food control is null for participant ' + participantIndex);
      }
    } else {
      console.error('User detail control is null for participant ' + participantIndex);
    }
  }

  ionViewDidEnter() {
    console.log("Enter in Page..")
    this.listReview();
    this.All_events();
  }

  All_events() {
    //this.commonservice.show();
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id
    }
    this.chatconnect.postData(apidata, "view_events_by_id").then((result: any) => {
      //this.commonservice.hide();
      if (result.Response.status == 1) {
        this.dataservice.setEventData(result.Response.events_data);
        this.MultiMenuImgs = result.Response.events_data.menu_img_filename;
        this.loadMap();
        this.checkConditionforlive();

        this.eventDate = new Date(this.dataservice?.user_event_data.event_dates[0]['event_date']);
        this.isEventDateValid();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  isEventDateValid(): boolean {
    const currentDate = new Date();
    const isValid = this.eventDate > currentDate;
    return isValid;
  }

  loadMap() {
    const coordinatesArray = JSON.parse(this.dataservice?.user_event_data?.maps_coordinates || '[]');

    if (Array.isArray(coordinatesArray) && coordinatesArray.length > 0) {
      const firstCoordinate = coordinatesArray[0];
      const latitude = firstCoordinate.latitude;
      const longitude = firstCoordinate.longitude;

      var latlng = new google.maps.LatLng(latitude, longitude);
      var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
      };
      
      this.map = new google.maps.Map(document.getElementById("map"), myOptions);
      var marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
        title: "Marker Title"
      });
      
      const handleFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement !== null;
        console.log("Fullscreen change detected: ", isFullscreen);
        this.map.setOptions({ draggable: isFullscreen });
      };

      // Add event listener for changes in fullscreen mode
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    } else {
      console.error("No coordinates available or invalid data format.");
    }
  }
  
  checkConditionforlive() {
    const eventDates = this.dataservice?.user_event_data.event_dates;
    if (eventDates && eventDates.length > 0) {
      const firstEventDate = eventDates[0]['event_date'];
      const eventTime = eventDates[0]['start_time'];
      const eventDateTimeString = `${firstEventDate}T${eventTime}`;
      const eventDateTime = new Date(eventDateTimeString);
      const currentDate = new Date();
      // Corrected calculation for eventEndTime
      const eventEndTime = new Date(eventDateTime.getTime() - 30 * 60 * 1000);

      if (currentDate >= eventEndTime) {
        this.isButtonEnabled = true;
      }
    }
  }

  selectedOptionsMap: { [pollId: number]: string } = {};

  pollSelectionChanged(pollId: number, selectedOption: string) {
    this.selectedOptionsMap[pollId] = selectedOption;

    const foundIndex = this.selectedPoll.findIndex(
      (entry) => entry[0] === pollId && entry[1] === selectedOption
    );

    if (foundIndex === -1) {
      this.selectedPoll.push([pollId, selectedOption]);
    } else {
      this.selectedPoll.splice(foundIndex, 1);
    }
  }

  validateForm() {
    const participantsArray = this.ionicForm.get('user_details') as FormArray;
    const firstParticipant = participantsArray.at(0) as FormGroup;
    const duplicateNumber = this.dataservice.user_event_data?.users_coming;

    if (!firstParticipant.value.user_info) {
      this.commonservice.presentToast('Error', 'Please select Type');
      return false;
    }

    if (firstParticipant.value.user_info == 'other' && !firstParticipant.value.participent_name) {
      this.commonservice.presentToast('Error', 'Please fill Name');
      return false;
    }

    if (firstParticipant.value.user_info == 'other' && !firstParticipant.value.participent_number) {
      this.commonservice.presentToast('Error', 'Please fill Number');
      return false;
    }

    const maxNumberLength = 10;
    const numericRegex = /^[0-9]+$/;
    const isValidNumber = !numericRegex.test(firstParticipant.value.participent_number);

    if (firstParticipant.value.user_info === 'other' && firstParticipant.value.participent_number && firstParticipant.value.participent_number.length !== maxNumberLength) {
      this.commonservice.presentToast('Error', 'Number should be ' + maxNumberLength + ' digits');
      return false;
    }

    if (firstParticipant.value.user_info === 'other' && isValidNumber && firstParticipant.value.participent_number) {
      this.commonservice.presentToast('Error', 'Number should only contain numeric characters');
      return false;
    }

    const uniqueUserNumbers = new Set(duplicateNumber.map((user: { user_number: string }) => user.user_number));

    if (uniqueUserNumbers.has(firstParticipant.value.participent_number)) {
      this.commonservice.presentToast('Error', 'User already joined');
      return false;
    }

    for (let i = 1; i < participantsArray.length; i++) {
      const participant = participantsArray.at(i) as FormGroup;
      if (participant.value.user_info === 'other' && !participant.value.participent_name) {
        this.commonservice.presentToast('Error', 'Please fill in Name for participant ' + (i + 1));
        return false;
      }

      if (!participant.value.participent_name) {
        this.commonservice.presentToast('Error', 'Please fill in Name for participant ' + (i + 1));
        return false;
      }

      if (!participant.value.participent_number) {
        this.commonservice.presentToast('Error', 'Please fill in Number for participant ' + (i + 1));
        return false;
      }

      if (!numericRegex.test(participant.value.participent_number)) {
        this.commonservice.presentToast('Error', 'Number should be ' + maxNumberLength + ' digits for participant ' + (i + 1));
        return false;
      }

      if (participant.value.participent_number.length !== maxNumberLength) {
        this.commonservice.presentToast('Error', 'Number should only contain numeric characters for participant ' + (i + 1));
        return false;
      }

      if (uniqueUserNumbers.has(participant.value.participent_number)) {
        console.log('duplicateNumber');
        this.commonservice.presentToast('Error', 'User already joined ' + (i + 1));
        return false;
      }
    }
    return true;
  }

  async join_events() {
    this.isSubmitted = true;
    if (this.count == 0) {
      this.commonservice.presentToast("Error", "Please Check Count..");
    } else if (!this.validateForm()) {
      this.commonservice.presentToast("Error", "Please Fill filled");
    } else {
      console.log("This Is Form Data ==> ", this.ionicForm.value.user_details)
      this.commonservice.show("Please Wait");
      const userToken = this.dataservice.getUserData();
      var formData = new FormData();
      if (userToken) {
        formData.append('user_token', userToken);
      }
      formData.append('event_id', this.dataservice.user_event_data.id);
      formData.append('people_coming', this.count.toString());
      formData.append('poll', JSON.stringify(this.selectedPoll));
      formData.append('users_info', JSON.stringify(this.ionicForm.value));

      this.chatconnect.postFormData(formData, "join_events").then((result: any) => {
        this.commonservice.hide();
        if (result.Response.status == 1) {
          this.modalController.dismiss();
          //this.location.back();
          this.dataservice.events_guests = this.dataservice?.user_event_data;
          this._router.navigate(['guest-list']);
          this.commonservice.presentToast("", "Joined Successfully")
        } else {
          this.commonservice.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        console.log("Connection failed Messge");
      });
    }
  }

  edit_details() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null
    if (popover) {
      this.dataservice.user_event_data = this.dataservice.user_event_data;
      this._router.navigate(['/edit-event'])
      popover.dismiss();
    } else {
      console.error('Popover element not found.');
    }
  }

  invite() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
    if (popover) {
      this.dataservice.user_event_data = this.dataservice.user_event_data;
      this._router.navigate(['pages/reinvite', { type: "free_event" }]);
      popover.dismiss();
    } else {
      console.error('Popover element not found.');
    }
  }

  complete_event() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id,
    }
    this.chatconnect.postData(apidata, "complete_event").then((result: any) => {
      if (result.Response.status == 1) {
        this.popoverController.dismiss();
        this.commonservice.presentToast("", result.Response.message);
        this.location.back();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  live_event() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id,
      type: "live"
    }
    this.chatconnect.postData(apidata, "live_or_stop_event").then((result: any) => {
      if (result.Response.status == 1) {
        this.popoverController.dismiss();
        this.commonservice.presentToast("", result.Response.message);
        this.ionViewDidEnter();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  stop_event() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id,
      type: "stop"
    }
    this.chatconnect.postData(apidata, "live_or_stop_event").then((result: any) => {
      if (result.Response.status == 1) {
        this.popoverController.dismiss();
        this.commonservice.presentToast("", result.Response.message);
        this.ionViewDidEnter();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  async delete_event() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this event?',
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
              event_id: this.dataservice.user_event_data.id,
            }
            this.chatconnect.postData(apidata, "cancel_event").then((result: any) => {
              if (result.Response.status == 1) {
                this.popoverController.dismiss();
                this.commonservice.presentToast("", result.Response.message)
                this.location.back();
              } else {
                this.commonservice.presentToast("Oops", result.Response.message)
              }
            }, (err) => {
              console.log("Connection failed Messge");
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async report_block() {
    const alert = await this.alertController.create({
      header: 'Report & Block',
      message: 'Are you sure you want to report this event?',
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
              event_id: this.dataservice.user_event_data.id,
              event_type: "free_event",
            }
            this.chatconnect.postData(apidata, "report_block").then((result: any) => {
              if (result.Response.status == 1) {
                this.popoverController.dismiss();
                this.commonservice.presentToast("", result.Response.message)
                this.location.back();
              } else {
                this.commonservice.presentToast("Oops", result.Response.message)
              }
            }, (err) => {
              console.log("Connection failed Messge");
            });
          },
        },
      ],
    });
    await alert.present();
  }

  listReview() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice?.user_event_data.id,
      type: 'free'
    }
    this.chatconnect.postData(apidata, "event_review").then((result: any) => {
      this.jData = result.Response.event_review;
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  sendMessage() {
    if (this.senderMsg === '') {
      let smsg = "Enter Some Message";
      this.commonservice.presentToast("Oops", smsg);
    } else {
      if (!this.jData) {
        this.jData = [];
      }
      //this.jData.push({ "request": "admin","user_name": "You", "review": this.senderMsg });
      let apidata = {
        user_token: this.dataservice.getUserData(),
        event_id: this.dataservice?.user_event_data.id,
        review: this.senderMsg,
        event_type: 1,
      };
      this.chatconnect.postData(apidata, "event_feedback").then((result: any) => {
        this.ionViewDidEnter();
      }, (err) => {
      });
      this.senderMsg = '';
    }
  }

  onFileSelectedAdminPost(event: any) {
    this.selectedAdminFile = event.target.files[0];
    // this.fileAdminName = this.selectedAdminFile.name;
    this.fileAdminName = this.selectedAdminFile?.name || '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name || '';
  }

  sendImage() {
    const userToken = this.dataservice.getUserData();

    let formData = new FormData();
    if (userToken) {
      formData.append('user_token', userToken);
    }
    formData.append('event_id', this.dataservice?.user_event_data.id);
    if (this.selectedFile) {
      formData.append('event_images', this.selectedFile, this.selectedFile.name);
    }
    formData.append('event_type', '1');

    this.chatconnect.postFormData(formData, "event_photos").then((result: any) => {
      this.commonservice.presentToast("", result.Response.message)
      this.selectedFile = null;
      this.fileName = '';
      this.All_events();
    }, (err) => {
      console.error(err);
    });
  }

  sortedMessages(messages: any[]): any[] {
    const sortedArray = [...messages];
    sortedArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedArray;
  }

  adminPost() {

    if (!this.message && !this.selectedAdminFile) {
      return;
    }

    const userToken = this.dataservice.getUserData();
    const formData = new FormData();

    if (userToken) {
      formData.append('user_token', userToken);
    }
    formData.append('event_id', this.dataservice?.user_event_data.id);
    formData.append('type', 'free');

    if (this.selectedAdminFile) {
      const isImage = this.selectedAdminFile.type.startsWith('image/');
      if (isImage && this.selectedAdminFile) {
        formData.append('event_images', this.selectedAdminFile, this.selectedAdminFile.name);
      } else {
        formData.append('event_images', '');
      }
    }

    if (this.message) {
      formData.append('message', this.message);
    }
    formData.append('event_flag', '1');

    this.chatconnect.postFormData(formData, 'admin_post').then(
      (result: any) => {
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
        this.All_events();
      },
      (err) => {
        console.error(err);
        this.fileAdminName = '';
      }
    );
    this.message = '';
  }

  add_staff() {
    this.dataservice.staff_data = this.dataservice?.user_event_data;
    this._router.navigate(['events/add-staff', { event_type: "free_event" }]);
    this.popoverController.dismiss();
  }

  async deleteMessage(params: any, params1: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            // this.commonservice.show("Please Wait");

            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              member_id: params,
              row_id: params1,
              command: "admin_post",
              premium: 0,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
              // this.commonservice.hide();
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.All_events();
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
  }

  async deleteEventPhotos(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this Photo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            // this.commonservice.show("Please Wait");

            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              row_id: params,
              command: "event_photos",
              premium: 0,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
              // this.commonservice.hide();
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.All_events();
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
  }

  async deleteEventReviews(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this Review?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            // this.commonservice.show("Please Wait");

            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              row_id: params,
              command: "event_review",
              premium: 0,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
              // this.commonservice.hide();
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.ionViewDidEnter();
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
  }

  formatIndianDate(dateString: string | undefined): string {
    if (!dateString) {
      return ''; // Handle the case where the date string is undefined
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time
    };

    const indianDate = new Date(dateString).toLocaleString('en-IN', options);
    return indianDate;
  }

  async dismissPopover() {
    const popover = await this.popoverController.getTop();
    if (popover) {
      await popover.dismiss();
    }
  }

}