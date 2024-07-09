"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddStaffPage = void 0;
var core_1 = require("@angular/core");
var AddStaffPage = /** @class */ (function () {
    function AddStaffPage(commonservice, dataservice, _route, _router, chatconnect, location, alertController) {
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this._route = _route;
        this._router = _router;
        this.chatconnect = chatconnect;
        this.location = location;
        this.alertController = alertController;
        this.user_lists = [];
        this.ev_managers = {};
        this.selectedFromList = false;
    }
    AddStaffPage.prototype.testFunc = function (ev) {
        var _this = this;
        if (this.selectedFromList) {
            this.selectedFromList = false;
            return;
        }
        if (ev.detail.value.length > 3) {
            var apidata = {
                user_token: this.dataservice.getUserData(),
                search_params: ev.detail.value
            };
            this.chatconnect.postData(apidata, "get_all_users").then(function (result) {
                if (result.Response.status == 1) {
                    _this.user_lists = result.Response.all_users;
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
            });
        }
    };
    AddStaffPage.prototype.SetValue = function (params) {
        this.ev_managers.user_id = params.id;
        this.searchTerm = params.user_name;
        this.user_lists = [];
        this.selectedFromList = true;
    };
    AddStaffPage.prototype.SubmitData = function () {
        var _this = this;
        var event_type = this._route.snapshot.params['event_type'];
        if (this.event_man_role == undefined) {
            this.commonservice.presentToast("", "Select Admin role.");
            return false;
        }
        var isUserPresent = this.dataservice.staff_data.event_managers.some(function (manager) { return manager.user_id === _this.ev_managers.user_id; });
        if (isUserPresent) {
            this.commonservice.presentToast("", "Admin already exists.");
            return false;
        }
        this.ev_managers.event_role = parseInt(this.event_man_role);
        this.dataservice.staff_data.event_managers.push(this.ev_managers);
        var apidata = {
            event_id: this.dataservice.staff_data.id,
            user_token: this.dataservice.getUserData(),
            event_managers: this.dataservice.staff_data.event_managers,
            event_type: event_type
        };
        this.chatconnect.postData(apidata, "add_staff_to_event").then(function (result) {
            if (result.Response.status == 1) {
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
    AddStaffPage.prototype.ngOnInit = function () {
        if (this.dataservice.ValidateArray(this.dataservice.staff_data.event_managers)) {
        }
    };
    AddStaffPage = __decorate([
        core_1.Component({
            selector: 'app-add-staff',
            templateUrl: './add-staff.page.html',
            styleUrls: ['./add-staff.page.scss']
        })
    ], AddStaffPage);
    return AddStaffPage;
}());
exports.AddStaffPage = AddStaffPage;
