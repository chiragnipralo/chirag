"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AboutPage = void 0;
var core_1 = require("@angular/core");
var AboutPage = /** @class */ (function () {
    function AboutPage(commonservice, _router, nav, dataservice, authservice, chatconnect, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.nav = nav;
        this.dataservice = dataservice;
        this.authservice = authservice;
        this.chatconnect = chatconnect;
        this.alertController = alertController;
        this.ispersonal = false;
    }
    AboutPage.prototype.personal = function (isOpen) {
        this.ispersonal = isOpen;
    };
    AboutPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    AboutPage.prototype.ionViewDidEnter = function () {
        this.GetData();
    };
    AboutPage.prototype.clearUserData = function () {
        localStorage.clear();
        this.authservice.isAuthenticated.next(false);
        // this._router.navigate(['/login']);
        this.nav.navigateRoot(['/login']);
    };
    AboutPage.prototype.Logout = function () {
        this.clearUserData();
    };
    AboutPage.prototype.EditProfile = function () {
        this._router.navigate(['/editprof']);
    };
    AboutPage.prototype.Wishlist = function () {
        this._router.navigate(['/wishlist']);
    };
    AboutPage.prototype.ManageEvent = function () {
        this._router.navigate(['/paidmanage']);
    };
    AboutPage.prototype.InviteEvent = function () {
        this._router.navigate(['/inviteevent']);
    };
    AboutPage.prototype.ngOnInit = function () {
    };
    AboutPage.prototype.GetData = function () {
        var _this = this;
        var id = this.dataservice.GetAccountuser();
        this.commonservice.show("Please Wait");
        var apidata = {
            user_token: this.dataservice.getUserData(),
            account_id: id
        };
        this.chatconnect.postData(apidata, "paid_user_profile").then(function (result) {
            _this.commonservice.hide();
            console.log(result);
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
    AboutPage = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: './about.page.html',
            styleUrls: ['./about.page.scss']
        })
    ], AboutPage);
    return AboutPage;
}());
exports.AboutPage = AboutPage;
