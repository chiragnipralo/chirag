"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreateEventPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var imgcropper_component_1 = require("../../../components/imgcropper/imgcropper.component");
var create_perm_page_1 = require("../create-perm/create-perm.page");
var create_contact_page_1 = require("../create-contact/create-contact.page");
var CreateEventPage = /** @class */ (function () {
    function CreateEventPage(sanitizer, formBuilder, common, dataservice, navCtrl, chatconnect, modalController, createv4omdal, successmodal, contactpagemodal, router, _route, alertController) {
        this.formBuilder = formBuilder;
        this.common = common;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.createv4omdal = createv4omdal;
        this.successmodal = successmodal;
        this.contactpagemodal = contactpagemodal;
        this.router = router;
        this._route = _route;
        this.alertController = alertController;
        this.selectedFiles = [];
        this.tempActivities = [];
        this.tempEmergencyContact = [];
        this.foodItems = [];
        this.tempoll = [];
        this.isSubmitted = false;
        this.segment = '1';
        this.food_others = '';
        this.showSubmitButton = false;
        this.contacts = [];
        this.isToggled = true;
        this.isActivityAdded = false;
        this.customOptionSelected = false;
        this.file_uploaddata = '';
        this.isPaidEvent = false;
        this.showMoreBar = false;
        this.is_custom_food_show = false;
        this.is_event_permission_skipped = false;
        this.Blobimage = [];
        this.LocalFoodItem = [];
        this.LocalCusineItem = [];
        this.customAlertOptions = {
            header: 'Select Category',
            translucent: true
        };
        this.AgeOptions = {
            header: 'Select Age',
            translucent: true
        };
        this.EventOptions = {
            header: 'Select Event Type',
            translucent: true
        };
        this.error_messages = {
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
        };
        this.values = [];
        this.sanitizer = sanitizer;
        this.segment = "1";
        this.imageUrls = [];
        this.mapsUrls = [];
        this.menuUrls = [];
        this.activityForm = this.formBuilder.group({
            activity_name: [''],
            activity_details: ['']
        });
    }
    CreateEventPage.prototype.populateTextarea = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedItems, termsAndConditionsControl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ionicForm) return [3 /*break*/, 2];
                        selectedItems = this.termsAndConditionsList
                            .filter(function (item) { return item.selected; })
                            .map(function (item) { return item.text; });
                        termsAndConditionsControl = this.ionicForm.get('terms_and_conditions');
                        if (termsAndConditionsControl) {
                            termsAndConditionsControl.setValue(selectedItems.join('\n'));
                        }
                        console.log("This is Selected", selectedItems);
                        return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.dismissModal = function () {
        this.modalController.dismiss();
    };
    CreateEventPage.prototype.toggleSelection = function (item) {
        item.selected = !item.selected;
    };
    CreateEventPage.prototype.onCategoryChange = function (event) {
        var _this = this;
        console.log("This is selected Category", event.detail.value);
        var apidata = {
            user_token: this.dataservice.getUserData(),
            category_id: event.detail.value
        };
        console.log(apidata);
        this.chatconnect.postData(apidata, "get_terms_by_categoryId").then(function (result) {
            console.log(result);
            if (result.Response.status === 1) {
                //this.dataservice.termsCondition = result.Response.terms;
                if (result.Response.terms && result.Response.terms.length > 0) {
                    _this.termsAndConditionsList = result.Response.terms[0].terms.map(function (term) { return ({
                        text: term.text,
                        selected: false
                    }); });
                }
                else {
                    _this.termsAndConditionsList = [
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
            }
            else {
                _this.common.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    CreateEventPage.prototype.GetCords = function () {
        var _this = this;
        var inputElement = document.querySelector("#autocomplete input");
        var autocomplete = new google.maps.places.Autocomplete(inputElement);
        autocomplete.addListener('place_changed', function () {
            console.log(autocomplete.getPlace());
            var selectedPlace = autocomplete.getPlace();
            if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
                console.log("IF ENTER");
                var latitude = selectedPlace.geometry.location.lat();
                var longitude = selectedPlace.geometry.location.lng();
                var locationn = selectedPlace.formatted_address;
                _this.dataservice.locationn = locationn;
                var locationNameControl = _this.ionicForm.get('location_name');
                if (locationNameControl) {
                    locationNameControl.setValue(locationn);
                }
                _this.dataservice.events_form.push({ maps_coordinates: [{ "latitude": latitude, "longitude": longitude }] });
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                console.log("Location:", locationn);
                console.log("Longitude:", _this.dataservice.events_form);
            }
        });
    };
    CreateEventPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var piece, activity, econtact, mulfood, drinks, poll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataservice.community_event_or_not = this._route.snapshot.params['event_for'];
                        console.log("This is Community Checkings=>", this.dataservice.community_event_or_not);
                        this.ionicForm = this.formBuilder.group({
                            title: ['', [forms_1.Validators.required]],
                            description: [''],
                            category: ['', [forms_1.Validators.required]],
                            location_name: ['', [forms_1.Validators.required]],
                            isPaidEvent: [false],
                            price: [null],
                            food_name: [''],
                            cuisine_name: [''],
                            selectedAge: ['', [forms_1.Validators.required]],
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
                        });
                        piece = this.formBuilder.group({
                            event_date: ['', [forms_1.Validators.required]],
                            start_time: ['', [forms_1.Validators.required]],
                            end_time: ['', [forms_1.Validators.required]]
                        });
                        activity = this.formBuilder.group({
                            activity_name: [''],
                            activity_details: ['']
                        });
                        econtact = this.formBuilder.group({
                            contact_name: [''],
                            contact_role: [''],
                            contact_number: ['']
                        });
                        mulfood = this.formBuilder.group({
                            extra_food_name: ['']
                        });
                        drinks = this.formBuilder.group({
                            drinks_name: ['']
                        });
                        poll = this.formBuilder.group({
                            poll_question: [''],
                            poll_option1: [''],
                            poll_option2: [''],
                            poll_option3: [''],
                            poll_option4: ['']
                        });
                        this.getPiecesArray.push(piece);
                        this.getActivityArray.push(activity);
                        this.getfoodArray.push(mulfood);
                        this.getdrinkArray.push(drinks);
                        this.getEcontactArray.push(econtact);
                        this.getPollArray.push(poll);
                        return [4 /*yield*/, this.GetDashboard()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.GetDashboard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apidata = {
                user_token: _this.dataservice.getUserData()
            };
            _this.chatconnect.postData(apidata, "user_dashboard").then(function (result) {
                console.log(result);
                if (result.Response.status == 1) {
                    _this.dataservice.events_categories = result.Response.all_categories;
                    _this.dataservice.events_languages = result.Response.languages;
                    _this.dataservice.events_fooditems = result.Response.fooditems;
                    _this.dataservice.cusines_items = result.Response.cusinesitems;
                    _this.LocalFoodItem = result.Response.fooditems;
                    _this.LocalCusineItem = result.Response.cusinesitems;
                    resolve(true);
                }
                else {
                    _this.common.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                // this.common.hide();
                console.log("Connection failed Messge");
                reject(err);
            });
        });
    };
    CreateEventPage.prototype.addPiece = function () {
        var piece = this.formBuilder.group({
            event_date: ['', [forms_1.Validators.required]],
            start_time: ['', [forms_1.Validators.required]],
            end_time: ['', [forms_1.Validators.required]]
        });
        this.getPiecesArray.push(piece);
        console.log('After Add: ', this.ionicForm.value);
        console.log(this.getPiecesArray.controls);
    };
    CreateEventPage.prototype.deletePiece = function (i) {
        this.getPiecesArray.removeAt(i);
        console.log(this.getPiecesArray.controls);
    };
    CreateEventPage.prototype.addActivity = function () {
        var activity = this.formBuilder.group({
            activity_name: ['', [forms_1.Validators.required]],
            activity_details: ['', [forms_1.Validators.required]]
        });
        this.getActivityArray.push(activity);
        console.log('After Add: ', this.ionicForm.value);
        console.log(this.getActivityArray.controls);
    };
    CreateEventPage.prototype.deleteActivity = function (i) {
        this.getActivityArray.removeAt(i);
        console.log(this.getActivityArray.controls);
    };
    CreateEventPage.prototype.Addacti = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var updatedActivities, _loop_1, this_1, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        updatedActivities = [];
                        _loop_1 = function (i) {
                            var activityGroup = this_1.getActivityArray.at(i);
                            // Perform null check on activityGroup
                            if (activityGroup) {
                                var activity_name_1 = (_a = activityGroup.get('activity_name')) === null || _a === void 0 ? void 0 : _a.value;
                                var activity_details = (_b = activityGroup.get('activity_details')) === null || _b === void 0 ? void 0 : _b.value;
                                if (activity_name_1) {
                                    var existingActivityIndex = this_1.tempActivities.findIndex(function (activity) { return activity.activity_name === activity_name_1; });
                                    if (existingActivityIndex !== -1) {
                                        this_1.tempActivities[existingActivityIndex].activity_details = activity_details || '';
                                        updatedActivities.push(this_1.tempActivities[existingActivityIndex]);
                                    }
                                    else {
                                        var existingActivity = this_1.tempActivities.find(function (activity) { return activity.activity_name === activity_name_1; });
                                        if (existingActivity) {
                                            existingActivity.activity_details = activity_details || '';
                                            updatedActivities.push(existingActivity);
                                        }
                                        else {
                                            var activity = {
                                                activity_name: activity_name_1,
                                                activity_details: activity_details || ''
                                            };
                                            this_1.tempActivities.push(activity);
                                            updatedActivities.push(activity);
                                        }
                                    }
                                }
                            }
                        };
                        this_1 = this;
                        for (i = 0; i < this.getActivityArray.length; i++) {
                            _loop_1(i);
                        }
                        console.log("Updated activities:", updatedActivities);
                        return [4 /*yield*/, this.modalController.dismiss(updatedActivities)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.addContact = function () {
        var econtact = this.formBuilder.group({
            contact_name: ['', [forms_1.Validators.required]],
            contact_role: ['', [forms_1.Validators.required]],
            contact_number: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.pattern('^[0-9]+$')]]
        });
        this.getEcontactArray.push(econtact);
        console.log('After Add: ', this.ionicForm.value);
        console.log(this.getEcontactArray.controls);
    };
    CreateEventPage.prototype.deleteContact = function (i) {
        this.getEcontactArray.removeAt(i);
        console.log(this.getEcontactArray.controls);
    };
    CreateEventPage.prototype.addEmergencyContact = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var updatedEmergencyContacts, _loop_2, this_2, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        updatedEmergencyContacts = [];
                        _loop_2 = function (i) {
                            var contactGroup = this_2.getEcontactArray.at(i);
                            // Perform null check on contactGroup
                            if (contactGroup) {
                                var contact_name_1 = (_a = contactGroup.get('contact_name')) === null || _a === void 0 ? void 0 : _a.value;
                                var contact_role = (_b = contactGroup.get('contact_role')) === null || _b === void 0 ? void 0 : _b.value;
                                var contact_number = (_c = contactGroup.get('contact_number')) === null || _c === void 0 ? void 0 : _c.value;
                                if (contact_name_1 && contact_number) {
                                    var existingContactIndex = this_2.tempEmergencyContact.findIndex(function (econtact) { return econtact.contact_name === contact_name_1; });
                                    if (existingContactIndex !== -1) {
                                        // Update existing emergency contact if found
                                        this_2.tempEmergencyContact[existingContactIndex].contact_role = contact_role || '';
                                        this_2.tempEmergencyContact[existingContactIndex].contact_number = contact_number || '';
                                        updatedEmergencyContacts.push(this_2.tempEmergencyContact[existingContactIndex]);
                                    }
                                    else {
                                        // Add new emergency contact if not found
                                        var econtact = {
                                            contact_name: contact_name_1,
                                            contact_role: contact_role || '',
                                            contact_number: contact_number || ''
                                        };
                                        this_2.tempEmergencyContact.push(econtact);
                                        updatedEmergencyContacts.push(econtact);
                                    }
                                }
                            }
                        };
                        this_2 = this;
                        for (i = 0; i < this.getEcontactArray.length; i++) {
                            _loop_2(i);
                        }
                        console.log("Updated emergency contacts:", updatedEmergencyContacts);
                        return [4 /*yield*/, this.modalController.dismiss(updatedEmergencyContacts)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.addPoll = function () {
        var poll = this.formBuilder.group({
            poll_question: ['', [forms_1.Validators.required]],
            poll_option1: ['', [forms_1.Validators.required]],
            poll_option2: ['', [forms_1.Validators.required]],
            poll_option3: [''],
            poll_option4: ['']
        });
        this.getPollArray.push(poll);
        console.log('After Add: ', this.ionicForm.value);
        console.log(this.getPollArray.controls);
    };
    CreateEventPage.prototype.addPollSection = function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var updatedPolls, _loop_3, this_3, i;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        updatedPolls = [];
                        _loop_3 = function (i) {
                            var pollGroup = this_3.getPollArray.at(i);
                            var poll_question = (_a = pollGroup.get('poll_question')) === null || _a === void 0 ? void 0 : _a.value;
                            var poll_option1 = (_b = pollGroup.get('poll_option1')) === null || _b === void 0 ? void 0 : _b.value;
                            var poll_option2 = (_c = pollGroup.get('poll_option2')) === null || _c === void 0 ? void 0 : _c.value;
                            var poll_option3 = (_d = pollGroup.get('poll_option3')) === null || _d === void 0 ? void 0 : _d.value;
                            var poll_option4 = (_e = pollGroup.get('poll_option4')) === null || _e === void 0 ? void 0 : _e.value;
                            if (poll_question && poll_option1) {
                                var existingPollIndex = this_3.tempoll.findIndex(function (poll) { return poll.poll_question === poll_question; });
                                if (existingPollIndex !== -1) {
                                    // Update existing poll section if found
                                    this_3.tempoll[existingPollIndex].poll_option1 = poll_option1 || '';
                                    this_3.tempoll[existingPollIndex].poll_option2 = poll_option2 || '';
                                    this_3.tempoll[existingPollIndex].poll_option3 = poll_option3 || '';
                                    this_3.tempoll[existingPollIndex].poll_option4 = poll_option4 || '';
                                    updatedPolls.push(this_3.tempoll[existingPollIndex]);
                                }
                                else {
                                    // Add new poll section if not found
                                    var poll = {
                                        poll_question: poll_question,
                                        poll_option1: poll_option1 || '',
                                        poll_option2: poll_option2 || '',
                                        poll_option3: poll_option3 || '',
                                        poll_option4: poll_option4 || ''
                                    };
                                    this_3.tempoll.push(poll);
                                    updatedPolls.push(poll);
                                }
                            }
                        };
                        this_3 = this;
                        for (i = 0; i < this.getPollArray.length; i++) {
                            _loop_3(i);
                        }
                        console.log("Updated poll sections:", updatedPolls);
                        return [4 /*yield*/, this.modalController.dismiss(updatedPolls)];
                    case 1:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.deletePoll = function (i) {
        this.getPollArray.removeAt(i);
        console.log(this.getPollArray.controls);
    };
    CreateEventPage.prototype.addfood = function () {
        var mulfood = this.formBuilder.group({
            extra_food_name: ['', [forms_1.Validators.required]]
        });
        this.getfoodArray.push(mulfood);
        console.log('After Add: ', this.ionicForm.value);
        console.log(this.getPollArray.controls);
    };
    CreateEventPage.prototype.removefood = function (i) {
        this.getfoodArray.removeAt(i);
        console.log(this.getPollArray.controls);
    };
    CreateEventPage.prototype.addDrink = function () {
        var drinks = this.formBuilder.group({
            drinks_name: ['']
        });
        this.getdrinkArray.push(drinks);
        console.log('After Add: ', this.ionicForm.value);
    };
    CreateEventPage.prototype.removeDrink = function (i) {
        this.getdrinkArray.removeAt(i);
        console.log(this.getPollArray.controls);
    };
    CreateEventPage.prototype.saveFoodItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foodItemId;
            return __generator(this, function (_a) {
                foodItemId = this.ionicForm.value.food_name;
                this.foodItems.push(foodItemId);
                console.log("This is Food:", this.foodItems);
                this.modalController.dismiss(this.foodItems);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(CreateEventPage.prototype, "getPiecesArray", {
        get: function () {
            return this.ionicForm.get('event_dates');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateEventPage.prototype, "getActivityArray", {
        get: function () {
            return this.ionicForm.get('event_activities');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateEventPage.prototype, "getEcontactArray", {
        get: function () {
            return this.ionicForm.get('emergency_contact');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateEventPage.prototype, "getfoodArray", {
        get: function () {
            return this.ionicForm.get('food_section');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateEventPage.prototype, "getdrinkArray", {
        get: function () {
            return this.ionicForm.get('drink_section');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateEventPage.prototype, "getPollArray", {
        get: function () {
            return this.ionicForm.get('poll_section');
        },
        enumerable: false,
        configurable: true
    });
    CreateEventPage.prototype.loadImagesFromDeviceMulti = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files && files.length > 0) {
            var _loop_4 = function (i) {
                var reader = new FileReader();
                reader.onload = function () {
                    _this.menuUrls.push(reader.result);
                };
                reader.readAsDataURL(files[i]);
                this_4.selectedFiles.push(files[i]);
            };
            var this_4 = this;
            for (var i = 0; i < files.length; i++) {
                _loop_4(i);
            }
            this.dataservice.foodImages = this.selectedFiles;
        }
    };
    CreateEventPage.prototype.removeImage = function (index) {
        this.menuUrls.splice(index, 1);
        this.selectedFiles.splice(index, 1);
        this.dataservice.foodImages = this.selectedFiles;
    };
    CreateEventPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert, termsAndConditionsValue, termsAndConditionsControl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        console.log(this.ionicForm);
                        if (!(!this.ionicForm.valid || this.imageUrls.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Please Enter',
                                subHeader: 'Please Enter all details',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        termsAndConditionsValue = void 0;
                        termsAndConditionsControl = this.ionicForm.get('terms_and_conditions');
                        if (termsAndConditionsControl) {
                            termsAndConditionsValue = this.ionicForm.value.terms_and_conditions
                                .split('\n')
                                .map(function (line) { return "<li>" + line + "</li>"; })
                                .join('\n');
                            // Check if termsAndConditionsControl.value is not null before setting it
                            if (termsAndConditionsControl.value !== null) {
                                // Set the formatted value back to the form control
                                if (termsAndConditionsValue != '<li></li>') {
                                    termsAndConditionsControl.setValue("<ul>" + termsAndConditionsValue + "</ul>");
                                }
                                console.log(this.ionicForm.value);
                                this.dataservice.event_food_type = this.LocalFoodItem.filter(function (item) { return _this.ionicForm.value.food_name.indexOf(item.id) !== -1; });
                                this.dataservice.events_form.push(this.ionicForm.value);
                                console.log("Event Form ==> ", this.dataservice.events_form);
                                this.ContactPageModal();
                            }
                            else {
                                console.error("terms_and_conditions form control value is null.");
                            }
                        }
                        else {
                            console.error("terms_and_conditions form control not found.");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.view = function (img, showflag) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: imgcropper_component_1.ImgcropperComponent,
                            cssClass: 'my-menubar'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (data.data != undefined) {
                                if (data.data.cropped_image) {
                                    _this.dataservice.convertBase64ToBlob(data.data.cropped_image);
                                    if (showflag == "eventmap") {
                                        _this.mapsUrls = [];
                                        _this.mapsUrls.unshift(data.data.cropped_image);
                                        localStorage.setItem("event_map_image", data.data.cropped_image);
                                    }
                                    else if (showflag == "event") {
                                        _this.imageUrls = [];
                                        _this.imageUrls.unshift(data.data.cropped_image);
                                        localStorage.setItem("event_images", data.data.cropped_image);
                                    }
                                    else {
                                        _this.menuUrls = [];
                                        _this.menuUrls.unshift(data.data.cropped_image);
                                        localStorage.setItem("menu_imgData", data.data.cropped_image);
                                    }
                                }
                            }
                            else {
                                if (showflag == "event") {
                                    _this.imageUrls = [];
                                }
                                else {
                                    _this.menuUrls = [];
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateEventPage.prototype.moveFocus = function (event) {
        console.log("my evet --", event.target.value);
        this.dataservice.events_fooditems.forEach(function (item) {
            if (item.id === 0) {
                item.name = event.target.value;
            }
        });
    };
    CreateEventPage.prototype.ChangeFood = function (event) {
        var _this = this;
        console.log("my evet --", event.detail.value);
        console.log("my evet --", this.ionicForm.value.food_name);
        // this.LocalFoodItem.filter((item)=> { return this.ionicForm.value.food_name.indexOf(item.id) === 1 });
        event.detail.value.forEach(function (item) {
            console.log("sel item -->", item);
            if (item == 0) {
                _this.is_custom_food_show = true;
            }
        });
    };
    CreateEventPage.prototype.loadImageFromDevice = function (event, showflag) {
        var _this = this;
        console.log(event);
        var photo = event.target.files[0];
        console.log(photo);
        this.file_uploaddata = photo;
        console.log(photo);
        var formData = new FormData();
        // Add the file that was just added to the form data
        formData.append("photo", photo, photo.name);
        this.Blobimage.push(photo);
        this.dataservice.blobToBase64(photo).then(function (res) {
            _this.dataservice.event_base64img = res;
            _this.view(res, showflag);
        });
        // const file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsArrayBuffer(photo);
        reader.onload = function () {
            // get the blob of the image:
            var blob = new Blob([new Uint8Array(reader.result)]);
            // create blobURL, such that we could use it in an image element:
            var blobURL = URL.createObjectURL(blob);
            // console.log(blob);
            if (showflag == "eventmap") {
                _this.mapsUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
            else if (showflag == "event") {
                _this.imageUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
            else {
                _this.menuUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
        };
        console.log(this.Blobimage);
        reader.onerror = function (error) { };
    };
    ;
    CreateEventPage.prototype.goToNextSegment = function () {
        var segments = ['1', '2', '3', '4'];
        var currentIndex = segments.indexOf(this.segment);
        console.log(currentIndex, "cur idx ");
        if (currentIndex < segments.length - 1) {
            this.segment = segments[currentIndex + 1];
        }
        else if (currentIndex === segments.length - 1) {
            this.segment = segments[currentIndex];
        }
        console.log(this.segment);
    };
    CreateEventPage.prototype.updatePage = function (homeSegment) {
        console.log("homeSegment ", homeSegment);
    };
    CreateEventPage.prototype.goToPreviousSegment = function () {
        var segments = ['1', '2', '3', '4'];
        var currentIndex = segments.indexOf(this.segment);
        if (currentIndex > 0) {
            this.segment = segments[currentIndex - 1];
        }
    };
    CreateEventPage.prototype.removevalue = function (i) {
        this.values.splice(i, 1);
    };
    CreateEventPage.prototype.SkipNow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createv4omdal.create({
                            component: create_perm_page_1.CreatePermPage,
                            cssClass: 'pindialog-container',
                            handle: true,
                            componentProps: {
                                pass_code: true
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log("DATA HERE --->", data);
                            if (data.data != undefined) {
                                _this.is_event_permission_skipped = true;
                                // this.common.show("Please Wait");
                                // this.dataservice.emergency_contact=this.ionicForm.value.emergency_contact
                                // this.dataservice.event_food_type=this.ionicForm.value.food_name
                                _this.dataservice.event_food_type = _this.LocalFoodItem.filter(function (item) { return _this.ionicForm.value.food_name.indexOf(item.id) !== -1; });
                                _this.dataservice.events_form.push(_this.ionicForm.value);
                                console.log(_this.dataservice.events_form, "kaleem");
                                _this.ContactPageModal();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateEventPage.prototype.addvalue = function () {
        this.values.push({ value: "" });
    };
    CreateEventPage.prototype.ContactPageModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.common.hide();
                        return [4 /*yield*/, this.contactpagemodal.create({
                                component: create_contact_page_1.CreateContactPage,
                                cssClass: 'pindialog-container',
                                handle: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log("DATA HERE --->", data);
                            if (data.data != undefined) {
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateEventPage.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSegOneValid, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isSubmitted) return [3 /*break*/, 3];
                        isSegOneValid = this.ionicForm.controls['title'].valid &&
                            this.ionicForm.controls['description'].valid &&
                            this.ionicForm.controls['category'].valid &&
                            this.ionicForm.controls['age_group'].valid;
                        if (!isSegOneValid) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirm',
                                message: 'Save This into Draft?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'primary'
                                    },
                                    {
                                        text: 'Yes',
                                        handler: function () {
                                            _this.common.show("Please Wait");
                                            var userToken = _this.dataservice.getUserData();
                                            var userResponse = _this.dataservice.GetAccountuser(); // Replace with the actual method to get the user response
                                            _this.dataservice.events_form.push(_this.ionicForm.value);
                                            var formData = new FormData();
                                            if (userToken !== null) {
                                                formData.append('user_token', userToken);
                                            }
                                            formData.append('eventFlag', _this.dataservice.eventFlag);
                                            formData.append('communityId', userResponse);
                                            formData.append('location', _this.dataservice.locationn);
                                            formData.append('emergency_contact', _this.dataservice.emergency_contact);
                                            formData.append('event_cusine_type', JSON.stringify(_this.dataservice.event_cusine_type));
                                            formData.append('event_food_type', JSON.stringify(_this.dataservice.event_food_type));
                                            formData.append('original_event_images', _this.dataservice.orginalImage);
                                            formData.append('event_type', 'paid_event');
                                            var eventImages = localStorage.getItem('event_images');
                                            if (eventImages !== null && !_this.dataservice.isNullOrUndefined(eventImages)) {
                                                formData.append('event_images', _this.dataservice.convertBase64ToBlob(eventImages));
                                            }
                                            _this.dataservice.foodImages.forEach(function (file) {
                                                formData.append('menu_imgData[]', file);
                                            });
                                            formData.append('events_data', JSON.stringify(_this.dataservice.events_form));
                                            console.log(formData);
                                            _this.chatconnect.postFormData(formData, "draft_event").then(function (result) {
                                                _this.common.hide();
                                                if (result.Response.status == 1) {
                                                    localStorage.removeItem('event_images');
                                                    localStorage.removeItem('menu_imgData');
                                                    _this.common.presentToast("", "Event Added In Draft...");
                                                }
                                                else {
                                                    _this.common.presentToast("Oops", result.Response.message);
                                                }
                                            }, function (err) {
                                                _this.common.hide();
                                                console.log("Connection failed Messge");
                                            });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('autocomplete')
    ], CreateEventPage.prototype, "autocomplete");
    __decorate([
        core_1.ViewChild(angular_1.IonTextarea)
    ], CreateEventPage.prototype, "textarea");
    __decorate([
        core_1.ViewChild('moreBar')
    ], CreateEventPage.prototype, "moreBar");
    CreateEventPage = __decorate([
        core_1.Component({
            selector: 'app-create-event',
            templateUrl: './create-event.page.html',
            styleUrls: ['./create-event.page.scss']
        })
    ], CreateEventPage);
    return CreateEventPage;
}());
exports.CreateEventPage = CreateEventPage;
