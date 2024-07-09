import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, LoadingController, ModalController, AlertController, IonTextarea } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../services/common.service';
import { ImgcropperComponent } from '../../components/imgcropper/imgcropper.component';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';

declare var google: any;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})

export class EditEventPage implements OnInit {

  tempActivities: any[] = [];
  tempEmergencyContact: any[] = [];
  foodItems: any[] = [];
  tempoll: any[] = [];
  ionicForm: FormGroup;
  isSubmitted = false;
  eventDates: FormArray | undefined;
  file_uploaddata = ''
  prevImage: any;
  selectedFiles: File[] = [];
  PremenuImg: any = [];

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
  public localAgeGroup = [];
  currentDate: string;

  @ViewChild('moreBar') moreBar: { setFocus: () => void; } | undefined;
  age_group: FormGroup<{ age_group_to: FormControl<string>; age_group_from: FormControl<string>; }> | undefined;

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
    'selectedAge': [
      { type: 'required', message: 'Age is required.' },
    ],
    'event_date': [
      { type: 'required', message: 'Event date is required.' },
    ],
    'start_time': [
      { type: 'required', message: 'Start time is required.' },
    ],
    'end_time': [
      { type: 'required', message: 'End time is required.' },
    ],
    'location_name': [
      { type: 'required', message: 'Venue location is required.' },
    ],
    'event_typecate': [
      { type: 'required', message: 'Event type is required.' },
    ],
  }

  constructor(sanitizer: DomSanitizer,
    public commonservice: CommonService,
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
    private location: Location,
    public alertController: AlertController) {
    this.sanitizer = sanitizer;
    this.segment = "1";
    this.imageUrls = [];
    this.mapsUrls = [];
    this.menuUrls = [];
    this.ionicForm = this.formBuilder.group({
      food_name: [[]],
    });

    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.currentDate = today.toISOString().split('T')[0];

  }

  @ViewChild(IonTextarea)
  textarea!: IonTextarea;

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
    this.commonservice.show();
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      selectedAge: [''],
      category: ['', [Validators.required]],
      event_typecate: ['', [Validators.required]],
      location_name: ['', [Validators.required]],
      food_name: [''],
      cuisine_name: [''],
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
    this.All_events();
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
          this.dataservice.age_groups = result.Response.age_group;
          this.localAgeGroup = result.Response.age_group;
          this.LocalFoodItem = result.Response.fooditems;
          this.LocalCusineItem = result.Response.cusinesitems;
          resolve(true);
        } else {
          this.common.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
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
      contact_name: [''],
      contact_role: [''],
      contact_number: [''],
    });
    this.getEcontactArray.push(econtact);
  }

  deleteContact(i: number) {
    this.getEcontactArray.removeAt(i);
    this.tempEmergencyContact.splice(i, 1);
  }

  async addEmegenctyContact() {
    const updatedEmergencyContacts = [];
  
    for (let i = 0; i < this.getEcontactArray.length; i++) {
      const contactGroup = this.getEcontactArray.at(i) as FormGroup;
  
      const contact_name = contactGroup.get('contact_name')?.value;
      const contact_role = contactGroup.get('contact_role')?.value || '';
      const contact_number = contactGroup.get('contact_number')?.value;
  
      if (contact_name && contact_number) {
        const existingContactIndex = this.tempEmergencyContact.findIndex(econtact => econtact.contact_name === contact_name);
  
        if (existingContactIndex !== -1) {
          // Update existing contact
          this.tempEmergencyContact[existingContactIndex] = {
            contact_name,
            contact_role,
            contact_number
          };
        } else {
          // Add new contact
          this.tempEmergencyContact.push({
            contact_name,
            contact_role,
            contact_number
          });
        }
      }
    }
  
    // Sync form array with updated tempEmergencyContact
    this.syncFormArray(this.getEcontactArray, this.tempEmergencyContact);
  
    await this.modalController.dismiss(updatedEmergencyContacts);
  }
  
  syncFormArray(formArray: FormArray, items: any[]) {
    formArray.clear();
    items.forEach(item => {
      const group = this.formBuilder.group(item);
      formArray.push(group);
    });
  }
  
  addPoll() {
    const poll = this.formBuilder.group({
      poll_question: [''],
      poll_option1: [''],
      poll_option2: [''],
      poll_option3: [''],
      poll_option4: [''],
    });
    this.getPollArray.push(poll);
  }

  deletePoll(i: number) {
    this.getPollArray.removeAt(i);
    this.tempoll.splice(i, 1);
  }
  

  async addPollSection() {
    const updatedPollSections = [];
  
    for (let i = 0; i < this.getPollArray.length; i++) {
      const pollGroup = this.getPollArray.at(i) as FormGroup;
  
      const poll_question = pollGroup.get('poll_question')?.value;
      const poll_option1 = pollGroup.get('poll_option1')?.value;
      const poll_option2 = pollGroup.get('poll_option2')?.value || '';
      const poll_option3 = pollGroup.get('poll_option3')?.value || '';
      const poll_option4 = pollGroup.get('poll_option4')?.value || '';
  
      if (poll_question && poll_option1) {
        const existingPollIndex = this.tempoll.findIndex(poll => poll.poll_question === poll_question);
  
        if (existingPollIndex !== -1) {
          // Update existing poll
          this.tempoll[existingPollIndex] = {
            poll_question,
            poll_option1,
            poll_option2,
            poll_option3,
            poll_option4
          };
        } else {
          // Add new poll
          this.tempoll.push({
            poll_question,
            poll_option1,
            poll_option2,
            poll_option3,
            poll_option4
          });
        }
      }
    }
  
    // Sync form array with updated tempoll
    this.syncFormArray(this.getPollArray, this.tempoll);
  
    await this.modalController.dismiss(updatedPollSections);
  }
  
  

  addfood() {
    const mulfood = this.formBuilder.group({
      extra_food_name: [''],
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
    }
  }

  removeImage(index: number) {
    this.menuUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }


  async submit() {
    this.isSubmitted = true;
    this.ionicForm.markAllAsTouched();
    if (!this.ionicForm.valid) {
      let alert = await this.alertController.create({
        header: 'Error',
        subHeader: '* Please fill the required fields',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {

      let termsAndConditionsValue;
      const termsAndConditionsControl = this.ionicForm.get('terms_and_conditions');
      if (termsAndConditionsControl) {
        termsAndConditionsValue = this.ionicForm.value.terms_and_conditions
          .split('\n')
          .map((line: string) => `<li>${line}</li>`)
          .join('\n');
        if (termsAndConditionsControl.value !== null) {
          if (termsAndConditionsValue != '<li></li>') {
            termsAndConditionsControl.setValue(`<ul>${termsAndConditionsValue}</ul>`);
          }
          //termsAndConditionsControl.setValue(`<ul>${termsAndConditionsValue}</ul>`);
        } else {
          console.error("terms_and_conditions form control value is null.");
        }
      } else {
        console.error("terms_and_conditions form control not found.");
      }

      const userToken = this.dataservice.getUserData();
      this.dataservice.event_cusine_type = this.LocalCusineItem.filter((item: any) => { return this.ionicForm.value.cuisine_name.indexOf(item.id) !== -1 });
      this.dataservice.event_food_type = this.LocalFoodItem.filter((item: any) => { return this.ionicForm.value.food_name.indexOf(item.id) !== -1 });

      this.dataservice.events_form.push(this.ionicForm.value);
      this.common.show("Please Wait");
      var formData = new FormData();
      formData.append('event_id', this.dataservice.user_event_data.id);
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('location', this.dataservice.locationn);
      formData.append('event_cusine_type', JSON.stringify(this.dataservice.event_cusine_type));
      formData.append('event_food_type', JSON.stringify(this.dataservice.event_food_type));
      formData.append('prev_original_event_images', this.dataservice.prev_orginalImage);
      formData.append('original_event_images', this.dataservice.orginalImage);
      formData.append('previous_img', this.dataservice.previous_img);
      formData.append('draft_event_or_not', this._route.snapshot.params['event_draft']);

      const eventImages = localStorage.getItem('event_images');
      if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
        formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
      }

      this.selectedFiles.forEach((file: File) => {
        formData.append('menu_imgData[]', file);
      });

      formData.append('events_data', JSON.stringify(this.dataservice.events_form));
      this.chatconnect.postFormData(formData, "edit_event").then((result: any) => {
        this.common.hide();
        if (result.Response.status == 1) {
          this.common.presentToast("", result.Response.message)
          localStorage.removeItem('event_images');
          this.location.back();
        } else {
          this.common.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        this.common.hide();
        console.log("Connection failed Messge");
      });
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
          if (showflag == "event") {
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
          if (this.prevImage !== null) {
            this.imageUrls = [];
            this.imageUrls.push(this.prevImage)
          } else {
            this.imageUrls = [];
          }
        }
      }
    });
    return await modal.present();
  }

  moveFocus(event: { target: { value: any; }; }) {
    this.dataservice.events_fooditems.forEach((item: { id: number; name: any; }) => {
      if (item.id === 0) {
        item.name = event.target.value
      }
    });
  }

  ChangeFood(event: { detail: { value: any[]; }; }) {
    event.detail.value.forEach(item => {
      if (item == 0) {
        this.is_custom_food_show = true;
      }
    });
  }

  loadImageFromDevice(event: { target: { files: any[]; }; }, showflag: string) {
    const photo = event.target.files[0];
    this.dataservice.orginalImage = photo;
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
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
      if (showflag == "event") {
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

  addvalue() {
    this.values.push({ value: "" });
  }

  onAgeChange() {
    const selectedAgeControl = this.ionicForm.get('selectedAge');
    const ageGroupForm = this.ionicForm.get('age_group');

    if (selectedAgeControl && ageGroupForm) {
      if (selectedAgeControl.value === '0') {
        const ageGroupFromControl = ageGroupForm.get('age_group_from');
        const ageGroupToControl = ageGroupForm.get('age_group_to');

        if (ageGroupFromControl && ageGroupToControl) {
          ageGroupFromControl.setValue(null);
          ageGroupToControl.setValue(null);
        }
      }
    }
  }

  async removePrevImage(params: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this Image?',
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
              command: "food_img",
              premium: 0,
              command_Type: "delete"
            }

            this.chatconnect.postData(apidata, "event_operations").then((result: any) => {
              // this.commonservice.hide();
              if (result.Response.status == 1) {
                this.PremenuImg.splice(params, 1);
                this.commonservice.presentToast("", result.Response.message);
                // this.All_events();
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

  async openModal(originalEventImages: string[]) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        originalEventImages: originalEventImages
      }
    });
    return await modal.present();
  }

  ionViewDidLeave() {
    console.log("leaving", this.dataservice.events_form)
    this.dataservice.events_form = [];
    console.log("leaved", this.dataservice.events_form)
  }

  All_events() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_data.id
    };

    this.chatconnect.postData(apidata, "view_events_by_id").then((result: any) => {
      this.commonservice.hide();
      if (result.Response.status == 1) {
        const eventData = result.Response.events_data;

        const ageGroupParts = eventData.age_group.split('-');
        const ageGroupFrom = parseInt(ageGroupParts[0], 10);
        const ageGroupTo = parseInt(ageGroupParts[1], 10);

        this.imageUrls.push(
          eventData.event_images
        )
        this.prevImage = eventData.event_images,

          this.dataservice.prev_orginalImage = eventData.original_event_images;
        this.dataservice.previous_img = eventData.event_images;


        function removeHtmlTags(input: string): string {
          return input.replace(/<[^>]*>/g, '');
        }

        // Update form values
        this.ionicForm.patchValue({
          title: eventData.title,
          description: eventData.description,
          terms_and_conditions: removeHtmlTags(eventData.terms_condition),
          age_group: {
            age_group_from: ageGroupFrom,
            age_group_to: ageGroupTo,
          },
          location_name: eventData.event_venues
        });

        // handle event category
        const selectedCategory = this.dataservice.events_categories.find((category: any) => category.name === eventData.event_category);
        this.ionicForm.patchValue({
          category: selectedCategory ? selectedCategory.id : null,
        });

        //handle age group 
        const selectedAgeType = eventData.age_group;
        const selectedAgeeType: string | null =
          selectedAgeType !== undefined ? selectedAgeType.toString() : null;

        let mappedValue: string | null = null;

        if (selectedAgeeType !== null) {
          mappedValue =
            selectedAgeeType === 'Any age' ? '0' : '1';
        }

        this.ionicForm.patchValue({
          selectedAge: mappedValue,
        });

        // handle event type
        const selectedEventType = eventData.event_open_closed;
        const selectedType: string | null = selectedEventType !== undefined ? selectedEventType.toString() : null;
        this.ionicForm.patchValue({
          event_typecate: selectedType,
        });

        //Handle event dates
        const eventDates = eventData.event_dates;
        if (eventDates && eventDates.length > 0) {
          const formArray = this.ionicForm.get('event_dates') as FormArray;
          formArray.clear();
          eventDates.forEach((date: any) => {
            formArray.push(
              this.formBuilder.group({
                event_date: date.event_date,
                start_time: date.start_time,
                end_time: date.end_time
              })
            );
          });
        }

        // handle food type
        let food_name_ids: any[] = []
        if (eventData.event_food_type[0].food_type) {
          eventData.event_food_type[0].food_type.forEach((element: { id: any; }) => {
            this.dataservice.events_fooditems.forEach((apielement: { id: any; }) => {
              if (element.id === apielement.id) {
                food_name_ids.push(apielement.id)
              }
            });
          });
        }

        if (eventData && eventData.event_food_type && eventData.event_food_type[0] && eventData.event_food_type[0].food_type) {
          this.foodItems = eventData.event_food_type[0].food_type.filter((food: { name: string; }) => food.name.trim() !== '');
        }

        let cusine_name_ids: any[] = []

        if (eventData.event_food_type[0].cusine_food) {
          eventData.event_food_type[0].cusine_food.forEach((element: any) => {
            this.dataservice.cusines_items.forEach((apielement: any) => {
              if (element.id === apielement.id) {
                cusine_name_ids.push(apielement.id)
              }
            });
          });
        }

        const multi_food = eventData.event_food_type[0].extra_food;
        if (multi_food && multi_food.length > 0) {
          const formArray = this.ionicForm.get('food_section') as FormArray;
          formArray.clear();
          multi_food.forEach((mulfood: any) => {
            formArray.push(
              this.formBuilder.group({
                extra_food_name: mulfood.extra_food_name,
              })
            );
          });
        }

        const multi_drinks = eventData.event_food_type[0].drink;
        if (multi_drinks && multi_drinks.length > 0) {
          const formArray = this.ionicForm.get('drink_section') as FormArray;
          formArray.clear();
          multi_drinks.forEach((mulfood: any) => {
            formArray.push(
              this.formBuilder.group({
                drinks_name: mulfood.drinks_name,
              })
            );
          });
        }

        this.ionicForm.patchValue({
          //food_name: selectedFood ? selectedFood.id : null,
          food_name: food_name_ids,
        });

        this.ionicForm.patchValue({
          cuisine_name: cusine_name_ids,
        });

        // Handle activity data
        const eventActivities = eventData.event_activities;
        if (eventActivities && eventActivities.length > 0) {
          const formArray = this.ionicForm.get('event_activities') as FormArray;
          formArray.clear();
          eventActivities.forEach((activity: any) => {
            formArray.push(
              this.formBuilder.group({
                activity_name: activity.activity_name,
                activity_details: activity.activity_details
              })
            );
          });
        }

        this.tempActivities = eventActivities.filter((activity: { activity_name: string; }) => activity.activity_name.trim() !== '');

        // Handle contact data
        const eventEmergency = eventData.emergency_contact;
        if (eventEmergency && eventEmergency.length > 0) {
          const formArray = this.ionicForm.get('emergency_contact') as FormArray;
          formArray.clear();
          eventEmergency.forEach((contact: any) => {
            formArray.push(
              this.formBuilder.group({
                contact_name: contact.contact_name,
                contact_role: contact.contact_role,
                contact_number: contact.contact_number
              })
            );
          });
        }

        this.tempEmergencyContact = eventEmergency.filter((econtact: { contact_name: string; contact_number: string; }) => econtact.contact_name.trim() !== '' && econtact.contact_number.trim() !== '');

        // Handle contact data
        const eventpoll = eventData.poll_section;
        if (eventpoll && eventpoll.length > 0) {
          const formArray = this.ionicForm.get('poll_section') as FormArray;
          formArray.clear();
          eventpoll.forEach((poll: any) => {
            formArray.push(
              this.formBuilder.group({
                poll_question: poll.poll_question,
                poll_option1: poll.poll_option1,
                poll_option2: poll.poll_option2,
                poll_option3: poll.poll_option3,
                poll_option4: poll.poll_option4
              })
            );
          });
        }

        this.tempoll = eventpoll.filter((poll: { poll_question: string; poll_option1: string; }) => poll.poll_question.trim() !== '' && poll.poll_option1.trim() !== '');

        this.PremenuImg = eventData.menu_img_filename.map((item: any) => item.img);
      } else {
        this.common.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
  }
}