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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DetailsevePage = void 0;
var core_1 = require("@angular/core");
var map_activity_page_1 = require("src/app/events/map-activity/map-activity.page");
var share_1 = require("@capacitor/share");
var viewstats_page_1 = require("../viewstats/viewstats.page");
var image_modal_component_1 = require("../../components/image-modal/image-modal.component");
var DetailsevePage = /** @class */ (function () {
    function DetailsevePage(alertController, formBuilder, datePipe, sanitizer, commonservice, dataservice, modalController, popoverController, mapmodal, chatconnect, _router, navCtrl, platform, location) {
        this.alertController = alertController;
        this.formBuilder = formBuilder;
        this.datePipe = datePipe;
        this.sanitizer = sanitizer;
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this.modalController = modalController;
        this.popoverController = popoverController;
        this.mapmodal = mapmodal;
        this.chatconnect = chatconnect;
        this._router = _router;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.location = location;
        this.isSubmitted = false;
        this.count = 1;
        this.is_user_joining = false;
        this.fileName = '';
        this.fileAdminName = '';
        this.selectedFile = null;
        this.selectedAdminFile = null;
        this.jData = [];
        this.ImageData = [];
        this.messages = [];
        this.message = '';
        this.selectedFood = [];
        this.selectedPoll = [];
        this.MultiMenuImgs = [];
        this.isButtonEnabled = false;
        this.isModalOpen = false;
        this.user_data = [];
        this.segment = 0;
        this.isPopOpen = false;
        this.selectedOptionsMap = {};
    }
    DetailsevePage.prototype.presentPopover = function (e) {
        this.popover.event = e;
        this.isPopOpen = true;
    };
    DetailsevePage.prototype.setOpen = function (isOpen) {
        this.isModalOpen = isOpen;
    };
    DetailsevePage.prototype.onWillDismiss = function (event) {
        this.isModalOpen = false;
    };
    DetailsevePage.prototype.segmentChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.slider.slideTo(this.segment)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailsevePage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            _this.segment = index;
        });
    };
    DetailsevePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DetailsevePage.prototype.increment = function () {
        if (this.count < 7) {
            this.count++;
            this.addParticipant();
        }
    };
    DetailsevePage.prototype.decrement = function () {
        if (this.count > 1) {
            this.count--;
            this.removeParticipant(this.count - 1);
        }
    };
    DetailsevePage.prototype.checkMobileNumber = function (participant) {
        if (participant.mobileNumber === '1234567890') {
        }
        else {
        }
    };
    DetailsevePage.prototype.getDayFromDate = function (eventDate) {
        var date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
            var day = this.datePipe.transform(date, 'EEEE');
            return day || '';
        }
        else {
            return '';
        }
    };
    DetailsevePage.prototype.getFormattedDate = function (eventDate) {
        var date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
            var formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
            return formattedDate || '';
        }
        else {
            return '';
        }
    };
    DetailsevePage.prototype.formatTime = function (time) {
        var dummyDate = new Date();
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        var formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
        return formattedTime || time;
    };
    DetailsevePage.prototype.Viewguest = function () {
        var _a;
        this.dataservice.events_guests = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data;
        this._router.navigate(['guest-list']);
    };
    DetailsevePage.prototype.Viewstats = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dataservice.events_guests = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data;
                        return [4 /*yield*/, this.modalController.create({
                                component: viewstats_page_1.ViewstatsPage,
                                cssClass: 'pindialog-container',
                                handle: true,
                                componentProps: {
                                    is_modal: true
                                }
                            })];
                    case 1:
                        modal = _b.sent();
                        modal.onDidDismiss().then(function (data) {
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    DetailsevePage.prototype.ViewMapActivity = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dataservice.events_guests = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data;
                        return [4 /*yield*/, this.mapmodal.create({
                                component: map_activity_page_1.MapActivityPage,
                                cssClass: 'pindialog-container',
                                handle: true,
                                componentProps: {
                                    is_modal: true
                                }
                            })];
                    case 1:
                        modal = _b.sent();
                        modal.onDidDismiss().then(function (data) {
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    DetailsevePage.prototype.ticket = function (params) {
        var event_id = this.dataservice.user_event_data.id;
        var business = "free";
        this._router.navigate(['pages/ticket', { event_id: event_id, business: business }]);
        this.popoverController.dismiss();
    };
    DetailsevePage.prototype.Share_Event = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, share_1.Share.share({
                            title: 'Event Invitation Link',
                            text: this.user_data.user_name + " shared " + ((_b = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data) === null || _b === void 0 ? void 0 : _b.title) + " Event",
                            url: (_c = this.dataservice) === null || _c === void 0 ? void 0 : _c.user_event_data.event_url,
                            dialogTitle: 'Share with buddies'
                        })];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailsevePage.prototype.ngOnInit = function () {
        var _this = this;
        this.ionicForm = this.formBuilder.group({
            user_details: this.formBuilder.array([])
        });
        this.addParticipant();
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "user_profile").then(function (result) {
            _this.commonservice.hide();
            if (result.Response.status == 1) {
                if (result.Response.user_data) {
                    _this.dataservice.user_profile_data = result.Response.user_data[0];
                    _this.user_data = result.Response.user_data[0];
                }
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            _this.commonservice.hide();
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.addParticipant = function () {
        var user_infomration = this.formBuilder.group({
            user_info: [''],
            participent_name: [''],
            participent_number: [''],
            participent_gender: [''],
            food: ['']
        });
        this.getParticipantsArray.push(user_infomration);
    };
    DetailsevePage.prototype.removeParticipant = function (i) {
        this.getParticipantsArray.removeAt(i);
    };
    Object.defineProperty(DetailsevePage.prototype, "getParticipantsArray", {
        get: function () {
            return this.ionicForm.get('user_details');
        },
        enumerable: false,
        configurable: true
    });
    DetailsevePage.prototype.openModal = function (originalEventImages) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: image_modal_component_1.ImageModalComponent,
                            componentProps: {
                                originalEventImages: originalEventImages,
                                is_qr: false
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
    DetailsevePage.prototype.foodSelectionChanged = function (params, participantIndex) {
        var selectedFoodItem = params;
        var userDetailControl = this.getParticipantsArray.controls[participantIndex];
        if (userDetailControl) {
            var foodControl = userDetailControl.get('food');
            if (foodControl) {
                var currentFoodValue = foodControl.value;
                if (selectedFoodItem !== -1) {
                    var selectedFoodArray = currentFoodValue ? currentFoodValue.split(',') : [];
                    var index = selectedFoodArray.indexOf(selectedFoodItem.toString());
                    if (index === -1) {
                        selectedFoodArray.push(selectedFoodItem);
                    }
                    else {
                        selectedFoodArray.splice(index, 1);
                    }
                    var updatedFoodValue = selectedFoodArray.join(',');
                    userDetailControl.patchValue({ food: updatedFoodValue });
                }
                else {
                    console.log('Invalid food selection.');
                }
            }
            else {
                console.error('Food control is null for participant ' + participantIndex);
            }
        }
        else {
            console.error('User detail control is null for participant ' + participantIndex);
        }
    };
    DetailsevePage.prototype.ionViewDidEnter = function () {
        this.listReview();
        this.All_events();
    };
    DetailsevePage.prototype.All_events = function () {
        var _this = this;
        //this.commonservice.show();
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_data.id
        };
        this.chatconnect.postData(apidata, "view_events_by_id").then(function (result) {
            var _a, _b, _c;
            //this.commonservice.hide();
            if (result.Response.status == 1) {
                _this.dataservice.setEventData(result.Response.events_data);
                _this.MultiMenuImgs = result.Response.events_data.menu_img_filename;
                _this.loadMap();
                _this.checkConditionforlive();
                _this.formatDescription((_b = (_a = _this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data) === null || _b === void 0 ? void 0 : _b.description);
                _this.eventDate = new Date((_c = _this.dataservice) === null || _c === void 0 ? void 0 : _c.user_event_data.event_dates[0]['event_date']);
                _this.isEventDateValid();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.formatDescription = function (description) {
        var convertedDescription = description.replace(/\n/g, '<br>');
        this.EventDescription = this.sanitizer.bypassSecurityTrustHtml(convertedDescription);
    };
    DetailsevePage.prototype.isEventDateValid = function () {
        var currentDate = new Date();
        var isValid = this.eventDate > currentDate;
        return isValid;
    };
    DetailsevePage.prototype.loadMap = function () {
        var _this = this;
        var _a, _b;
        var coordinatesArray = JSON.parse(((_b = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data) === null || _b === void 0 ? void 0 : _b.maps_coordinates) || '[]');
        if (Array.isArray(coordinatesArray) && coordinatesArray.length > 0) {
            var firstCoordinate = coordinatesArray[0];
            var latitude = firstCoordinate.latitude;
            var longitude = firstCoordinate.longitude;
            var latlng = new google.maps.LatLng(latitude, longitude);
            var myOptions = {
                zoom: 10,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                // fullscreenControl: true,
                streetViewControl: false,
                draggable: false
            };
            this.map = new google.maps.Map(document.getElementById("map"), myOptions);
            var marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                title: "Marker Title"
            });
            console.log("ios", this.platform.is('ios'));
            var handleFullscreenChange = function () {
                var isFullscreen = document.fullscreenElement !== null;
                _this.map.setOptions({ draggable: isFullscreen });
            };
            // Add event listener for changes in fullscreen mode
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.addEventListener('mozfullscreenchange', handleFullscreenChange);
            document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        }
        else {
            console.error("No coordinates available or invalid data format.");
        }
    };
    DetailsevePage.prototype.checkConditionforlive = function () {
        var _a;
        var eventDates = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data.event_dates;
        if (eventDates && eventDates.length > 0) {
            var firstEventDate = eventDates[0]['event_date'];
            var eventTime = eventDates[0]['start_time'];
            var eventDateTimeString = firstEventDate + "T" + eventTime;
            var eventDateTime = new Date(eventDateTimeString);
            var currentDate = new Date();
            var eventEndTime = new Date(eventDateTime.getTime() - 30 * 60 * 1000);
            if (currentDate >= eventEndTime) {
                this.isButtonEnabled = true;
            }
        }
    };
    DetailsevePage.prototype.pollSelectionChanged = function (pollId, selectedOption) {
        this.selectedOptionsMap[pollId] = selectedOption;
        var foundIndex = this.selectedPoll.findIndex(function (entry) { return entry[0] === pollId && entry[1] === selectedOption; });
        if (foundIndex === -1) {
            this.selectedPoll.push([pollId, selectedOption]);
        }
        else {
            this.selectedPoll.splice(foundIndex, 1);
        }
    };
    DetailsevePage.prototype.validateForm = function () {
        var _a;
        var participantsArray = this.ionicForm.get('user_details');
        var firstParticipant = participantsArray.at(0);
        var duplicateNumber = (_a = this.dataservice.user_event_data) === null || _a === void 0 ? void 0 : _a.users_coming;
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
        var maxNumberLength = 10;
        var numericRegex = /^[0-9]+$/;
        var isValidNumber = !numericRegex.test(firstParticipant.value.participent_number);
        if (firstParticipant.value.user_info === 'other' && firstParticipant.value.participent_number && firstParticipant.value.participent_number.length !== maxNumberLength) {
            this.commonservice.presentToast('Error', 'Number should be ' + maxNumberLength + ' digits');
            return false;
        }
        if (firstParticipant.value.user_info === 'other' && isValidNumber && firstParticipant.value.participent_number) {
            this.commonservice.presentToast('Error', 'Number should only contain numeric characters');
            return false;
        }
        var uniqueUserNumbers = new Set(duplicateNumber.map(function (user) { return user.user_number; }));
        if (uniqueUserNumbers.has(firstParticipant.value.participent_number)) {
            this.commonservice.presentToast('Error', 'User already joined');
            return false;
        }
        for (var i = 1; i < participantsArray.length; i++) {
            var participant = participantsArray.at(i);
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
                this.commonservice.presentToast('Error', 'User already joined ' + (i + 1));
                return false;
            }
        }
        return true;
    };
    DetailsevePage.prototype.join_events = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userToken, formData;
            var _this = this;
            return __generator(this, function (_a) {
                this.isSubmitted = true;
                if (this.count == 0) {
                    this.commonservice.presentToast("Error", "Please Check Count..");
                }
                else if (!this.validateForm()) {
                    this.commonservice.presentToast("Error", "Please Fill filled");
                }
                else {
                    this.commonservice.show("Please Wait");
                    userToken = this.dataservice.getUserData();
                    formData = new FormData();
                    if (userToken) {
                        formData.append('user_token', userToken);
                    }
                    formData.append('event_id', this.dataservice.user_event_data.id);
                    formData.append('people_coming', this.count.toString());
                    formData.append('poll', JSON.stringify(this.selectedPoll));
                    formData.append('users_info', JSON.stringify(this.ionicForm.value));
                    this.chatconnect.postFormData(formData, "join_events").then(function (result) {
                        var _a;
                        _this.commonservice.hide();
                        if (result.Response.status == 1) {
                            _this.modalController.dismiss();
                            //this.location.back();
                            _this.dataservice.events_guests = (_a = _this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data;
                            _this._router.navigate(['guest-list']);
                            _this.commonservice.presentToast("", "Joined Successfully");
                        }
                        else {
                            _this.commonservice.presentToast("Oops", result.Response.message);
                        }
                    }, function (err) {
                        console.log("Connection failed Messge");
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    DetailsevePage.prototype.edit_details = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.dataservice.user_event_data = this.dataservice.user_event_data;
            this._router.navigate(['/edit-event']);
            popover.dismiss();
        }
        else {
            console.error('Popover element not found.');
        }
    };
    DetailsevePage.prototype.invite = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.dataservice.user_event_data = this.dataservice.user_event_data;
            this._router.navigate(['pages/reinvite', { type: "free_event" }]);
            popover.dismiss();
        }
        else {
            console.error('Popover element not found.');
        }
    };
    DetailsevePage.prototype.complete_event = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_data.id
        };
        this.chatconnect.postData(apidata, "complete_event").then(function (result) {
            if (result.Response.status == 1) {
                _this.popoverController.dismiss();
                _this.commonservice.presentToast("", result.Response.message);
                _this.location.back();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.live_event = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_data.id,
            type: "live"
        };
        this.chatconnect.postData(apidata, "live_or_stop_event").then(function (result) {
            if (result.Response.status == 1) {
                _this.popoverController.dismiss();
                _this.commonservice.presentToast("", result.Response.message);
                _this.ionViewDidEnter();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.stop_event = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_data.id,
            type: "stop"
        };
        this.chatconnect.postData(apidata, "live_or_stop_event").then(function (result) {
            if (result.Response.status == 1) {
                _this.popoverController.dismiss();
                _this.commonservice.presentToast("", result.Response.message);
                _this.ionViewDidEnter();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.delete_event = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this event?',
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
                                            event_id: _this.dataservice.user_event_data.id
                                        };
                                        _this.chatconnect.postData(apidata, "cancel_event").then(function (result) {
                                            if (result.Response.status == 1) {
                                                _this.popoverController.dismiss();
                                                _this.commonservice.presentToast("", result.Response.message);
                                                _this.location.back();
                                            }
                                            else {
                                                _this.commonservice.presentToast("Oops", result.Response.message);
                                            }
                                        }, function (err) {
                                            console.log("Connection failed Messge");
                                        });
                                    }
                                },
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
    DetailsevePage.prototype.report_block = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Report & Block',
                            message: 'Are you sure you want to report this event?',
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
                                            event_type: "free_event"
                                        };
                                        _this.chatconnect.postData(apidata, "report_block").then(function (result) {
                                            if (result.Response.status == 1) {
                                                _this.popoverController.dismiss();
                                                _this.commonservice.presentToast("", result.Response.message);
                                                _this.location.back();
                                            }
                                            else {
                                                _this.commonservice.presentToast("Oops", result.Response.message);
                                            }
                                        }, function (err) {
                                            console.log("Connection failed Messge");
                                        });
                                    }
                                },
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
    DetailsevePage.prototype.listReview = function () {
        var _this = this;
        var _a;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            event_id: (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data.id,
            type: 'free'
        };
        this.chatconnect.postData(apidata, "event_review").then(function (result) {
            _this.jData = result.Response.event_review;
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    DetailsevePage.prototype.sendMessage = function () {
        var _this = this;
        var _a;
        if (this.senderMsg === '') {
            var smsg = "Enter Some Message";
            this.commonservice.presentToast("Oops", smsg);
        }
        else {
            if (!this.jData) {
                this.jData = [];
            }
            //this.jData.push({ "request": "admin","user_name": "You", "review": this.senderMsg });
            var apidata = {
                user_token: this.dataservice.getUserData(),
                event_id: (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data.id,
                review: this.senderMsg,
                event_type: 1
            };
            this.chatconnect.postData(apidata, "event_feedback").then(function (result) {
                _this.ionViewDidEnter();
            }, function (err) {
            });
            this.senderMsg = '';
        }
    };
    DetailsevePage.prototype.onFileSelectedAdminPost = function (event) {
        var _a;
        this.selectedAdminFile = event.target.files[0];
        this.fileAdminName = ((_a = this.selectedAdminFile) === null || _a === void 0 ? void 0 : _a.name) || '';
    };
    DetailsevePage.prototype.onFileSelected = function (event) {
        var _a;
        this.selectedFile = event.target.files[0];
        this.fileName = ((_a = this.selectedFile) === null || _a === void 0 ? void 0 : _a.name) || '';
    };
    DetailsevePage.prototype.sendImage = function () {
        var _this = this;
        var _a;
        var userToken = this.dataservice.getUserData();
        var formData = new FormData();
        if (userToken) {
            formData.append('user_token', userToken);
        }
        formData.append('event_id', (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data.id);
        if (this.selectedFile) {
            formData.append('event_images', this.selectedFile, this.selectedFile.name);
        }
        formData.append('event_type', '1');
        this.chatconnect.postFormData(formData, "event_photos").then(function (result) {
            _this.commonservice.presentToast("", result.Response.message);
            _this.selectedFile = null;
            _this.fileName = '';
            _this.All_events();
        }, function (err) {
            console.error(err);
        });
    };
    DetailsevePage.prototype.sortedMessages = function (messages) {
        var sortedArray = __spreadArrays(messages);
        sortedArray.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
        return sortedArray;
    };
    DetailsevePage.prototype.adminPost = function () {
        var _this = this;
        var _a;
        if (!this.message && !this.selectedAdminFile) {
            return;
        }
        var userToken = this.dataservice.getUserData();
        var formData = new FormData();
        if (userToken) {
            formData.append('user_token', userToken);
        }
        formData.append('event_id', (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data.id);
        formData.append('type', 'free');
        if (this.selectedAdminFile) {
            var isImage = this.selectedAdminFile.type.startsWith('image/');
            if (isImage && this.selectedAdminFile) {
                formData.append('event_images', this.selectedAdminFile, this.selectedAdminFile.name);
            }
            else {
                formData.append('event_images', '');
            }
        }
        if (this.message) {
            formData.append('message', this.message);
        }
        formData.append('event_flag', '1');
        this.chatconnect.postFormData(formData, 'admin_post').then(function (result) {
            _this.selectedAdminFile = null;
            _this.fileAdminName = '';
            if (_this.message) {
                var message = {
                    text: _this.message,
                    time: new Date(),
                    sender: 'admin'
                };
                _this.messages.push(message);
                _this.messages.sort(function (a, b) { return a.time.getTime() - b.time.getTime(); });
            }
            _this.All_events();
        }, function (err) {
            console.error(err);
            _this.fileAdminName = '';
        });
        this.message = '';
    };
    DetailsevePage.prototype.add_staff = function () {
        var _a;
        this.dataservice.staff_data = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_event_data;
        this._router.navigate(['events/add-staff', { event_type: "free_event" }]);
        this.popoverController.dismiss();
    };
    DetailsevePage.prototype.deleteMessage = function (params, params1) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this post?',
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
                                            member_id: params,
                                            row_id: params1,
                                            command: "admin_post",
                                            premium: 0,
                                            command_Type: "delete"
                                        };
                                        _this.chatconnect.postData(apidata, "event_operations").then(function (result) {
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
    DetailsevePage.prototype.deleteEventPhotos = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this Photo?',
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
                                            command: "event_photos",
                                            premium: 0,
                                            command_Type: "delete"
                                        };
                                        _this.chatconnect.postData(apidata, "event_operations").then(function (result) {
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
    DetailsevePage.prototype.deleteEventReviews = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this Review?',
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
                                            command: "event_review",
                                            premium: 0,
                                            command_Type: "delete"
                                        };
                                        _this.chatconnect.postData(apidata, "event_operations").then(function (result) {
                                            if (result.Response.status == 1) {
                                                _this.commonservice.presentToast("", result.Response.message);
                                                _this.ionViewDidEnter();
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
    DetailsevePage.prototype.formatIndianDate = function (dateString) {
        if (!dateString) {
            return '';
        }
        var options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Kolkata'
        };
        var indianDate = new Date(dateString).toLocaleString('en-IN', options);
        return indianDate;
    };
    DetailsevePage.prototype.dismissPopover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.getTop()];
                    case 1:
                        popover = _a.sent();
                        if (!popover) return [3 /*break*/, 3];
                        return [4 /*yield*/, popover.dismiss()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('slider', { static: true })
    ], DetailsevePage.prototype, "slider");
    __decorate([
        core_1.ViewChild('map', { static: false })
    ], DetailsevePage.prototype, "mapElement");
    __decorate([
        core_1.ViewChild('popover', { static: false })
    ], DetailsevePage.prototype, "popover");
    DetailsevePage = __decorate([
        core_1.Component({
            selector: 'app-detailseve',
            templateUrl: './detailseve.page.html',
            styleUrls: ['./detailseve.page.scss']
        })
    ], DetailsevePage);
    return DetailsevePage;
}());
exports.DetailsevePage = DetailsevePage;
