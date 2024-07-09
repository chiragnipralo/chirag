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
exports.PremiumCommunityDetailsPage = void 0;
var core_1 = require("@angular/core");
var share_1 = require("@capacitor/share");
var community_member_page_1 = require("../community-member/community-member.page");
var add_obitury_page_1 = require("../add-obitury/add-obitury.page");
var PremiumCommunityDetailsPage = /** @class */ (function () {
    function PremiumCommunityDetailsPage(alertController, sanitizer, commonservice, dataservice, modalController, popoverController, _route, mapmodal, chatconnect, _router, navCtrl, router, datePipe, location) {
        this.alertController = alertController;
        this.sanitizer = sanitizer;
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this.modalController = modalController;
        this.popoverController = popoverController;
        this._route = _route;
        this.mapmodal = mapmodal;
        this.chatconnect = chatconnect;
        this._router = _router;
        this.navCtrl = navCtrl;
        this.router = router;
        this.datePipe = datePipe;
        this.location = location;
        this.events_data = [];
        this.filterData = [];
        this.count = 0;
        this.is_user_joining = false;
        this.fileName = '';
        this.fileAdminName = '';
        this.jData = [];
        this.messages = [];
        this.message = '';
        this.selectedFileName = '';
        this.selectedAdminFile = null;
        this.segment = 0;
    }
    PremiumCommunityDetailsPage.prototype.segmentChanged = function () {
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
    PremiumCommunityDetailsPage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            console.log("Current index: " + index);
            _this.segment = index;
        });
    };
    PremiumCommunityDetailsPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    PremiumCommunityDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PremiumCommunityDetailsPage.prototype.Viewmember = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var alert, modal;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(((_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.member_details) == 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Locked',
                                message: 'You Cannot see community Members!!',
                                buttons: [
                                    {
                                        text: 'Dismiss',
                                        role: 'cancel',
                                        cssClass: 'secondary'
                                    },
                                ]
                            })];
                    case 1:
                        alert = _c.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        this.dataservice.community_member = (_b = this.dataservice) === null || _b === void 0 ? void 0 : _b.user_community_data;
                        this.dataservice.is_premium = 1;
                        this.dataservice.community_type = 2;
                        console.log(this.dataservice.community_member);
                        return [4 /*yield*/, this.modalController.create({
                                component: community_member_page_1.CommunityMemberPage,
                                cssClass: 'pindialog-container',
                                handle: true,
                                componentProps: {
                                    is_modal: true
                                }
                            })];
                    case 4:
                        modal = _c.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log("DATA HERE --->", data);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PremiumCommunityDetailsPage.prototype.Share_Event = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, share_1.Share.share({
                            title: 'Commmunity Link',
                            text: 'Join!!',
                            url: (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.community_url,
                            dialogTitle: 'Share with buddies'
                        })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PremiumCommunityDetailsPage.prototype.community_post = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.router.navigate(['/community-post', { community_id: this.dataservice.user_community_data.id }]);
            popover.dismiss();
        }
    };
    PremiumCommunityDetailsPage.prototype.community_events = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            var navigationExtras = {
                queryParams: {
                    value: 1
                }
            };
            this.dataservice.user_community_data = this.dataservice.user_community_data;
            console.log(this.dataservice.user_community_data);
            this._router.navigate(['/community-event'], navigationExtras);
            popover.dismiss();
        }
    };
    PremiumCommunityDetailsPage.prototype.All_community = function () {
        var _this = this;
        var _a, _b;
        console.log("This Is Admin Post ==> ", (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.admin_post);
        console.log("This Is Timeline Post ==> ", (_b = this.dataservice) === null || _b === void 0 ? void 0 : _b.user_community_data.community_timeline);
        this.commonservice.show();
        var apidata = {
            premium: 1,
            user_token: this.dataservice.getUserData(),
            type: this.dataservice.user_community_data.type,
            community_id: this.dataservice.user_community_data.id
        };
        this.chatconnect.postData(apidata, "view_community_by_id").then(function (result) {
            var _a, _b;
            _this.commonservice.hide();
            console.log("This is result", result);
            if (result.Response.status == 1) {
                _this.dataservice.setCommunityData(result.Response.community_data);
                _this.formatDescription((_b = (_a = _this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data) === null || _b === void 0 ? void 0 : _b.community_description);
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    PremiumCommunityDetailsPage.prototype.formatDescription = function (description) {
        var convertedDescription = description.replace(/\r\n/g, '<br>');
        this.communityDescription = this.sanitizer.bypassSecurityTrustHtml(convertedDescription);
    };
    PremiumCommunityDetailsPage.prototype.join_community = function () {
        var _this = this;
        this.commonservice.show("Please Wait");
        var apidata = {
            user_token: this.dataservice.getUserData(),
            community_id: this.dataservice.user_community_data.id,
            premium: 1
        };
        console.log(apidata);
        this.chatconnect.postData(apidata, "join_community").then(function (result) {
            _this.commonservice.hide();
            console.log(result);
            if (result.Response.status == 1) {
                //this.modalController.dismiss();
                _this.location.back();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    PremiumCommunityDetailsPage.prototype.onFileSelectedAdminPost = function (event) {
        var _a;
        this.selectedAdminFile = event.target.files[0];
        this.fileAdminName = ((_a = this.selectedAdminFile) === null || _a === void 0 ? void 0 : _a.name) || '';
    };
    PremiumCommunityDetailsPage.prototype.onFileSelected = function (event) {
        var fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                this.fileName = this.selectedFile.name;
                this.selectedFileName = fileInput.files[0].name;
            }
        }
    };
    PremiumCommunityDetailsPage.prototype.adminPost = function () {
        var _this = this;
        var _a;
        if (!this.message && !this.selectedAdminFile) {
            return;
        }
        var userToken = this.dataservice.getUserData();
        var formData = new FormData();
        if (userToken !== null) {
            formData.append('user_token', userToken);
        }
        formData.append('community_id', (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.id);
        if (this.selectedAdminFile) {
            var isImage = this.selectedAdminFile.type.startsWith('image/');
            if (isImage) {
                formData.append('community_images', this.selectedAdminFile, this.selectedAdminFile.name);
            }
        }
        if (this.message) {
            formData.append('message', this.message);
        }
        formData.append('community_type', "2");
        this.chatconnect.postFormData(formData, 'community_admin_post').then(function (result) {
            console.log(result);
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
            _this.ngOnInit();
        }, function (err) {
            console.error(err);
            _this.selectedAdminFile = null;
            _this.fileAdminName = '';
        });
        this.message = '';
    };
    PremiumCommunityDetailsPage.prototype.delete_timeline = function (params, params1) {
        var _this = this;
        var popover = document.querySelector('ion-popover');
        if (popover) {
            var apidata = {
                user_token: this.dataservice.getUserData(),
                community_id: this.dataservice.user_community_data.id,
                member_id: params,
                row_id: params1,
                command: "delete",
                premium: 1,
                command_Type: "timeline"
            };
            this.chatconnect.postData(apidata, "verify_member").then(function (result) {
                if (result.Response.status == 1) {
                    _this.commonservice.presentToast("", result.Response.message);
                    _this.ngOnInit();
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
            });
            popover.dismiss();
        }
    };
    PremiumCommunityDetailsPage.prototype.timelinePost = function () {
        var _this = this;
        var _a, _b, _c;
        if (!this.message && !this.selectedFile) {
            return;
        }
        var userToken = this.dataservice.getUserData();
        var formData = new FormData();
        if (userToken !== null) {
            formData.append('user_token', userToken);
        }
        formData.append('community_id', (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.id);
        formData.append('isadmin', ((_b = this.dataservice) === null || _b === void 0 ? void 0 : _b.user_community_data.same_user_created_community) ? '1' : '0');
        formData.append('status', '1');
        if (this.selectedFile) {
            var isImage = this.selectedFile.type.startsWith('image/');
            if (isImage) {
                formData.append('post_images', this.selectedFile, this.selectedFile.name);
            }
        }
        if (this.message) {
            formData.append('message', this.message);
        }
        formData.append('community_type', (_c = this.dataservice) === null || _c === void 0 ? void 0 : _c.user_community_data.type);
        this.chatconnect.postFormData(formData, 'community_timelime').then(function (result) {
            console.log(result);
            _this.selectedFile = undefined;
            _this.selectedFileName = '';
            console.log("Timeline Post", _this.selectedFile);
            _this.fileName = '';
            if (_this.message) {
                var message = {
                    text: _this.message,
                    time: new Date(),
                    sender: 'admin'
                };
                _this.messages.push(message);
                _this.messages.sort(function (a, b) { return a.time.getTime() - b.time.getTime(); });
            }
            _this.ngOnInit();
        }, function (err) {
            console.error(err);
            _this.selectedFile = undefined;
            _this.fileName = '';
        });
        this.message = '';
    };
    PremiumCommunityDetailsPage.prototype.All_events = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            community_id: this.dataservice.user_community_data.id,
            premium: '1'
        };
        console.log("This is API Data ==> ", apidata);
        this.chatconnect.postData(apidata, "view_event_by_community_id").then(function (result) {
            // this.commonservice.hide();
            console.log(result);
            if (result.Response.status == 1) {
                _this.events_data = result.Response.events_data;
                _this.filterData = _this.events_data;
                console.log("This is Result ==> ", result);
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    PremiumCommunityDetailsPage.prototype.view_details = function (params) {
        console.log("This Is Event Details ==> ", params);
        this.dataservice.setEventData(params);
        this._router.navigate(['/event-details']);
        console.log("IF premium");
    };
    PremiumCommunityDetailsPage.prototype.leave_community = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popover, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        popover = document.querySelector('ion-popover');
                        if (!popover) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirm',
                                message: 'Are you sure you want to Leave this community?',
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
                                                community_id: _this.dataservice.user_community_data.id,
                                                premium: 1
                                            };
                                            _this.chatconnect.postData(apidata, "exit_community").then(function (result) {
                                                if (result.Response.status == 1) {
                                                    _this._router.navigate(['tabs/dashboard']);
                                                    _this.commonservice.presentToast("", result.Response.message);
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
                        popover.dismiss();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PremiumCommunityDetailsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ngOnInit");
                        return [4 /*yield*/, this.All_community()];
                    case 1:
                        _a.sent();
                        this.All_events();
                        return [2 /*return*/];
                }
            });
        });
    };
    PremiumCommunityDetailsPage.prototype.add_obituary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_obitury_page_1.AddObituryPage,
                            cssClass: 'pindialog-container',
                            handle: true,
                            componentProps: {
                                is_modal: true,
                                community_id: this.dataservice.user_community_data.id
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
    PremiumCommunityDetailsPage.prototype.getFormattedDate = function (eventDate) {
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
    ], PremiumCommunityDetailsPage.prototype, "slider");
    PremiumCommunityDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-premium-community-details',
            templateUrl: './premium-community-details.page.html',
            styleUrls: ['./premium-community-details.page.scss']
        })
    ], PremiumCommunityDetailsPage);
    return PremiumCommunityDetailsPage;
}());
exports.PremiumCommunityDetailsPage = PremiumCommunityDetailsPage;
