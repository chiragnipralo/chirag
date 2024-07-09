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
exports.CommunityDetailsPage = void 0;
var core_1 = require("@angular/core");
var chat_page_1 = require("../../pages/chat/chat.page");
var share_1 = require("@capacitor/share");
var community_member_page_1 = require("../community-member/community-member.page");
var image_modal_component_1 = require("src/app/components/image-modal/image-modal.component");
var invited_member_page_1 = require("../invited-member/invited-member.page");
var CommunityDetailsPage = /** @class */ (function () {
    function CommunityDetailsPage(alertController, sanitizer, commonservice, dataservice, modalController, popoverController, _route, mapmodal, chatconnect, _router, navCtrl, router, datePipe, location) {
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
        this.selectedAdminFile = null;
        this.jData = [];
        this.messages = [];
        this.message = '';
        this.selectedFileName = '';
        this.messageStates = [];
        this.clickCount = 0;
        this.segment = 0;
        this.isOpen = false;
    }
    CommunityDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    CommunityDetailsPage.prototype.presentPopover = function (e) {
        this.popover.event = e;
        this.isOpen = true;
    };
    CommunityDetailsPage.prototype.onPopoverDismiss = function () {
        this.isOpen = false;
    };
    CommunityDetailsPage.prototype.segmentChanged = function () {
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
    CommunityDetailsPage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            _this.segment = index;
        });
    };
    CommunityDetailsPage.prototype.doRefresh = function (refresher) {
        this.ionViewDidEnter();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    CommunityDetailsPage.prototype.ngOnInit = function () {
        var _a, _b;
        if ((_b = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data) === null || _b === void 0 ? void 0 : _b.admin_post) {
            this.messageStates = this.dataservice.user_community_data.admin_post.map(function () { return ({
                showOptions: false
            }); });
        }
    };
    CommunityDetailsPage.prototype.ionViewDidEnter = function () {
        console.log("ionViewDidEnter");
        this.All_community();
        this.All_events();
    };
    CommunityDetailsPage.prototype.openModal = function (originalEventImages) {
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
    CommunityDetailsPage.prototype.toggleMessageOptions = function (index) {
        //this.messageStates[index].showOptions = !this.messageStates[index].showOptions;
    };
    CommunityDetailsPage.prototype.Viewmember = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dataservice.community_member = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data;
                        this.dataservice.is_premium = 0;
                        this.dataservice.community_type = 1;
                        return [4 /*yield*/, this.modalController.create({
                                component: community_member_page_1.CommunityMemberPage,
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
    CommunityDetailsPage.prototype.ViewInvites = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dataservice.community_member = (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data;
                        this.dataservice.is_premium = 0;
                        this.dataservice.community_type = 1;
                        return [4 /*yield*/, this.modalController.create({
                                component: invited_member_page_1.InvitedMemberPage,
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
    CommunityDetailsPage.prototype.Event_chats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: chat_page_1.ChatPage,
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
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommunityDetailsPage.prototype.Share_Event = function () {
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
    CommunityDetailsPage.prototype.delete_community = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.router.navigate(['/community-delete']);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.leave_community = function () {
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
                                                premium: 0
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
    CommunityDetailsPage.prototype.create_events = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            var navigationExtras = {
                queryParams: {
                    value1: 2,
                    value2: this.dataservice.user_community_data.id
                }
            };
            this._router.navigate(['events/create'], navigationExtras);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.edit_community = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.dataservice.user_community_data = this.dataservice.user_community_data;
            this._router.navigate(['/edit-community']);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.community_events = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            var navigationExtras = {
                queryParams: {
                    value: 0
                }
            };
            this.dataservice.user_community_data = this.dataservice.user_community_data;
            this._router.navigate(['/community-event'], navigationExtras);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.community_post = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.router.navigate(['/community-post']);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.All_community = function () {
        var _this = this;
        // this.commonservice.show();
        var apidata = {
            premium: 0,
            user_token: this.dataservice.getUserData(),
            type: this.dataservice.user_community_data.account_type,
            community_id: this.dataservice.user_community_data.id
        };
        this.chatconnect.postData(apidata, "view_community_by_id").then(function (result) {
            var _a, _b;
            // this.commonservice.hide();
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
    CommunityDetailsPage.prototype.formatDescription = function (description) {
        var convertedDescription = description.replace(/\r\n/g, '<br>');
        this.communityDescription = this.sanitizer.bypassSecurityTrustHtml(convertedDescription);
    };
    CommunityDetailsPage.prototype.join_community = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            community_id: this.dataservice.user_community_data.id,
            premium: 0
        };
        this.chatconnect.postData(apidata, "join_community").then(function (result) {
            if (result.Response.status == 1) {
                _this.modalController.dismiss();
                _this.commonservice.presentToast("", "Joined Successfully");
                _this.ionViewDidEnter();
                // this.location.back();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    CommunityDetailsPage.prototype.onFileSelectedAdminPost = function (event) {
        var _a;
        this.selectedAdminFile = event.target.files[0];
        this.fileAdminName = ((_a = this.selectedAdminFile) === null || _a === void 0 ? void 0 : _a.name) || '';
    };
    CommunityDetailsPage.prototype.onFileSelected = function (event) {
        var fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                this.fileName = this.selectedFile.name;
                this.selectedFileName = fileInput.files[0].name;
            }
        }
    };
    CommunityDetailsPage.prototype.adminPost = function () {
        var _this = this;
        var _a, _b;
        if (!this.message && !this.selectedAdminFile) {
            return;
        }
        var userToken = this.dataservice.getUserData();
        var formData = new FormData();
        if (userToken !== null) {
            formData.append('user_token', userToken);
        }
        formData.append('community_id', (_a = this.dataservice) === null || _a === void 0 ? void 0 : _a.user_community_data.id);
        formData.append('admiposttype', "free");
        if (this.selectedAdminFile) {
            var isImage = this.selectedAdminFile.type.startsWith('image/');
            if (isImage) {
                formData.append('community_images', this.selectedAdminFile, this.selectedAdminFile.name);
            }
        }
        if (this.message) {
            formData.append('message', this.message);
        }
        formData.append('community_type', (_b = this.dataservice) === null || _b === void 0 ? void 0 : _b.user_community_data.account_type);
        this.chatconnect.postFormData(formData, 'community_admin_post').then(function (result) {
            _this.selectedAdminFile = null;
            _this.fileAdminName = '';
            _this.ionViewDidEnter();
        }, function (err) {
            console.error(err);
            _this.selectedAdminFile = null;
            _this.fileAdminName = '';
        });
        this.message = '';
        this.selectedFileName = '';
    };
    CommunityDetailsPage.prototype.timelinePost = function () {
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
        if (this.selectedFile) {
            var isImage = this.selectedFile.type.startsWith('image/');
            if (isImage) {
                formData.append('post_images', this.selectedFile, this.selectedFile.name);
            }
        }
        if (this.message) {
            formData.append('message', this.message);
        }
        formData.append('community_type', (_c = this.dataservice) === null || _c === void 0 ? void 0 : _c.user_community_data.account_type);
        this.chatconnect.postFormData(formData, 'community_timelime').then(function (result) {
            _this.selectedFile = undefined;
            _this.fileName = '';
            if (_this.message) {
                var message = {
                    text: _this.message,
                    time: new Date(),
                    sender: 'admin'
                };
                _this.messages.push(message);
                _this.messages.sort(function (a, b) { return a.time.getTime() - b.time.getTime(); });
                _this.selectedFile = undefined;
                _this.fileName = '';
            }
            _this.ionViewDidEnter();
        }, function (err) {
            console.error(err);
            _this.selectedFile = undefined;
            _this.fileName = '';
        });
        this.message = '';
        this.selectedFileName = '';
    };
    CommunityDetailsPage.prototype.delete_timeline = function (params, params1) {
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
                                                community_id: _this.dataservice.user_community_data.id,
                                                member_id: params,
                                                row_id: params1,
                                                command: "delete",
                                                premium: 0,
                                                command_Type: "timeline"
                                            };
                                            _this.chatconnect.postData(apidata, "verify_member").then(function (result) {
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
                        popover.dismiss();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CommunityDetailsPage.prototype.deleteMessage = function (params, params1) {
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
                                        // this.commonservice.show("Please Wait");
                                        var apidata = {
                                            user_token: _this.dataservice.getUserData(),
                                            community_id: _this.dataservice.user_community_data.id,
                                            member_id: params,
                                            row_id: params1,
                                            command: "delete",
                                            premium: 0,
                                            command_Type: "adminpost"
                                        };
                                        _this.chatconnect.postData(apidata, "verify_member").then(function (result) {
                                            // this.commonservice.hide();
                                            if (result.Response.status == 1) {
                                                _this.commonservice.presentToast("", result.Response.message);
                                                _this.All_community();
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
    CommunityDetailsPage.prototype.All_events = function () {
        var _this = this;
        // this.commonservice.show();
        var apidata = {
            user_token: this.dataservice.getUserData(),
            community_id: this.dataservice.user_community_data.id,
            premium: '0'
        };
        this.chatconnect.postData(apidata, "view_event_by_community_id").then(function (result) {
            // this.commonservice.hide();
            if (result.Response.status == 1) {
                _this.events_data = result.Response.events_data;
                _this.filterData = _this.events_data;
                console.log("filter", _this.filterData);
                if (_this.filterData) {
                    var filterData = _this.filterData.filter(function (item) { return item.status !== 5; });
                    _this.eventCount = filterData.length;
                }
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    CommunityDetailsPage.prototype.view_details = function (params, params1) {
        if (params1) {
            this.dataservice.setEventData(params);
            this._router.navigate(['/detailseve']);
        }
        else {
            this.commonservice.presentToast("", "First Joined Community..");
        }
        // if (this.premium == 0) {
        //   this._router.navigate(['/detailseve'])
        // } else if (this.premium == 1) {
        //   this._router.navigate(['/event-details'])
        // }
    };
    CommunityDetailsPage.prototype.invite = function () {
        var popover = document.querySelector('ion-popover');
        if (popover) {
            this.dataservice.user_event_data = this.dataservice.user_community_data;
            this._router.navigate(['pages/reinvite', { type: "free_community" }]);
            popover.dismiss();
        }
    };
    CommunityDetailsPage.prototype.formatIndianDate = function (dateString) {
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
    CommunityDetailsPage.prototype.formatTime = function (time) {
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
    CommunityDetailsPage.prototype.getCityFromEvent = function (eventVenues) {
        var city = eventVenues.split(',')[0].trim();
        return city;
    };
    CommunityDetailsPage.prototype.getFormattedDate = function (eventDate) {
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
    ], CommunityDetailsPage.prototype, "slider");
    __decorate([
        core_1.ViewChild('popover')
    ], CommunityDetailsPage.prototype, "popover");
    CommunityDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-community-details',
            templateUrl: './community-details.page.html',
            styleUrls: ['./community-details.page.scss']
        })
    ], CommunityDetailsPage);
    return CommunityDetailsPage;
}());
exports.CommunityDetailsPage = CommunityDetailsPage;
