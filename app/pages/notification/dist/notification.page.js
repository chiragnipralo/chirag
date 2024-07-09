"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationPage = void 0;
var core_1 = require("@angular/core");
var NotificationPage = /** @class */ (function () {
    function NotificationPage(commonservice, _router, modalController, dataservice, chatconnect, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.modalController = modalController;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.alertController = alertController;
        this.notification = [];
        this.filterData = [];
        this.showSearchBar = false;
        this.searchQuery = '';
    }
    NotificationPage.prototype.toggleSearchBar = function () {
        var _this = this;
        this.showSearchBar = !this.showSearchBar;
        if (this.showSearchBar) {
            setTimeout(function () {
                var searchBar = _this.searchBarRef.nativeElement;
                searchBar.setFocus();
            }, 100);
        }
        else {
            this.searchQuery = '';
        }
    };
    NotificationPage.prototype.ngOnInit = function () {
    };
    NotificationPage.prototype.filterItems = function (event) {
        if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
            this.filterData = this.notification.filter(function (st) {
                return (st.notification_msg.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
            });
        }
    };
    NotificationPage.prototype.AllNotifications = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            type: "view_notification"
        };
        this.chatconnect.postData(apidata, "notifications").then(function (result) {
            if (result.Response.status == 1) {
                _this.notification = result.Response.notification;
                _this.filterData = _this.notification;
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    NotificationPage.prototype.ionViewWillEnter = function () {
        this.AllNotifications();
    };
    NotificationPage.prototype.deleteNotification = function (params) {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            type: "delete_notification",
            row_id: params
        };
        this.chatconnect.postData(apidata, "notifications").then(function (result) {
            if (result.Response.status == 1) {
                _this.ionViewWillEnter();
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    NotificationPage.prototype.view_details = function (params) {
        var _this = this;
        if (params.notification_status == 0) {
            if (params.is_viewed === 0) {
                var apidata = {
                    user_token: this.dataservice.getUserData(),
                    type: "update_status",
                    row_id: params.id
                };
                this.chatconnect.postData(apidata, "notifications").then(function (result) {
                    if (result.Response.status == 1) {
                        _this.ionViewWillEnter();
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    console.log("Connection failed Messge");
                });
            }
            //this.dataservice.setEventData(params);
            if (params.type == "free_event") {
                this.dataservice.user_event_data.id = params.notification_id;
                this._router.navigate(['/detailseve']);
            }
            else if (params.type == "paid_event" && params.notification_status != 3) {
                var apidata = {
                    user_token: this.dataservice.getUserData(),
                    event_id: params.notification_id
                };
                this.chatconnect.postData(apidata, "view_paid_events_by_id").then(function (result) {
                    if (result.Response.status == 1) {
                        _this.dataservice.setEventData(result.Response.events_data);
                        _this._router.navigate(['/event-details']);
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    console.log("Connection failed Messge");
                });
            }
            else if (params.type == "free_community") {
                this.dataservice.user_community_data.id = params.notification_id;
                this.dataservice.user_community_data.account_type = 1;
                this._router.navigate(['/community-details']);
            }
            else if (params.type == "paid_community") {
                this.dataservice.user_community_data.id = params.notification_id;
                this.dataservice.user_community_data.type = 1;
                this._router.navigate(['/premium-community-details']);
            }
            else if (params.type == "free_draft_event") {
                this.dataservice.user_event_data.id = params.notification_id;
                this._router.navigate(['/edit-event']);
            }
            else if (params.type == "paid_draft_event") {
                this.dataservice.user_event_data.id = params.notification_id;
                this._router.navigate(['/edit-paid-event']);
            }
            else if (params.type == "free_community") {
                var apidata = {
                    premium: 0,
                    user_token: this.dataservice.getUserData(),
                    type: 1,
                    community_id: params.notification_id
                };
                this.chatconnect.postData(apidata, "view_community_by_id").then(function (result) {
                    if (result.Response.status == 1) {
                        _this.dataservice.setCommunityData(result.Response.community_data);
                        _this._router.navigate(['/premium-community-details']);
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    console.log("Connection failed Messge");
                });
            }
        }
        else {
            this.commonservice.presentToast("Oops", "This is already deleted and cannot be opened.");
        }
    };
    __decorate([
        core_1.ViewChild('searchBar', { read: core_1.ElementRef })
    ], NotificationPage.prototype, "searchBarRef");
    NotificationPage = __decorate([
        core_1.Component({
            selector: 'app-notification',
            templateUrl: './notification.page.html',
            styleUrls: ['./notification.page.scss']
        })
    ], NotificationPage);
    return NotificationPage;
}());
exports.NotificationPage = NotificationPage;
