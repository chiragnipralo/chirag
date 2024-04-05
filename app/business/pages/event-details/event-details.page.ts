import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, PopoverController, IonSlides, LoadingController, NavController } from '@ionic/angular';
import { MapActivityPage } from 'src/app/events/map-activity/map-activity.page';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Share } from '@capacitor/share';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe, Location } from '@angular/common';
import { ViewstatsPage } from 'src/app/pages/viewstats/viewstats.page';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Checkout } from 'capacitor-razorpay';

declare var google: any;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})

export class EventDetailsPage implements OnInit {

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
  selectedFileName: string = '';
  cData: any;
  jData: any = [];
  map: any;
  message: string = '';
  messages: any[] = [];
  selectedFood: any[] = [];
  selectedPoll: any[] = [];
  MultiMenuImgs: any = [];
  user_info: any;
  participent_name: any;
  participent_number: any;
  participent_gender: any;
  public isButtonEnabled = false;
  eventDate: Date;
  isValid!: boolean;
  isModalOpen = false;
  user_data: any;

  //razor_key: string = 'rzp_test_Gfm35q8J327oH6';
  razor_key: string = 'rzp_live_G3jYxHdfoo5gQR';
  currency: string = 'INR';

  fullAmount!: number;

  @ViewChild('slider', { static: true })
  private slider!: IonSlides;
  segment = 0;

  @ViewChild('map', { static: false })
  mapElement!: ElementRef;

  constructor(private alertController: AlertController,
    private datePipe: DatePipe,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    public commonservice: CommonService,
    public dataservice: DataService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private _route: ActivatedRoute,
    public mapmodal: ModalController,
    public chatconnect: HttpService,
    private _router: Router,
    private navCtrl: NavController,
    private router: Router,
    private location: Location) {

    this.eventDate = new Date(this.dataservice?.user_event_data.event_dates[0]['event_date']);

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

  goBack() {
    this.navCtrl.pop();
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  slideChanged() {
    this.slider.getActiveIndex().then(index => {
      this.segment = index;
    });
  }

  increment() {
    if (this.count < 7) {
      this.count++;
      this.addParticipant();
      this.updateAmount();
    }
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      this.removeParticipant(this.count);
      this.updateAmount();
    }
  }

  updateAmount() {
    this.fullAmount = this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    return this.count * (this.dataservice?.user_event_data?.price || 0);
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add Other Participants',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.router.navigate(['/addotherform']);
        },
      },
      {
        text: 'No',
        handler: () => {
          this.router.navigate(['/payment']);
        },
      },
      ],
    });
    await alert.present();
  }

  Viewguest() {
    this.dataservice.events_guests = this.dataservice?.user_event_data;
    this._router.navigate(['paid-guest-list']);
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
    const business = "business";
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

  isEventDateValid(): boolean {
    const currentDate = new Date();
    const isValid = this.eventDate > currentDate;
    return isValid;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      user_details: this.formBuilder.array([]),
    })
    this.All_events();
    this.addParticipant();
    this.updateAmount();
  }

  addParticipant() {
    const user_infomration = this.formBuilder.group({
      user_info: [''],
      participent_name: ['', [Validators.required]],
      participent_number: ['', [Validators.required]],
      participent_gender: [''],
      food: [''],
    });

    this.getParticipantsArray.push(user_infomration);
    console.log(this.getParticipantsArray.controls)
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

  All_events() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id
    }
    this.chatconnect.postData(apidata, "view_paid_events_by_id").then((result: any) => {
      if (result.Response.status == 1) {
        this.dataservice.setEventData(result.Response.events_data);
        this.MultiMenuImgs = result.Response.events_data.menu_img_filename;
        this.listReview();
        this.loadMap();
        this.checkConditionforlive();

        this.eventDate = new Date(this.dataservice?.user_event_data.event_dates[0]['event_date']);
        this.isEventDateValid();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
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
        fullscreenControl: true
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

  async payForEvents() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (this.count == 0) {
      this.commonservice.presentToast("Error", "Please Check Count..");
    } else if (!this.validateForm()) {
      this.commonservice.presentToast("Error", "Please Fill filled");
    } else {
      if (this.dataservice?.user_event_data?.price != "Free Event") {
        var UserCheckout = {
          "contact_person": this.user_data['user_name'],
          "contact_number": this.user_data['mobile'],
          "user_token": this.dataservice.getUserData(),
          "order_id": 'order_NPBgAMWFoCfaRv',
          "rp_payment_id": "",
          "retry_payment": 0,
          "method": 'Online',
          "amount": this.fullAmount,
          "products": this.dataservice.user_event_data.id,
          "type": 'paid_event',
          "reason": 'event_tickets',
          "duration": "",
          "start_date": "",
          "end_date": "",
        }

        const options = {
          currency: this.currency,
          key: this.razor_key,
          amount: (this.fullAmount * 100).toString(),
          name: 'SoEasy',
          description: 'Genesis',
          image: 'https://soeasyapp.com/dashboard/img/soeasy.png',
          prefill: {
            email: this.user_data['email'],
            contact: this.user_data['mobile'],
          },
          theme: {
            color: '#3399cc'
          }
        }

        try {
          Checkout.open(options).then((response: any) => {
            UserCheckout['rp_payment_id'] = response.response['razorpay_payment_id'];
            this.chatconnect.postData(UserCheckout, "checkout").then((result: any) => {
              if (result.Response.status == 1) {
                this.join_events();
              } else {
                this.commonservice.presentToast("Oops", result.Response.message)
              }
            }, (err) => {
              console.log("Connection failed Messge");
            });
          });
        } catch (error: any) {
          if (typeof error === 'string') {
            let errorObj = JSON.parse(error);
            this.commonservice.show(errorObj.description)
          } else {
            console.error('Unhandled error:', error);
          }
        }
      } else {
        this.join_events();
      }
    }
  }

  async join_events() {
    const userToken = this.dataservice.getUserData()
    this.commonservice.show("Please Wait");
    var formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('event_id', this.dataservice.user_event_data.id);
    formData.append('people_coming', this.count.toString());
    formData.append('poll', JSON.stringify(this.selectedPoll));
    formData.append('users_info', JSON.stringify(this.ionicForm.value));

    this.chatconnect.postFormData(formData, "join_paid_events").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        this.modalController.dismiss();
        //this.location.back();
        this.dataservice.events_guests = this.dataservice?.user_event_data;
        this._router.navigate(['paid-guest-list']);
        this.commonservice.presentToast("", "Joined Successfully")
      } else {
        this.commonservice.presentToast("Oops", result.Response.message)
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  edit_details() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null

    if (popover) {
      this.dataservice.user_event_data = this.dataservice.user_event_data;
      this._router.navigate(['/edit-paid-event'])
      popover.dismiss();
    } else {
      console.error('Popover element not found.');
    }
  }

  invite() {
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement | null;
    if (popover) {
      this.dataservice.user_event_data = this.dataservice.user_event_data;
      this._router.navigate(['pages/reinvite', { type: "paid_event" }]);
      popover.dismiss();
    } else {
      console.error('Popover element not found.');
    }
  }

  complete_event() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id,
      event_type: "paid_event",
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
      type: "live",
      event_type: "paid_event"
    }
    this.chatconnect.postData(apidata, "live_or_stop_event").then((result: any) => {
      if (result.Response.status == 1) {
        this.popoverController.dismiss();
        this.commonservice.presentToast("", result.Response.message);
        this.ngOnInit();
        //this.location.back();
        //this._router.navigate(['/tabs/dashboard']);
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
      type: "stop",
      event_type: "paid_event"
    }
    this.chatconnect.postData(apidata, "live_or_stop_event").then((result: any) => {
      if (result.Response.status == 1) {
        this.popoverController.dismiss();
        this.commonservice.presentToast("", result.Response.message);
        this.ngOnInit();
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
              event_type: "paid_event"
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

  add_staff() {
    this.dataservice.staff_data = this.dataservice?.user_event_data;
    this._router.navigate(['events/add-staff', { event_type: "paid_event" }]);
    this.popoverController.dismiss();
  }

  listReview() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice?.user_event_data.id,
      type: 'business'
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
      this.jData.push({ "request": "admin", "user_name": "You", "review": this.senderMsg });
      let apidata = {
        user_token: this.dataservice.getUserData(),
        event_id: this.dataservice?.user_event_data.id,
        review: this.senderMsg,
        event_type: 1,
      };
      this.chatconnect.postData(apidata, "paid_event_feedback").then((result: any) => {
      }, (err) => {
      });
      this.senderMsg = '';
    }
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

  sendImage() {
    // Create a new FormData object
    const userToken = this.dataservice.getUserData()
    let formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('event_id', this.dataservice?.user_event_data.id);
    if (this.selectedFile) {
      formData.append('event_images', this.selectedFile, this.selectedFile.name);
    }
    formData.append('event_type', '1');

    this.chatconnect.postFormData(formData, "paid_event_photos").then((result: any) => {
      this.commonservice.presentToast("", result.Response.message)
      this.selectedFile = null;
      this.fileName = '';
      this.All_events();
    }, (err) => {
      console.error(err);
      this.selectedFile = null;
      this.fileName = '';
    });
  }

  sortedMessages(messages: any[]): any[] {
    const sortedArray = [...messages];
    sortedArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedArray;
  }

  adminPost() {
    const userToken = this.dataservice.getUserData()
    if (!this.message && !this.selectedAdminFile) {
      return;
    }
    const formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('event_id', this.dataservice?.user_event_data.id);
    if (this.selectedAdminFile) {
      const isImage = this.selectedAdminFile.type.startsWith('image/');

      if (isImage) {
        formData.append('event_images', this.selectedAdminFile, this.selectedAdminFile.name);
      }
    }

    if (this.message) {
      formData.append('message', this.message);
    }
    formData.append('event_flag', '1');
    formData.append('type', 'business');
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
        this.selectedAdminFile = null;
        this.fileAdminName = '';
      }
    );
    this.message = '';
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
              is_premium: 0,
              command_for: "event",
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
            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              member_id: params,
              row_id: params1,
              command: "admin_post",
              premium: 1,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
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
            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              row_id: params,
              command: "event_photos",
              premium: 1,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
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
            let apidata = {
              user_token: this.dataservice.getUserData(),
              event_id: this.dataservice.user_event_data.id,
              row_id: params,
              command: "event_review",
              premium: 1,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
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
  ionViewDidEnter() {
    console.log("Enter in Page..")
    this.listReview();
    this.All_events();
  }
}