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
exports.MyeventPage = void 0;
var guest_list_page_1 = require("src/app/pages/guest-list/guest-list.page");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var capacitor_razorpay_1 = require("capacitor-razorpay");
var MyeventPage = /** @class */ (function () {
    function MyeventPage(commonservice, _router, router, navCtrl, modalController, dataservice, _route, chatconnect, datePipe, alertController) {
        var _this = this;
        this.commonservice = commonservice;
        this._router = _router;
        this.router = router;
        this.navCtrl = navCtrl;
        this.modalController = modalController;
        this.dataservice = dataservice;
        this._route = _route;
        this.chatconnect = chatconnect;
        this.datePipe = datePipe;
        this.alertController = alertController;
        this.manage_events = [];
        this.multiEvents = [];
        this.pending_payment_events = [];
        this.my_completed_events = [];
        this.my_draft_events = [];
        this.my_cancel_events = [];
        this.my_joined_events = [];
        this.invited_event = [];
        this.joined_completed_events = [];
        this.joined_cancel_events = [];
        this.upcoming_invited_event = [];
        this.completed_invited_event = [];
        this.my_upcoming_events = [];
        this.segment_one = 0;
        //razor_key: string = 'rzp_test_Gfm35q8J327oH6';
        this.razor_key = 'rzp_live_G3jYxHdfoo5gQR';
        this.currency = 'INR';
        this.handlerMessage = '';
        var segment = this._route.snapshot.params['segment_type'];
        if (!segment) {
            segment = "1";
            var apidata = {
                user_token: this.dataservice.getUserData()
            };
            this.chatconnect.postData(apidata, "user_profile").then(function (result) {
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
                console.log("Connection failed Messge");
            });
        }
        console.log("This is Selected", segment);
        this.event_seg = "create";
    }
    MyeventPage.prototype.doRefresh = function (refresher) {
        //this.ngOnInit();
        this.GetUserEvents();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    MyeventPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.slider) {
            this.slider.slideTo(this.segment_one);
            this.slider.ionSlideDidChange.subscribe(function () {
                _this.slideChanged();
            });
        }
    };
    MyeventPage.prototype.segmentChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.slider) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.slider.slideTo(this.segment_one)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MyeventPage.prototype.isManinsegmentChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.slider) {
                    this.slider.slideTo(0);
                    this.segment_one = 0;
                    this.slider.ionSlideDidChange.subscribe(function () {
                        _this.slideChanged();
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    MyeventPage.prototype.slideChanged = function () {
        var _this = this;
        if (this.slider) {
            this.slider.getActiveIndex().then(function (index) {
                _this.segment_one = index;
            });
        }
    };
    MyeventPage.prototype.deleteconfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Are You Sure!!',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    role: 'confirm'
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
    MyeventPage.prototype.add_staff = function (params) {
        this.dataservice.staff_data = params;
        this._router.navigate(['events/add-staff']);
    };
    MyeventPage.prototype.ionViewDidEnter = function () {
        this.GetUserEvents();
    };
    MyeventPage.prototype.ngOnInit = function () {
    };
    MyeventPage.prototype.GetUserEvents = function () {
        var _this = this;
        this.commonservice.show();
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "filter_events").then(function (result) {
            _this.commonservice.hide();
            console.log(result);
            if (result.Response.status == 1) {
                _this.multiEvents = result.Response.my_multiple_events;
                _this.pending_payment_events = result.Response.pending_payment_events;
                _this.my_upcoming_events = result.Response.my_upcoming_events;
                _this.my_completed_events = result.Response.my_completed_events;
                _this.my_draft_events = result.Response.my_draft_events;
                _this.my_cancel_events = result.Response.my_cancel_events;
                _this.invited_event = result.Response.invited_event;
                _this.my_joined_events = result.Response.my_joined_events;
                _this.joined_completed_events = result.Response.joined_completed_events;
                _this.joined_cancel_events = result.Response.joined_cancel_events;
                _this.upcoming_invited_event = result.Response.upcoming_invited_event;
                _this.completed_invited_event = result.Response.completed_invited_event;
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    MyeventPage.prototype.multievent_details = function (params) {
        if (params.event_flag === 3) {
            this._router.navigate(['pages/multieventdetails', { multievent_id: params.id }]);
        }
    };
    MyeventPage.prototype.view_details = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataservice.events_guests = params;
                        return [4 /*yield*/, this.modalController.create({
                                component: guest_list_page_1.GuestListPage,
                                cssClass: 'pindialog-container',
                                handle: true,
                                componentProps: {
                                    is_modal: true
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyeventPage.prototype.presentAlertFeedback = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['/pages/feedback']);
                return [2 /*return*/];
            });
        });
    };
    MyeventPage.prototype.view_detailss = function (params) {
        this.dataservice.user_event_data = params;
        //this.dataservice.setEventData(params);
        if (!params.is_premium) {
            this._router.navigate(['/detailseve']);
        }
        else {
            this._router.navigate(['/event-details']);
        }
    };
    MyeventPage.prototype.edit_details = function (params, draft_event) {
        this.dataservice.user_event_data = params;
        this._router.navigate(['/edit-event', { event_draft: draft_event }]);
    };
    MyeventPage.prototype.payNow = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Pay Now',
                            message: "Pay " + params.length + " for Event",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                },
                                {
                                    text: 'Pay Now',
                                    handler: function () {
                                        var UserCheckout = {
                                            "contact_person": _this.user_data['user_name'],
                                            "contact_number": _this.user_data['mobile'],
                                            "user_token": _this.dataservice.getUserData(),
                                            "rp_payment_id": "",
                                            "retry_payment": 0,
                                            "method": 'Online',
                                            "amount": params.length,
                                            "products": id,
                                            "type": 'events_invite',
                                            "reason": 'events_invite',
                                            "duration": "",
                                            "start_date": "",
                                            "end_date": "",
                                            "action_type": 'sendSMS'
                                        };
                                        var options = {
                                            currency: _this.currency,
                                            key: _this.razor_key,
                                            amount: (params.length * 100).toString(),
                                            name: 'SoEasy',
                                            description: 'Genesis',
                                            image: 'https://soeasyapp.com/dashboard/img/soeasy.png',
                                            prefill: {
                                                email: _this.user_data['email'],
                                                contact: _this.user_data['mobile']
                                            },
                                            theme: {
                                                color: '#3399cc'
                                            }
                                        };
                                        try {
                                            capacitor_razorpay_1.Checkout.open(options).then(function (response) {
                                                UserCheckout['rp_payment_id'] = response.response['razorpay_payment_id'];
                                                _this.chatconnect.postData(UserCheckout, "checkout").then(function (result) {
                                                    if (result.Response.status == 1) {
                                                        _this.ionViewDidEnter();
                                                        _this.commonservice.presentToast("", "Payment Done Successfully");
                                                    }
                                                    else {
                                                        _this.commonservice.presentToast("Oops", result.Response.message);
                                                    }
                                                }, function (err) {
                                                    console.log("Connection failed Messge");
                                                });
                                            });
                                        }
                                        catch (error) {
                                            if (typeof error === 'string') {
                                                var errorObj = JSON.parse(error);
                                                _this.commonservice.show(errorObj.description);
                                            }
                                            else {
                                                console.error('Unhandled error:', error);
                                            }
                                        }
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
    MyeventPage.prototype.formatTime = function (time) {
        var isValidTimeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
        if (!isValidTimeFormat) {
            return time;
        }
        var dummyDate = new Date();
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        var formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
        return formattedTime || time;
    };
    MyeventPage.prototype.getCityFromEvent = function (eventVenues) {
        var city = eventVenues.split(',')[0].trim();
        return city;
    };
    MyeventPage.prototype.getFormattedDate = function (eventDate) {
        var date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
            var formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
            return formattedDate || '';
        }
        else {
            return '';
        }
    };
    MyeventPage.prototype.goBack = function () {
        this._router.navigate(['/tabs/home']);
    };
    __decorate([
        core_1.ViewChild('slider', { static: false })
    ], MyeventPage.prototype, "slider");
    MyeventPage = __decorate([
        core_1.Component({
            selector: 'app-myevent',
            templateUrl: './myevent.page.html',
            styleUrls: ['./myevent.page.scss'],
            animations: [
                animations_1.trigger('fadeIn', [
                    animations_1.state('void', animations_1.style({ opacity: 0 })),
                    animations_1.transition(':enter', [
                        animations_1.animate('1000ms ease', animations_1.style({ opacity: 1 })),
                    ]),
                ]),
            ]
        })
    ], MyeventPage);
    return MyeventPage;
}());
exports.MyeventPage = MyeventPage;
