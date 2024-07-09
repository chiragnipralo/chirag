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
exports.ContactPage = void 0;
var core_1 = require("@angular/core");
var contacts_1 = require("@capacitor-community/contacts");
var core_2 = require("@capacitor/core");
var success_page_1 = require("../success/success.page");
var ContactPage = /** @class */ (function () {
    function ContactPage(modalController, router, common, loadingController, chatconnect, navCtrl, dataservice, alertController) {
        this.modalController = modalController;
        this.router = router;
        this.common = common;
        this.loadingController = loadingController;
        this.chatconnect = chatconnect;
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.alertController = alertController;
        this.filterData = [];
        this.contacts = [];
        this.permissionGranted = false;
        this.totalCheckedCount = 0;
        this.contactss = [
            { checked: false },
            { checked: false },
        ];
        this.totalCheckedCount = this.contactss.filter(function (c) { return c.checked; }).length;
    }
    ContactPage.prototype.doRefresh = function (refresher) {
        this.getContacts();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    ContactPage.prototype.checkboxClick = function (event, contact) {
        contact.checked = !contact.checked;
        this.totalCheckedCount = contact.checked ? this.totalCheckedCount + 1 : this.totalCheckedCount - 1;
        this.dataservice.totalContactCount = this.totalCheckedCount;
    };
    ContactPage.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Allow 'Contact Access' to access your contacts while you are using the app",
                            buttons: [{
                                    text: "Don't Allow",
                                    cssClass: 'alert-button'
                                }, {
                                    text: 'Allow',
                                    cssClass: 'alert-button',
                                    handler: function () {
                                        _this.getPermissions();
                                    }
                                },]
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
    ContactPage.prototype.getPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var perm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!core_2.Capacitor.isNativePlatform()) return [3 /*break*/, 2];
                        return [4 /*yield*/, contacts_1.Contacts.requestPermissions()];
                    case 1:
                        perm = _a.sent();
                        return [2 /*return*/, {
                                granted: perm.contacts === "granted"
                            }];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ContactPage.prototype.ngOnInit = function () {
        var localStorageItem = localStorage.getItem('cust_contacts');
        if (localStorageItem !== null) {
            var retrievedObject = JSON.parse(localStorageItem);
            if (this.dataservice.ValidateArray(retrievedObject)) {
                this.filterData = retrievedObject;
                this.dataservice.all_contacts = retrievedObject;
                this.permissionGranted = true;
            }
        }
    };
    ContactPage.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss({
                            'dismissed': true
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactPage.prototype.GoNext = function () {
        this.SubmitEvent();
    };
    ContactPage.prototype.SubmitEvent = function () {
        var _this = this;
        var status;
        if (this.dataservice.all_contacts.filter(function (obj) { return obj.checked; }).length > 0) {
            status = 7; // for show of unpaid invite event
        }
        else {
            status = 0; //wating for approval
        }
        var userToken = this.dataservice.getUserData();
        this.common.show("Please wait, we are sending invites to your selected contact list...");
        var formData = new FormData();
        if (userToken !== null) {
            formData.append('user_token', userToken);
        }
        formData.append('eventFlag', this.dataservice.eventFlag);
        formData.append('payment_status', status.toString());
        formData.append('communityId', this.dataservice.communityId);
        formData.append('location', this.dataservice.locationn);
        formData.append('emergency_contact', this.dataservice.emergency_contact);
        formData.append('event_cusine_type', JSON.stringify(this.dataservice.event_cusine_type));
        formData.append('event_food_type', JSON.stringify(this.dataservice.event_food_type));
        formData.append('original_event_images', this.dataservice.orginalImage);
        var eventImages = localStorage.getItem('event_images');
        if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
            formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
        }
        this.dataservice.foodImages.forEach(function (file) {
            formData.append('menu_imgData[]', file);
        });
        formData.append('events_data', JSON.stringify(this.dataservice.events_form));
        formData.append('guest_contacts', JSON.stringify(this.dataservice.all_contacts.filter(function (obj) { return obj.checked; })));
        this.chatconnect.postFormData(formData, "create_event").then(function (result) {
            _this.common.hide();
            if (result.Response.status == 1) {
                localStorage.removeItem('event_images');
                localStorage.removeItem('menu_imgData');
                _this.closeModal();
                if (_this.dataservice.all_contacts.filter(function (obj) { return obj.checked; }).length > 0) {
                    _this.dataservice.user_event_data.id = result.Response.event_id;
                    _this.router.navigate(['/event-payment', { invite_type: "invite", type: "free_event" }]);
                    _this.dataservice.tokenUrl = result.Response.token_url;
                }
                else {
                    _this.dataservice.tokenUrl = result.Response.token_url;
                    _this.OpenSuccess(_this.dataservice.tokenUrl);
                }
            }
            else {
                _this.common.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            _this.common.hide();
            console.log("Connection failed Messge");
        });
    };
    ContactPage.prototype.OpenSuccess = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataservice.shareable_event_url = params;
                        return [4 /*yield*/, this.modalController.create({
                                component: success_page_1.SuccessPage,
                                cssClass: 'pindialog-container',
                                handle: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (data.data != undefined) {
                                if (_this.dataservice.shareable_event_url) {
                                    _this.closeModal();
                                    _this.navCtrl.navigateRoot('/tabs/dashboard');
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContactPage.prototype.filterItems = function (event) {
        if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
            this.filterData = this.dataservice.all_contacts.filter(function (st) {
                return (st.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1 || st.phone_number.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
            });
        }
        else {
        }
    };
    ContactPage.prototype.getContacts = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contacts_1.Contacts.requestPermissions().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (response.contacts == "granted") {
                                    this.permissionGranted = true;
                                    this.loadingController.create({
                                        spinner: 'lines',
                                        message: 'Retrieving your contacts. This may take some time. Please wait...',
                                        cssClass: 'custom-loading',
                                        backdropDismiss: false
                                    }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        var retrievedObject, projection;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    res.present();
                                                    retrievedObject = JSON.parse(localStorage.getItem('cust_contacts') || 'null');
                                                    if (!this.dataservice.ValidateArray(retrievedObject)) return [3 /*break*/, 2];
                                                    projection = {
                                                        name: true,
                                                        phones: true
                                                    };
                                                    return [4 /*yield*/, contacts_1.Contacts.getContacts({ projection: projection }).then(function (contacts) { return __awaiter(_this, void 0, void 0, function () {
                                                            var unique;
                                                            var _this = this;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, contacts.contacts.forEach(function (contact, idx) {
                                                                            if (contact.name) {
                                                                                if (contact.name.display) {
                                                                                    if (contact.phones) {
                                                                                        for (var y = 0; y < contact.phones.length; y++) {
                                                                                            if (contact.phones[y].number.length > 9) {
                                                                                                _this.contacts.push({ 'name': contact.name.display, 'phone_number': contact.phones[y].number.replace(/\D/g, '').slice(-10) });
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            _this.contacts.sort(function (a, b) { return _this.compareObjects(a, b, 'name'); });
                                                                        })];
                                                                    case 1:
                                                                        _a.sent();
                                                                        unique = [];
                                                                        this.contacts.forEach(function (x) {
                                                                            if (!unique.some(function (a) { return a.phone_number === x.phone_number; })) {
                                                                                unique.push(x);
                                                                            }
                                                                        });
                                                                        localStorage.setItem('cust_contacts', JSON.stringify(unique));
                                                                        this.dataservice.all_contacts = unique;
                                                                        this.filterData = unique;
                                                                        res.dismiss();
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })];
                                                case 1:
                                                    _a.sent();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    this.dataservice.all_contacts = retrievedObject;
                                                    this.filterData = retrievedObject;
                                                    res.dismiss();
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactPage.prototype.compareObjects = function (object1, object2, key) {
        var _a, _b;
        var obj1 = (_a = object1[key]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        var obj2 = (_b = object2[key]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
        if (obj1 < obj2) {
            return -1;
        }
        if (obj1 > obj2) {
            return 1;
        }
        return 0;
    };
    ContactPage = __decorate([
        core_1.Component({
            selector: 'app-contact',
            templateUrl: './contact.page.html',
            styleUrls: ['./contact.page.scss']
        })
    ], ContactPage);
    return ContactPage;
}());
exports.ContactPage = ContactPage;
