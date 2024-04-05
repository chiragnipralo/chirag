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
exports.ViewstatsPage = void 0;
var core_1 = require("@angular/core");
var ticketlist_page_1 = require("../ticketlist/ticketlist.page");
var ViewstatsPage = /** @class */ (function () {
    function ViewstatsPage(commonservice, _router, modalCtrl, dataservice, loadingController, navParams, modalController, chatconnect, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.modalCtrl = modalCtrl;
        this.dataservice = dataservice;
        this.loadingController = loadingController;
        this.navParams = navParams;
        this.modalController = modalController;
        this.chatconnect = chatconnect;
        this.alertController = alertController;
        this.all_guests = [];
        this.invited_guests = [];
        this.coming_guests = [];
        this.attendees_guests = [];
        this.invite_acceptance_pending_guests = [];
        this.event_food_type = [];
        this.event_male_user = [];
        this.poll_section = [];
        this.foodCount = [];
        this.is_modal_open = false;
        this.isModalInvitedModalOpen = false;
        this.isModalComingModalOpen = false;
        this.isModalAttendeesModalOpen = false;
        this.isModalMaleModalOpen = false;
        this.isModalFemaleModalOpen = false;
    }
    ViewstatsPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    ViewstatsPage.prototype.setOpenInvitedModal = function (isOpen) {
        this.isModalInvitedModalOpen = isOpen;
    };
    ViewstatsPage.prototype.onInviteWillDismiss = function (event) {
        this.isModalInvitedModalOpen = false;
    };
    ViewstatsPage.prototype.setOpenComingModal = function (isOpen) {
        this.isModalComingModalOpen = isOpen;
    };
    ViewstatsPage.prototype.onComingWillDismiss = function (event) {
        this.isModalComingModalOpen = false;
    };
    ViewstatsPage.prototype.setOpenAttendeesModal = function (isOpen) {
        this.isModalAttendeesModalOpen = isOpen;
    };
    ViewstatsPage.prototype.onAttendeesWillDismiss = function (event) {
        this.isModalAttendeesModalOpen = false;
    };
    ViewstatsPage.prototype.setOpenMaleModal = function (isOpen) {
        this.isModalMaleModalOpen = isOpen;
    };
    ViewstatsPage.prototype.onMaleWillDismiss = function (event) {
        this.isModalMaleModalOpen = false;
    };
    ViewstatsPage.prototype.setOpenFemaleModal = function (isOpen) {
        this.isModalFemaleModalOpen = isOpen;
    };
    ViewstatsPage.prototype.onFemaleWillDismiss = function (event) {
        this.isModalFemaleModalOpen = false;
    };
    ViewstatsPage.prototype.ngOnInit = function () {
        console.log("THIS IS DATA", this.dataservice.events_guests.is_premium);
        this.is_modal_open = true;
        this.coming_guests = this.dataservice.events_guests.users_coming;
        this.invited_guests = this.dataservice.events_guests.users_invited;
        this.attendees_guests = this.dataservice.events_guests.users_attendees;
        this.invite_acceptance_pending_guests = this.dataservice.events_guests.users_invite_acceptance_pending;
        this.event_food_type = this.dataservice.events_guests.event_food_type;
        this.event_male_user = this.dataservice.events_guests.usersGender;
        this.poll_section = this.dataservice.events_guests.poll_section_stats;
        this.foodCount = this.dataservice.events_guests.foodselected;
        console.log("User Comings ==>", this.coming_guests);
    };
    ViewstatsPage.prototype.getGuestCount = function (guests) {
        return guests ? guests.length : 0;
    };
    ViewstatsPage.prototype.getMaleCount = function () {
        var maleCount = 0;
        if (Array.isArray(this.coming_guests)) {
            this.coming_guests.forEach(function (guest) {
                if (guest && guest.gender && guest.gender === "Male") {
                    maleCount++;
                }
            });
        }
        return maleCount;
    };
    ViewstatsPage.prototype.getFemaleCount = function () {
        var femaleCount = 0;
        if (Array.isArray(this.coming_guests)) {
            this.coming_guests.forEach(function (guest) {
                if (guest && guest.gender && guest.gender === "Female") {
                    femaleCount++;
                }
            });
        }
        return femaleCount;
    };
    ViewstatsPage.prototype.ticketList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataservice.TicketList = Object.values(this.dataservice.events_guests.Ticketspayments);
                        console.log("PaymentList", this.dataservice.TicketList);
                        return [4 /*yield*/, this.modalController.create({
                                component: ticketlist_page_1.TicketlistPage,
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
    ViewstatsPage.prototype.getFoodCount = function (foodId) {
        if (!this.foodCount || this.foodCount.length === 0) {
            return 0;
        }
        var count = 0;
        this.foodCount.forEach(function (id) {
            if (id === foodId) {
                count++;
            }
        });
        return count;
    };
    ViewstatsPage.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IF Clicked");
                        return [4 /*yield*/, this.modalCtrl.dismiss({
                                'dismissed': true
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewstatsPage = __decorate([
        core_1.Component({
            selector: 'app-viewstats',
            templateUrl: './viewstats.page.html',
            styleUrls: ['./viewstats.page.scss']
        })
    ], ViewstatsPage);
    return ViewstatsPage;
}());
exports.ViewstatsPage = ViewstatsPage;
