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
exports.EditPaidEventPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var imgcropper_component_1 = require("../../../components/imgcropper/imgcropper.component");
var image_modal_component_1 = require("src/app/components/image-modal/image-modal.component");
var EditPaidEventPage = /** @class */ (function () {
    function EditPaidEventPage(sanitizer, commonservice, formBuilder, common, dataservice, navCtrl, chatconnect, modalController, createv4omdal, successmodal, contactpagemodal, router, _route, location, alertController) {
        this.commonservice = commonservice;
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
        this.location = location;
        this.alertController = alertController;
        this.tempActivities = [];
        this.tempEmergencyContact = [];
        this.foodItems = [];
        this.tempoll = [];
        this.isSubmitted = false;
        this.file_uploaddata = '';
        this.selectedFiles = [];
        this.PremenuImg = [];
        this.showMoreBar = false;
        this.is_custom_food_show = false;
        this.is_event_permission_skipped = false;
        this.Blobimage = [];
        this.LocalFoodItem = [];
        this.LocalCusineItem = [];
        this.localAgeGroup = [];
        this.segment = '1';
        this.food_others = '';
        this.showSubmitButton = false;
        this.contacts = [];
        this.isPaidEvent = false;
        this.isToggled = true;
        this.isActivityAdded = false;
        this.customOptionSelected = false;
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
        this.ionicForm = this.formBuilder.group({
            food_name: [[]]
        });
    }
    EditPaidEventPage.prototype.populateTextarea = function () {
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
                        return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.dismissModal = function () {
        this.modalController.dismiss();
    };
    EditPaidEventPage.prototype.toggleSelection = function (item) {
        item.selected = !item.selected;
    };
    EditPaidEventPage.prototype.GetCords = function () {
        var _this = this;
        var inputElement = document.querySelector("#autocomplete input");
        var autocomplete = new google.maps.places.Autocomplete(inputElement);
        autocomplete.addListener('place_changed', function () {
            var selectedPlace = autocomplete.getPlace();
            if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
                var latitude = selectedPlace.geometry.location.lat();
                var longitude = selectedPlace.geometry.location.lng();
                var locationn = selectedPlace.formatted_address;
                _this.dataservice.locationn = locationn;
                _this.dataservice.events_form.push({ maps_coordinates: [{ "latitude": latitude, "longitude": longitude }] });
            }
        });
    };
    EditPaidEventPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var piece, activity, econtact, mulfood, drinks, poll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.commonservice.show();
                        this.ionicForm = this.formBuilder.group({
                            title: ['', [forms_1.Validators.required]],
                            description: [''],
                            selectedAge: [''],
                            isPaidEvent: [false],
                            price: [null],
                            category: ['', [forms_1.Validators.required]],
                            location_name: ['', [forms_1.Validators.required]],
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
                        this.All_events();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.onCategoryChange = function (event) {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            category_id: event.detail.value
        };
        this.chatconnect.postData(apidata, "get_terms_by_categoryId").then(function (result) {
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
    EditPaidEventPage.prototype.GetDashboard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apidata = {
                user_token: _this.dataservice.getUserData()
            };
            _this.chatconnect.postData(apidata, "user_dashboard").then(function (result) {
                if (result.Response.status == 1) {
                    _this.dataservice.events_categories = result.Response.all_categories;
                    _this.dataservice.events_languages = result.Response.languages;
                    _this.dataservice.events_fooditems = result.Response.fooditems;
                    _this.dataservice.cusines_items = result.Response.cusinesitems;
                    _this.dataservice.age_groups = result.Response.age_group;
                    _this.localAgeGroup = result.Response.age_group;
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
    EditPaidEventPage.prototype.addPiece = function () {
        var piece = this.formBuilder.group({
            event_date: ['', [forms_1.Validators.required]],
            start_time: ['', [forms_1.Validators.required]],
            end_time: ['', [forms_1.Validators.required]]
        });
        this.getPiecesArray.push(piece);
    };
    EditPaidEventPage.prototype.deletePiece = function (i) {
        this.getPiecesArray.removeAt(i);
    };
    EditPaidEventPage.prototype.addActivity = function () {
        var activity = this.formBuilder.group({
            activity_name: [''],
            activity_details: ['']
        });
        this.getActivityArray.push(activity);
    };
    EditPaidEventPage.prototype.deleteActivity = function (i) {
        this.getActivityArray.removeAt(i);
    };
    EditPaidEventPage.prototype.Addacti = function () {
        return __awaiter(this, void 0, void 0, function () {
            var updatedActivities, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedActivities = [];
                        _loop_1 = function (i) {
                            var activityGroup = this_1.getActivityArray.at(i);
                            var activityNameControl = activityGroup.get('activity_name');
                            var activityDetailsControl = activityGroup.get('activity_details');
                            if (activityNameControl && activityDetailsControl) {
                                var activity_name_1 = activityNameControl.value;
                                var activity_details = activityDetailsControl.value;
                                if (activity_name_1) {
                                    var existingActivityIndex = this_1.tempActivities.findIndex(function (activity) { return activity.activity_name === activity_name_1; });
                                    if (existingActivityIndex !== -1) {
                                        // Update existing activity if found
                                        this_1.tempActivities[existingActivityIndex].activity_details = activity_details || '';
                                        updatedActivities.push(this_1.tempActivities[existingActivityIndex]);
                                    }
                                    else {
                                        // Add a new activity if not found
                                        var activity = {
                                            activity_name: activity_name_1,
                                            activity_details: activity_details || ''
                                        };
                                        this_1.tempActivities.push(activity);
                                        updatedActivities.push(activity);
                                    }
                                }
                            }
                        };
                        this_1 = this;
                        for (i = 0; i < this.getActivityArray.length; i++) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, this.modalController.dismiss(updatedActivities)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.addContact = function () {
        var econtact = this.formBuilder.group({
            contact_name: [''],
            contact_role: [''],
            contact_number: ['']
        });
        this.getEcontactArray.push(econtact);
    };
    EditPaidEventPage.prototype.deleteContact = function (i) {
        this.getEcontactArray.removeAt(i);
    };
    EditPaidEventPage.prototype.addEmegenctyContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var updatedEmergencyContacts, _loop_2, this_2, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedEmergencyContacts = [];
                        _loop_2 = function (i) {
                            var contactGroup = this_2.getEcontactArray.at(i);
                            // Perform null checks on controls
                            var contactNameControl = contactGroup.get('contact_name');
                            var contactRoleControl = contactGroup.get('contact_role');
                            var contactNumberControl = contactGroup.get('contact_number');
                            if (contactNameControl && contactNumberControl) {
                                var contact_name_1 = contactNameControl.value;
                                var contact_role = (contactRoleControl === null || contactRoleControl === void 0 ? void 0 : contactRoleControl.value) || ''; // Use optional chaining to handle possible null or undefined
                                var contact_number = contactNumberControl.value;
                                var existingContactIndex = this_2.tempEmergencyContact.findIndex(function (econtact) { return econtact.contact_name === contact_name_1; });
                                if (existingContactIndex !== -1) {
                                    // Update existing emergency contact if found
                                    this_2.tempEmergencyContact[existingContactIndex].contact_role = contact_role;
                                    this_2.tempEmergencyContact[existingContactIndex].contact_number = contact_number || '';
                                    updatedEmergencyContacts.push(this_2.tempEmergencyContact[existingContactIndex]);
                                }
                                else {
                                    // Add new emergency contact if not found
                                    var econtact = {
                                        contact_name: contact_name_1,
                                        contact_role: contact_role,
                                        contact_number: contact_number || ''
                                    };
                                    this_2.tempEmergencyContact.push(econtact);
                                    updatedEmergencyContacts.push(econtact);
                                }
                            }
                        };
                        this_2 = this;
                        for (i = 0; i < this.getEcontactArray.length; i++) {
                            _loop_2(i);
                        }
                        return [4 /*yield*/, this.modalController.dismiss(updatedEmergencyContacts)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.addPoll = function () {
        var poll = this.formBuilder.group({
            poll_question: [''],
            poll_option1: [''],
            poll_option2: [''],
            poll_option3: [''],
            poll_option4: ['']
        });
        this.getPollArray.push(poll);
    };
    EditPaidEventPage.prototype.deletePoll = function (i) {
        this.getPollArray.removeAt(i);
    };
    EditPaidEventPage.prototype.addPollSection = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var updatedPollSections, _loop_3, this_3, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        updatedPollSections = [];
                        _loop_3 = function (i) {
                            var pollGroup = this_3.getPollArray.at(i);
                            // Perform null checks on controls
                            var pollQuestionControl = pollGroup.get('poll_question');
                            var pollOption1Control = pollGroup.get('poll_option1');
                            if (pollQuestionControl && pollOption1Control) {
                                var poll_question_1 = pollQuestionControl.value;
                                var poll_option1 = pollOption1Control.value;
                                var poll_option2 = ((_a = pollGroup.get('poll_option2')) === null || _a === void 0 ? void 0 : _a.value) || ''; // Use optional chaining
                                var poll_option3 = ((_b = pollGroup.get('poll_option3')) === null || _b === void 0 ? void 0 : _b.value) || ''; // Use optional chaining
                                var poll_option4 = ((_c = pollGroup.get('poll_option4')) === null || _c === void 0 ? void 0 : _c.value) || ''; // Use optional chaining
                                if (poll_question_1 && poll_option1) {
                                    var existingPollIndex = this_3.tempoll.findIndex(function (poll) { return poll.poll_question === poll_question_1; });
                                    if (existingPollIndex !== -1) {
                                        // Update existing poll section if found
                                        this_3.tempoll[existingPollIndex].poll_option1 = poll_option1;
                                        this_3.tempoll[existingPollIndex].poll_option2 = poll_option2;
                                        this_3.tempoll[existingPollIndex].poll_option3 = poll_option3;
                                        this_3.tempoll[existingPollIndex].poll_option4 = poll_option4;
                                        updatedPollSections.push(this_3.tempoll[existingPollIndex]);
                                    }
                                    else {
                                        // Add new poll section if not found
                                        var poll = {
                                            poll_question: poll_question_1,
                                            poll_option1: poll_option1,
                                            poll_option2: poll_option2,
                                            poll_option3: poll_option3,
                                            poll_option4: poll_option4
                                        };
                                        this_3.tempoll.push(poll);
                                        updatedPollSections.push(poll);
                                    }
                                }
                            }
                        };
                        this_3 = this;
                        for (i = 0; i < this.getPollArray.length; i++) {
                            _loop_3(i);
                        }
                        return [4 /*yield*/, this.modalController.dismiss(updatedPollSections)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.addfood = function () {
        var mulfood = this.formBuilder.group({
            extra_food_name: ['']
        });
        this.getfoodArray.push(mulfood);
    };
    EditPaidEventPage.prototype.removefood = function (i) {
        this.getfoodArray.removeAt(i);
    };
    EditPaidEventPage.prototype.addDrink = function () {
        var drinks = this.formBuilder.group({
            drinks_name: ['']
        });
        this.getdrinkArray.push(drinks);
    };
    EditPaidEventPage.prototype.removeDrink = function (i) {
        this.getdrinkArray.removeAt(i);
    };
    EditPaidEventPage.prototype.saveFoodItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foodItemId;
            return __generator(this, function (_a) {
                foodItemId = this.ionicForm.value.food_name;
                this.foodItems.push(foodItemId);
                this.modalController.dismiss(this.foodItems);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(EditPaidEventPage.prototype, "getPiecesArray", {
        get: function () {
            return this.ionicForm.get('event_dates');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPaidEventPage.prototype, "getActivityArray", {
        get: function () {
            return this.ionicForm.get('event_activities');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPaidEventPage.prototype, "getEcontactArray", {
        get: function () {
            return this.ionicForm.get('emergency_contact');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPaidEventPage.prototype, "getfoodArray", {
        get: function () {
            return this.ionicForm.get('food_section');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPaidEventPage.prototype, "getdrinkArray", {
        get: function () {
            return this.ionicForm.get('drink_section');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPaidEventPage.prototype, "getPollArray", {
        get: function () {
            return this.ionicForm.get('poll_section');
        },
        enumerable: false,
        configurable: true
    });
    EditPaidEventPage.prototype.loadImagesFromDeviceMulti = function (event) {
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
        }
    };
    EditPaidEventPage.prototype.removeImage = function (index) {
        this.menuUrls.splice(index, 1);
        this.selectedFiles.splice(index, 1);
    };
    EditPaidEventPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert, termsAndConditionsValue, termsAndConditionsControl, userToken, formData, eventImages;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        if (!!this.ionicForm.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Please Enter',
                                subHeader: '* Please fill the required details',
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
                                termsAndConditionsControl.setValue("<ul>" + termsAndConditionsValue + "</ul>");
                            }
                            else {
                                console.error("terms_and_conditions form control value is null.");
                            }
                        }
                        else {
                            console.error("terms_and_conditions form control not found.");
                        }
                        console.log(this.ionicForm.value);
                        userToken = this.dataservice.getUserData();
                        this.dataservice.event_cusine_type = this.LocalCusineItem.filter(function (item) { return _this.ionicForm.value.cuisine_name.indexOf(item.id) !== -1; });
                        this.dataservice.event_food_type = this.LocalFoodItem.filter(function (item) { return _this.ionicForm.value.food_name.indexOf(item.id) !== -1; });
                        this.dataservice.events_form.push(this.ionicForm.value);
                        this.common.show("Please Wait");
                        formData = new FormData();
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
                        eventImages = localStorage.getItem('event_images');
                        if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
                            formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
                        }
                        this.selectedFiles.forEach(function (file) {
                            formData.append('menu_imgData[]', file);
                        });
                        formData.append('events_data', JSON.stringify(this.dataservice.events_form));
                        this.chatconnect.postFormData(formData, "edit_paid_event").then(function (result) {
                            _this.common.hide();
                            if (result.Response.status == 1) {
                                _this.common.presentToast("", result.Response.message);
                                localStorage.removeItem('event_images');
                                localStorage.removeItem('menu_imgData');
                                _this.location.back();
                            }
                            else {
                                _this.common.presentToast("Oops", result.Response.message);
                            }
                        }, function (err) {
                            _this.common.hide();
                            console.log("Connection failed Messge");
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.view = function (img, showflag) {
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
                                    if (showflag == "event") {
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
                                    if (_this.prevImage !== null) {
                                        _this.imageUrls = [];
                                        _this.imageUrls.push(_this.prevImage);
                                    }
                                    else {
                                        _this.imageUrls = [];
                                    }
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditPaidEventPage.prototype.moveFocus = function (event) {
        this.dataservice.events_fooditems.forEach(function (item) {
            if (item.id === 0) {
                item.name = event.target.value;
            }
        });
    };
    EditPaidEventPage.prototype.ChangeFood = function (event) {
        var _this = this;
        event.detail.value.forEach(function (item) {
            if (item == 0) {
                _this.is_custom_food_show = true;
            }
        });
    };
    EditPaidEventPage.prototype.loadImageFromDevice = function (event, showflag) {
        var _this = this;
        var photo = event.target.files[0];
        this.dataservice.orginalImage = photo;
        this.file_uploaddata = photo;
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
            var blob = new Blob([new Uint8Array(reader.result)]);
            var blobURL = URL.createObjectURL(blob);
            if (showflag == "event") {
                _this.imageUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
            else {
                _this.menuUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
        };
        reader.onerror = function (error) { };
    };
    ;
    EditPaidEventPage.prototype.goToNextSegment = function () {
        var segments = ['1', '2', '3', '4'];
        var currentIndex = segments.indexOf(this.segment);
        if (currentIndex < segments.length - 1) {
            this.segment = segments[currentIndex + 1];
        }
        else if (currentIndex === segments.length - 1) {
            this.segment = segments[currentIndex];
        }
    };
    EditPaidEventPage.prototype.goToPreviousSegment = function () {
        var segments = ['1', '2', '3', '4'];
        var currentIndex = segments.indexOf(this.segment);
        if (currentIndex > 0) {
            this.segment = segments[currentIndex - 1];
        }
    };
    EditPaidEventPage.prototype.removevalue = function (i) {
        this.values.splice(i, 1);
    };
    EditPaidEventPage.prototype.addvalue = function () {
        this.values.push({ value: "" });
    };
    EditPaidEventPage.prototype.onAgeChange = function () {
        var selectedAgeControl = this.ionicForm.get('selectedAge');
        var ageGroupForm = this.ionicForm.get('age_group');
        if (selectedAgeControl && ageGroupForm) {
            if (selectedAgeControl.value === '0') {
                // Null check before calling get method
                var ageGroupFromControl = ageGroupForm.get('age_group_from');
                var ageGroupToControl = ageGroupForm.get('age_group_to');
                if (ageGroupFromControl && ageGroupToControl) {
                    ageGroupFromControl.setValue(null);
                    ageGroupToControl.setValue(null);
                }
            }
        }
    };
    EditPaidEventPage.prototype.removePrevImage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this Image?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        var apidata = {
                                            user_token: _this.dataservice.getUserData(),
                                            event_id: _this.dataservice.user_event_data.id,
                                            row_id: params,
                                            command: "food_img",
                                            premium: 1,
                                            command_Type: "delete"
                                        };
                                        _this.chatconnect.postData(apidata, "event_operations").then(function (result) {
                                            // this.commonservice.hide();
                                            if (result.Response.status == 1) {
                                                _this.commonservice.presentToast("", result.Response.message);
                                                _this.All_events();
                                            }
                                            else {
                                                _this.commonservice.presentToast("Oops", result.Response.message);
                                            }
                                        }, function (err) {
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
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidEventPage.prototype.openModal = function (originalEventImages) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: image_modal_component_1.ImageModalComponent,
                            componentProps: {
                                originalEventImages: originalEventImages
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditPaidEventPage.prototype.ionViewDidLeave = function () {
        console.log("leaving", this.dataservice.events_form);
        this.dataservice.events_form = [];
        console.log("leaved", this.dataservice.events_form);
    };
    EditPaidEventPage.prototype.All_events = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_data.id
        };
        this.chatconnect.postData(apidata, "view_paid_events_by_id").then(function (result) {
            _this.commonservice.hide();
            if (result.Response.status == 1) {
                var eventData_1 = result.Response.events_data;
                console.log(eventData_1);
                var ageGroupParts = eventData_1.age_group.split('-');
                var ageGroupFrom = parseInt(ageGroupParts[0], 10);
                var ageGroupTo = parseInt(ageGroupParts[1], 10);
                _this.imageUrls.push(eventData_1.event_images);
                function removeHtmlTags(input) {
                    return input.replace(/<[^>]*>/g, '');
                }
                // Update form values
                _this.ionicForm.patchValue({
                    title: eventData_1.title,
                    description: eventData_1.description,
                    terms_and_conditions: removeHtmlTags(eventData_1.terms_condition),
                    age_group: {
                        age_group_to: ageGroupTo,
                        age_group_from: ageGroupFrom
                    }
                });
                // handle event category
                var selectedCategory = _this.dataservice.events_categories.find(function (category) { return category.name === eventData_1.event_category; });
                _this.ionicForm.patchValue({
                    category: selectedCategory ? selectedCategory.id : null
                });
                //handle age group 
                var selectedAgeType = eventData_1.age_group;
                var selectedAgeeType = selectedAgeType !== undefined ? selectedAgeType.toString() : null;
                var mappedValue = null;
                if (selectedAgeeType !== null) {
                    mappedValue =
                        selectedAgeeType === 'Any age' ? '0' : '1';
                }
                _this.ionicForm.patchValue({
                    selectedAge: mappedValue
                });
                // handle event type
                var selectedEventType = eventData_1.event_open_closed;
                var selectedType = selectedEventType !== undefined ? selectedEventType.toString() : null;
                _this.ionicForm.patchValue({
                    event_typecate: selectedType
                });
                // handle food type
                var food_name_ids_1 = [];
                if (eventData_1.event_food_type[0].food_type) {
                    eventData_1.event_food_type[0].food_type.forEach(function (element) {
                        _this.dataservice.events_fooditems.forEach(function (apielement) {
                            if (element.id === apielement.id) {
                                food_name_ids_1.push(apielement.id);
                            }
                        });
                    });
                }
                _this.foodItems = eventData_1.event_food_type[0].food_type.filter(function (food) { return food.name.trim() !== ''; });
                var cusine_name_ids_1 = [];
                if (eventData_1.event_food_type[0].cusine_food) {
                    eventData_1.event_food_type[0].cusine_food.forEach(function (element) {
                        _this.dataservice.cusines_items.forEach(function (apielement) {
                            if (element.id === apielement.id) {
                                cusine_name_ids_1.push(apielement.id);
                            }
                        });
                    });
                }
                var multi_food = eventData_1.event_food_type[0].extra_food;
                if (multi_food && multi_food.length > 0) {
                    var formArray_1 = _this.ionicForm.get('food_section');
                    formArray_1.clear();
                    multi_food.forEach(function (mulfood) {
                        formArray_1.push(_this.formBuilder.group({
                            extra_food_name: mulfood.extra_food_name
                        }));
                    });
                }
                var multi_drinks = eventData_1.event_food_type[0].drink;
                if (multi_drinks && multi_drinks.length > 0) {
                    var formArray_2 = _this.ionicForm.get('drink_section');
                    formArray_2.clear();
                    multi_drinks.forEach(function (mulfood) {
                        formArray_2.push(_this.formBuilder.group({
                            drinks_name: mulfood.drinks_name
                        }));
                    });
                }
                //Handle event dates
                var eventDates = eventData_1.event_dates;
                if (eventDates && eventDates.length > 0) {
                    var formArray_3 = _this.ionicForm.get('event_dates');
                    formArray_3.clear();
                    eventDates.forEach(function (date) {
                        formArray_3.push(_this.formBuilder.group({
                            event_date: date.event_date,
                            start_time: date.start_time,
                            end_time: date.end_time
                        }));
                    });
                }
                _this.ionicForm.patchValue({
                    food_name: food_name_ids_1
                });
                _this.ionicForm.patchValue({
                    cuisine_name: cusine_name_ids_1
                });
                // Handle venue location
                _this.ionicForm.patchValue({
                    location_name: eventData_1.event_venues
                });
                // Handle activity data
                var eventActivities = eventData_1.event_activities;
                if (eventActivities && eventActivities.length > 0) {
                    var formArray_4 = _this.ionicForm.get('event_activities');
                    formArray_4.clear();
                    eventActivities.forEach(function (activity) {
                        formArray_4.push(_this.formBuilder.group({
                            activity_name: activity.activity_name,
                            activity_details: activity.activity_details
                        }));
                    });
                }
                _this.tempActivities = eventActivities.filter(function (activity) { return activity.activity_name.trim() !== ''; });
                // Handle contact data
                var eventEmergency = eventData_1.emergency_contact;
                if (eventEmergency && eventEmergency.length > 0) {
                    var formArray_5 = _this.ionicForm.get('emergency_contact');
                    formArray_5.clear();
                    eventEmergency.forEach(function (contact) {
                        formArray_5.push(_this.formBuilder.group({
                            contact_name: contact.contact_name,
                            contact_role: contact.contact_role,
                            contact_number: contact.contact_number
                        }));
                    });
                }
                if (eventData_1.price != 'Free Event') {
                    console.log("Paiddd..............");
                    _this.isPaidEvent = true;
                    _this.ionicForm.patchValue({
                        price: eventData_1.price,
                        isPaidEvent: true
                    });
                }
                _this.tempEmergencyContact = eventEmergency.filter(function (econtact) { return econtact.contact_name.trim() !== '' && econtact.contact_number.trim() !== ''; });
                var eventpoll = eventData_1.poll_section;
                if (eventpoll && eventpoll.length > 0) {
                    var formArray_6 = _this.ionicForm.get('poll_section');
                    formArray_6.clear();
                    eventpoll.forEach(function (poll) {
                        formArray_6.push(_this.formBuilder.group({
                            poll_question: poll.poll_question,
                            poll_option1: poll.poll_option1,
                            poll_option2: poll.poll_option2,
                            poll_option3: poll.poll_option3,
                            poll_option4: poll.poll_option4
                        }));
                    });
                }
                _this.tempoll = eventpoll.filter(function (poll) { return poll.poll_question.trim() !== '' && poll.poll_option1.trim() !== ''; });
                _this.PremenuImg = eventData_1.menu_img_filename.map(function (item) { return item.img; });
                _this.dataservice.prev_orginalImage = eventData_1.original_event_images;
                _this.dataservice.previous_img = eventData_1.event_images;
                console.log("This is Image:", _this.imageUrls);
            }
            else {
                _this.common.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Message");
        });
    };
    __decorate([
        core_1.ViewChild('moreBar')
    ], EditPaidEventPage.prototype, "moreBar");
    __decorate([
        core_1.ViewChild(angular_1.IonTextarea)
    ], EditPaidEventPage.prototype, "textarea");
    EditPaidEventPage = __decorate([
        core_1.Component({
            selector: 'app-edit-paid-event',
            templateUrl: './edit-paid-event.page.html',
            styleUrls: ['./edit-paid-event.page.scss']
        })
    ], EditPaidEventPage);
    return EditPaidEventPage;
}());
exports.EditPaidEventPage = EditPaidEventPage;
