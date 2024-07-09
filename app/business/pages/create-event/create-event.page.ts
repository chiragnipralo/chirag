import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, LoadingController, ModalController, AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../../services/common.service';
import { ImgcropperComponent } from '../../../components/imgcropper/imgcropper.component';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatePermPage } from '../create-perm/create-perm.page';
import { CreateContactPage } from '../create-contact/create-contact.page';

declare var google: any;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})

export class CreateEventPage implements OnInit {
  selectedFiles: File[] = [];
  activityForm: FormGroup;
  ionicForm!: FormGroup;
  tempActivities: any[] = [];
  tempEmergencyContact: any[] = [];
  foodItems: any[] = [];
  tempoll: any[] = [];
  activities: any[] | undefined;
  isSubmitted = false;
  segment = '1';
  food_others = '';
  showSubmitButton = false;
  extra_food_name: any;
  drinks_name: any;
  contact_name: any;
  contact_role: any;
  contact_number: any;
  food_name: any;
  cuisine_name: any;
  activity_name: any;
  activity_details: any;
  contacts = [];
  paidEventBar: boolean | undefined;
  isToggled: boolean = true;
  isActivityAdded: boolean = false;
  customOptionSelected = false;
  termsAndConditionsList: any;
  file_uploaddata = '';
  isPaidEvent = false;
  price!: number;
  public showMoreBar: boolean = false;
  public is_custom_food_show: boolean = false;
  public is_event_permission_skipped: boolean = false;
  private sanitizer: DomSanitizer;
  public imageUrls: SafeUrl[];
  public mapsUrls: SafeUrl[];
  public menuUrls: SafeUrl[];
  public Blobimage: any = [];
  public LocalFoodItem = [];
  public LocalCusineItem = [];
  currentDate: string;

  customAlertOptions = {
    header: 'Select Category',
    translucent: true,
  };

  AgeOptions = {
    header: 'Select Age',
    translucent: true,
  };

  EventOptions = {
    header: 'Select Event Type',
    translucent: true,
  };

  error_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
    ],
    'category': [
      { type: 'required', message: 'Category is required.' },
    ],
    'event_date': [
      { type: 'required', message: 'Event date is required.' },
    ],
    'selectedAge': [
      { type: 'required', message: 'Age is required.' },
    ],
    'start_time': [
      { type: 'required', message: 'Start time is required.' },
    ],
    'end_time': [
      { type: 'required', message: 'End time is required.' },
    ],
    'location_name': [
      { type: 'required', message: 'Venue location is required.' },
    ] 
  }

  constructor(sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public common: CommonService,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public createv4omdal: ModalController,
    public successmodal: ModalController,
    public contactpagemodal: ModalController,
    public router: Router,
    private _route: ActivatedRoute,
    public alertController: AlertController) {
    this.sanitizer = sanitizer;
    this.segment = "1";
    this.imageUrls = [];
    this.mapsUrls = []
    this.menuUrls = []

    this.activityForm = this.formBuilder.group({
      activity_name: [''],
      activity_details: [''],
    });

    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.currentDate = today.toISOString().split('T')[0];
  }

  @ViewChild('autocomplete') autocomplete: any;

  @ViewChild(IonTextarea)
  textarea!: IonTextarea;
  @ViewChild('moreBar') moreBar: { setFocus: () => void; } | undefined;
  age_group: FormGroup<{ age_group_to: FormControl<string>; age_group_from: FormControl<string>; }> | undefined;

  async populateTextarea() {
    if (this.ionicForm) {
      const selectedItems = this.termsAndConditionsList
        .filter((item: { selected: any; }) => item.selected)
        .map((item: { text: any; }) => item.text);

      const termsAndConditionsControl = this.ionicForm.get('terms_and_conditions');
      if (termsAndConditionsControl) {
        termsAndConditionsControl.setValue(selectedItems.join('\n'));
      }
      await this.modalController.dismiss();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  toggleSelection(item: { selected: boolean; }) {
    item.selected = !item.selected;
  }

  onCategoryChange(event: any) {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      category_id: event.detail.value,
    };

    this.chatconnect.postData(apidata, "get_terms_by_categoryId").then((result: any) => {
      if (result.Response.status === 1) {
        if (result.Response.terms && result.Response.terms.length > 0) {
          this.termsAndConditionsList = result.Response.terms[0].terms.map((term: { text: any; }) => ({
            text: term.text,
            selected: false,
          }));
        } else {
          this.termsAndConditionsList = [
            { text: 'Tickets once booked cannot be exchanged or refunded.', selected: false },
            { text: 'An Internet handling fee per ticket may be levied.', selected: false },
            { text: 'Please check the total amount before payment.', selected: false },
            { text: 'We recommend that you arrive at-least 30 minutes prior at the venue for a seamless entry.', selected: false },
            { text: 'It is mandatory to always wear masks and follow social distancing norms', selected: false },
            { text: 'The organizer`s decision will be final and binding', selected: false },
            { text: 'Adventure Geek reserves all the right to change/deviate/cancel the plans without prior notice', selected: false },
            { text: 'Please do not carry or wear any valuables, ornaments, jewelry, etc. If carried, then we Do Not take any liability for the same.', selected: false }
          ];
        }
      } else {
        this.common.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  GetCords() {
    const inputElement = document.querySelector("#autocomplete input");
    const autocomplete = new google.maps.places.Autocomplete(inputElement);
    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
        const latitude = selectedPlace.geometry.location.lat();
        const longitude = selectedPlace.geometry.location.lng();
        const locationn = selectedPlace.formatted_address;
        this.dataservice.locationn = locationn;
        const locationNameControl = this.ionicForm.get('location_name');
        if (locationNameControl) {
          locationNameControl.setValue(locationn);
        }
        this.dataservice.events_form.push({ maps_coordinates: [{ "latitude": latitude, "longitude": longitude }] });
      }
    });
  }

  async ngOnInit() {
    this.dataservice.community_event_or_not = this._route.snapshot.params['event_for'];
    this.dataservice.events_form = [];
    this.dataservice.foodImages = [];
    this.dataservice.locationn = null;
    this.dataservice.emergency_contact = []
    this.dataservice.event_cusine_type = null
    this.dataservice.foodImages = []
    
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      category: ['', [Validators.required]],
      location_name: ['', [Validators.required]],
      isPaidEvent: [false],
      price: [null],
      food_name: [''],
      cuisine_name: [''],
      selectedAge: ['', [Validators.required]],
      terms_and_conditions: [''],
      event_activities: this.formBuilder.array([]),
      emergency_contact: this.formBuilder.array([]),
      poll_section: this.formBuilder.array([]),
      food_section: this.formBuilder.array([]),
      drink_section: this.formBuilder.array([]),
      event_dates: this.formBuilder.array([]),
      age_group: this.formBuilder.group({
        age_group_from: [''],
        age_group_to: ['']
      })
    })

    const piece = this.formBuilder.group({
      event_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
    });

    const activity = this.formBuilder.group({
      activity_name: [''],
      activity_details: [''],
    });

    const econtact = this.formBuilder.group({
      contact_name: [''],
      contact_role: [''],
      contact_number: [''],
    });

    const mulfood = this.formBuilder.group({
      extra_food_name: [''],
    });

    const drinks = this.formBuilder.group({
      drinks_name: [''],
    });

    const poll = this.formBuilder.group({
      poll_question: [''],
      poll_option1: [''],
      poll_option2: [''],
      poll_option3: [''],
      poll_option4: [''],
    });

    this.getPiecesArray.push(piece);
    this.getActivityArray.push(activity);
    this.getfoodArray.push(mulfood);
    this.getdrinkArray.push(drinks);
    this.getEcontactArray.push(econtact);
    this.getPollArray.push(poll);

    await this.GetDashboard()
  }

  GetDashboard() {
    return new Promise<any>((resolve, reject) => {
      let apidata = {
        user_token: this.dataservice.getUserData()
      }
      this.chatconnect.postData(apidata, "user_dashboard").then((result: any) => {
        if (result.Response.status == 1) {
          this.dataservice.events_categories = result.Response.all_categories;
          this.dataservice.events_languages = result.Response.languages;
          this.dataservice.events_fooditems = result.Response.fooditems;
          this.dataservice.cusines_items = result.Response.cusinesitems;
          this.LocalFoodItem = result.Response.fooditems;
          this.LocalCusineItem = result.Response.cusinesitems;
          resolve(true);
        } else {
          this.common.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        // this.common.hide();
        console.log("Connection failed Messge");
        reject(err);
      });
    });
  }

  addPiece() {
    const piece = this.formBuilder.group({
      event_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
    });

    this.getPiecesArray.push(piece);
  }

  deletePiece(i: number) {
    this.getPiecesArray.removeAt(i);
  }

  addActivity() {
    const activity = this.formBuilder.group({
      activity_name: ['', [Validators.required]],
      activity_details: ['', [Validators.required]],
    });
    this.getActivityArray.push(activity);
  }

  deleteActivity(i: number) {
    this.getActivityArray.removeAt(i);
  }

  async Addacti() {
    const updatedActivities = [];
    for (let i = 0; i < this.getActivityArray.length; i++) {
      const activityGroup = this.getActivityArray.at(i) as FormGroup;
      if (activityGroup) {
        const activity_name = activityGroup.get('activity_name')?.value;
        const activity_details = activityGroup.get('activity_details')?.value;

        if (activity_name) {
          const existingActivityIndex = this.tempActivities.findIndex(activity => activity.activity_name === activity_name);

          if (existingActivityIndex !== -1) {
            this.tempActivities[existingActivityIndex].activity_details = activity_details || '';
            updatedActivities.push(this.tempActivities[existingActivityIndex]);
          } else {
            const activity = {
              activity_name,
              activity_details: activity_details || ''
            };
            this.tempActivities.push(activity);
            updatedActivities.push(activity);
          }
        }
      }
    }

    for (let i = this.tempActivities.length - 1; i >= 0; i--) {
      const activityName = this.tempActivities[i].activity_name;
      const exists = this.getActivityArray.controls.some(control => control.get('activity_name')?.value === activityName);
      if (!exists) {
        this.tempActivities.splice(i, 1);
      }
    }

    await this.modalController.dismiss(updatedActivities);
  }

  addContact() {
    const econtact = this.formBuilder.group({
      contact_name: ['', [Validators.required]],
      contact_role: ['', [Validators.required]],
      contact_number: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    });
    this.getEcontactArray.push(econtact);
  }

  deleteContact(i: number) {
    this.getEcontactArray.removeAt(i);
  }

  async addEmergencyContact() {
    const updatedEmergencyContacts = [];

    for (let i = 0; i < this.getEcontactArray.length; i++) {
      const contactGroup = this.getEcontactArray.at(i) as FormGroup;

      if (contactGroup) {
        const contact_name = contactGroup.get('contact_name')?.value;
        const contact_role = contactGroup.get('contact_role')?.value;
        const contact_number = contactGroup.get('contact_number')?.value;

        if (contact_name && contact_number) {
          const existingContactIndex = this.tempEmergencyContact.findIndex(econtact => econtact.contact_name === contact_name);

          if (existingContactIndex !== -1) {
            this.tempEmergencyContact[existingContactIndex].contact_role = contact_role || '';
            this.tempEmergencyContact[existingContactIndex].contact_number = contact_number || '';
            updatedEmergencyContacts.push(this.tempEmergencyContact[existingContactIndex]);
          } else {
            const econtact = {
              contact_name,
              contact_role: contact_role || '',
              contact_number: contact_number || ''
            };
            this.tempEmergencyContact.push(econtact);
            updatedEmergencyContacts.push(econtact);
          }
        }
      }
    }

    for (let i = this.tempEmergencyContact.length - 1; i >= 0; i--) {
      const contactName = this.tempEmergencyContact[i].contact_name;
      const exists = this.getEcontactArray.controls.some(control => control.get('contact_name')?.value === contactName);
      if (!exists) {
        this.tempEmergencyContact.splice(i, 1);
      }
    }

    await this.modalController.dismiss(updatedEmergencyContacts);
  }

  addPoll() {
    const poll = this.formBuilder.group({
      poll_question: ['', [Validators.required]],
      poll_option1: ['', [Validators.required]],
      poll_option2: ['', [Validators.required]],
      poll_option3: [''],
      poll_option4: [''],

    });
    this.getPollArray.push(poll);
  }

  async addPollSection() {
    const updatedPolls = [];

    for (let i = 0; i < this.getPollArray.length; i++) {
      const pollGroup = this.getPollArray.at(i) as FormGroup;
      const poll_question = pollGroup.get('poll_question')?.value;
      const poll_option1 = pollGroup.get('poll_option1')?.value;
      const poll_option2 = pollGroup.get('poll_option2')?.value;
      const poll_option3 = pollGroup.get('poll_option3')?.value;
      const poll_option4 = pollGroup.get('poll_option4')?.value;

      if (poll_question && poll_option1) {
        const existingPollIndex = this.tempoll.findIndex(poll => poll.poll_question === poll_question);

        if (existingPollIndex !== -1) {
          this.tempoll[existingPollIndex].poll_option1 = poll_option1 || '';
          this.tempoll[existingPollIndex].poll_option2 = poll_option2 || '';
          this.tempoll[existingPollIndex].poll_option3 = poll_option3 || '';
          this.tempoll[existingPollIndex].poll_option4 = poll_option4 || '';
          updatedPolls.push(this.tempoll[existingPollIndex]);
        } else {
          const poll = {
            poll_question,
            poll_option1: poll_option1 || '',
            poll_option2: poll_option2 || '',
            poll_option3: poll_option3 || '',
            poll_option4: poll_option4 || ''
          };
          this.tempoll.push(poll);
          updatedPolls.push(poll);
        }
      }
    }

    for (let i = this.tempoll.length - 1; i >= 0; i--) {
      const pollQuestion = this.tempoll[i].poll_question;
      const exists = this.getPollArray.controls.some(control => control.get('poll_question')?.value === pollQuestion);
      if (!exists) {
        this.tempoll.splice(i, 1);
      }
    }
    await this.modalController.dismiss(updatedPolls);
  }

  deletePoll(i: number) {
    this.getPollArray.removeAt(i);
  }

  addfood() {
    const mulfood = this.formBuilder.group({
      extra_food_name: ['', [Validators.required]],
    });
    this.getfoodArray.push(mulfood);
  }

  removefood(i: number) {
    this.getfoodArray.removeAt(i);
  }

  addDrink() {
    const drinks = this.formBuilder.group({
      drinks_name: [''],
    });
    this.getdrinkArray.push(drinks);
  }

  removeDrink(i: number) {
    this.getdrinkArray.removeAt(i);
  }

  async saveFoodItems() {
    const foodItemId = this.ionicForm.value.food_name;
    this.foodItems.push(foodItemId);
    this.modalController.dismiss(this.foodItems);
  }

  get getPiecesArray() {
    return (<FormArray>this.ionicForm.get('event_dates'));
  }
  get getActivityArray() {
    return (<FormArray>this.ionicForm.get('event_activities'));
  }
  get getEcontactArray() {
    return (<FormArray>this.ionicForm.get('emergency_contact'));
  }
  get getfoodArray() {
    return (<FormArray>this.ionicForm.get('food_section'));
  }
  get getdrinkArray() {
    return (<FormArray>this.ionicForm.get('drink_section'));
  }
  get getPollArray() {
    return (<FormArray>this.ionicForm.get('poll_section'));
  }

  loadImagesFromDeviceMulti(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.menuUrls.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
        this.selectedFiles.push(files[i]);
      }
      this.dataservice.foodImages = this.selectedFiles;
    }
  }

  removeImage(index: number) {
    this.menuUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.dataservice.foodImages = this.selectedFiles;
  }

  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid || this.imageUrls.length == 0) {
      let alert = await this.alertController.create({
        header: 'Please Enter',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      let termsAndConditionsValue;
      // Format the terms_and_conditions field with <ul> and <li> tags
      const termsAndConditionsControl = this.ionicForm.get('terms_and_conditions');
      if (termsAndConditionsControl) {
        termsAndConditionsValue = this.ionicForm.value.terms_and_conditions
          .split('\n')
          .map((line: string) => `<li>${line}</li>`)
          .join('\n');
        // Check if termsAndConditionsControl.value is not null before setting it
        if (termsAndConditionsControl.value !== null) {
          // Set the formatted value back to the form control
          if (termsAndConditionsValue != '<li></li>') {
            termsAndConditionsControl.setValue(`<ul>${termsAndConditionsValue}</ul>`);
          }
          this.dataservice.event_food_type = this.LocalFoodItem.filter((item: any) => { return this.ionicForm.value.food_name.indexOf(item.id) !== -1 });
          this.dataservice.events_form.push(this.ionicForm.value);
          this.ContactPageModal();
        } else {
          console.error("terms_and_conditions form control value is null.");
        }
      } else {
        console.error("terms_and_conditions form control not found.");
      }
    }
  }

  async view(img: any, showflag: string) {
    const modal = await this.modalController.create({
      component: ImgcropperComponent,
      cssClass: 'my-menubar',
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
        if (data.data.cropped_image) {
          this.dataservice.convertBase64ToBlob(data.data.cropped_image)
          if (showflag == "eventmap") {
            this.mapsUrls = []
            this.mapsUrls.unshift(data.data.cropped_image);
            localStorage.setItem("event_map_image", data.data.cropped_image);
          } else if (showflag == "event") {
            this.imageUrls = []
            this.imageUrls.unshift(data.data.cropped_image);
            localStorage.setItem("event_images", data.data.cropped_image);
          } else {
            this.menuUrls = []
            this.menuUrls.unshift(data.data.cropped_image);
            localStorage.setItem("menu_imgData", data.data.cropped_image);
          }
        }
      } else {
        if (showflag == "event") {
          this.imageUrls = [];
        } else {
          this.menuUrls = [];
        }
      }
    });
    return await modal.present();
  }

  moveFocus(event: any) {
    this.dataservice.events_fooditems.forEach((item: { id: number; name: any; }) => {
      if (item.id === 0) {
        item.name = event.target.value
      }
    });
  }

  ChangeFood(event: { detail: { value: any[]; }; }) {
    // this.LocalFoodItem.filter((item)=> { return this.ionicForm.value.food_name.indexOf(item.id) === 1 });
    event.detail.value.forEach((item: number) => {
      if (item == 0) {
        this.is_custom_food_show = true;
      }
    });
  }

  loadImageFromDevice(event: { target: { files: any[]; }; }, showflag: string) {
    const photo = event.target.files[0];
    this.file_uploaddata = photo;
    let formData = new FormData();
    // Add the file that was just added to the form data
    formData.append("photo", photo, photo.name);
    this.Blobimage.push(photo);
    this.dataservice.blobToBase64(photo).then((res: any) => {
      this.dataservice.event_base64img = res
      this.view(res, showflag)
    });
    // const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
      if (showflag == "eventmap") {
        this.mapsUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      } else if (showflag == "event") {
        this.imageUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      } else {
        this.menuUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl(blobURL)
        );
      }
    };
    reader.onerror = (error) => { };
  };

  goToNextSegment() {
    const segments = ['1', '2', '3', '4'];
    const currentIndex = segments.indexOf(this.segment);
    if (currentIndex < segments.length - 1) {
      this.segment = segments[currentIndex + 1];
    } else if (currentIndex === segments.length - 1) {
      this.segment = segments[currentIndex];
    }
  }

  updatePage(homeSegment: any) {
  }

  goToPreviousSegment() {
    const segments = ['1', '2', '3', '4'];
    const currentIndex = segments.indexOf(this.segment);
    if (currentIndex > 0) {
      this.segment = segments[currentIndex - 1];
    }
  }

  values: any[] = [];

  removevalue(i: number) {
    this.values.splice(i, 1);
  }

  async SkipNow() {
    const modal = await this.createv4omdal.create({
      component: CreatePermPage,
      cssClass: 'pindialog-container',
      handle: true,
      componentProps: {
        pass_code: true
      },
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
        this.is_event_permission_skipped = true;
        this.dataservice.event_food_type = this.LocalFoodItem.filter((item: any) => { return this.ionicForm.value.food_name.indexOf(item.id) !== -1 });
        this.dataservice.events_form.push(this.ionicForm.value);
        this.ContactPageModal();
      }
    });
    return await modal.present();
  }

  addvalue() {
    this.values.push({ value: "" });
  }

  async ContactPageModal() {
    this.common.hide();
    const modal = await this.contactpagemodal.create({
      component: CreateContactPage,
      cssClass: 'pindialog-container',
      handle: true,
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined) {
      }
    });
    return await modal.present();
  }

  async ionViewWillLeave() {
    if (!this.isSubmitted) {
      const isSegOneValid = this.ionicForm.controls['title'].valid &&
        this.ionicForm.controls['description'].valid &&
        this.ionicForm.controls['category'].valid &&
        this.ionicForm.controls['age_group'].valid

      if (isSegOneValid) {
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: 'Save This into Draft?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'primary',
            },
            {
              text: 'Yes',
              handler: () => {
                this.common.show("Please Wait");
                const userToken = this.dataservice.getUserData();
                const userResponse = this.dataservice.GetAccountuser(); // Replace with the actual method to get the user response
                this.dataservice.events_form.push(this.ionicForm.value);
                var formData = new FormData();
                if (userToken !== null) {
                  formData.append('user_token', userToken);
                }
                formData.append('eventFlag', this.dataservice.eventFlag);
                formData.append('communityId', userResponse);
                formData.append('location', this.dataservice.locationn);
                formData.append('emergency_contact', this.dataservice.emergency_contact);
                formData.append('event_cusine_type', JSON.stringify(this.dataservice.event_cusine_type));
                formData.append('event_food_type', JSON.stringify(this.dataservice.event_food_type));
                formData.append('original_event_images', this.dataservice.orginalImage);
                formData.append('event_type', 'paid_event');

                const eventImages = localStorage.getItem('event_images');
                if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
                  formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
                }

                this.dataservice.foodImages.forEach((file: File) => {
                  formData.append('menu_imgData[]', file);
                });

                formData.append('events_data', JSON.stringify(this.dataservice.events_form));
                this.chatconnect.postFormData(formData, "draft_event").then((result: any) => {
                  this.common.hide();
                  if (result.Response.status == 1) {
                    localStorage.removeItem('event_images');
                    localStorage.removeItem('menu_imgData');
                    this.common.presentToast("", "Event Added In Draft...");
                  } else {
                    this.common.presentToast("Oops", result.Response.message)
                  }
                }, (err) => {
                  this.common.hide();
                  console.log("Connection failed Messge");
                });
              }
            }
          ],
        });
        await alert.present();
      }
    }
  }
}