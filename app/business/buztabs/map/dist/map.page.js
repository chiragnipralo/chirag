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
exports.MapPage = void 0;
var guest_list_page_1 = require("src/app/pages/guest-list/guest-list.page");
var core_1 = require("@angular/core");
var MapPage = /** @class */ (function () {
    function MapPage(commonservice, _router, modalController, dataservice, chatconnect, activatedRoute, datePipe, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.modalController = modalController;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.activatedRoute = activatedRoute;
        this.datePipe = datePipe;
        this.alertController = alertController;
        this.manage_events = [];
        this.my_completed_events = [];
        this.my_cancel_events = [];
        this.my_upcoming_events = [];
        this.events_data = [];
        this.my_draft_events = [];
        this.segment = 0;
        this.handlerMessage = '';
        this.event_seg = "create";
    }
    MapPage.prototype.segmentChanged = function () {
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
    MapPage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            _this.segment = index;
        });
    };
    MapPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    MapPage.prototype.deleteconfirm = function () {
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
    MapPage.prototype.add_staff = function (params) {
        this.dataservice.staff_data = params;
        this._router.navigate(['events/add-staff', { event_type: 'paid_event' }]);
    };
    MapPage.prototype.GetUserEvents = function () {
        var _this = this;
        var id = this.dataservice.GetAccountuser();
        var apidata = {
            user_token: this.dataservice.getUserData(),
            account_id: id
        };
        this.chatconnect.postData(apidata, "paid_user_dashboard").then(function (result) {
            if (result.Response.status == 1) {
                _this.my_completed_events = result.Response.my_completed_events;
                _this.my_cancel_events = result.Response.my_cancel_events;
                _this.my_upcoming_events = result.Response.my_upcoming_events;
                _this.my_draft_events = result.Response.my_draft_events;
                _this.user_data = result.Response.user_data;
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    MapPage.prototype.view_details = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataservice.events_guests = params;
                        console.log(this.dataservice.events_guests);
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
                            console.log("DATA HERE --->", data);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MapPage.prototype.presentAlertFeedback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Send Review',
                            buttons: [{
                                    text: 'Send',
                                    cssClass: 'alert-button-get'
                                }
                            ],
                            inputs: [
                                {
                                    type: 'textarea',
                                    placeholder: 'Type here'
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
    MapPage.prototype.view_detailss = function (params) {
        this.dataservice.user_event_data = params;
        this._router.navigate(['/event-details']);
    };
    MapPage.prototype.edit_details = function (params) {
        this.dataservice.user_event_data = params;
        this._router.navigate(['/edit-paid-event']);
    };
    MapPage.prototype.GetUserAccount = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "show_account").then(function (result) {
            console.log(result);
            if (result.Response.status == 1) {
                _this.events_data = result.Response.my_paid_account;
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    MapPage.prototype.view_account = function (params) {
        this.dataservice.setAccountuser(params);
        this.modalController.dismiss();
        this._router.navigate(['/buztabs/map']);
    };
    MapPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.GetUserEvents();
        this.GetUserAccount();
        console.log("This is Account IDD ==> ", this.dataservice.GetAccountuser());
        this.activatedRoute.url.subscribe(function () {
            console.log('Refreshing page...');
            _this.GetUserEvents();
        });
    };
    MapPage.prototype.editProfile = function () {
        this._router.navigate(['/edit-profile']);
    };
    MapPage.prototype.CreateEvent = function () {
        console.log("create");
        this._router.navigate(['/create-event']);
    };
    MapPage.prototype.formatTime = function (time) {
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
    MapPage.prototype.getCityFromEvent = function (eventVenues) {
        var city = eventVenues.split(',')[0].trim();
        return city;
    };
    MapPage.prototype.getFormattedDate = function (eventDate) {
        var date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
            var formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
            return formattedDate || '';
        }
        else {
            return '';
        }
    };
    __decorate([
        core_1.ViewChild('slider', { static: true })
    ], MapPage.prototype, "slider");
    MapPage = __decorate([
        core_1.Component({
            selector: 'app-map',
            templateUrl: './map.page.html',
            styleUrls: ['./map.page.scss']
        })
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
