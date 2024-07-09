"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ResOtpPage = void 0;
var core_1 = require("@angular/core");
var ResOtpPage = /** @class */ (function () {
    function ResOtpPage(commonservice, _router, nav, dataservice, chatconnect, authservice, alertController, route, smsRetriever) {
        this.commonservice = commonservice;
        this._router = _router;
        this.nav = nav;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.authservice = authservice;
        this.alertController = alertController;
        this.route = route;
        this.smsRetriever = smsRetriever;
        this.requestType = 'user_login';
        this.otp = '';
    }
    ResOtpPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Dataservice ==>", this.dataservice.set_user_signup);
        this.route.queryParams.subscribe(function (params) {
            _this.requestType = params['requestType'] || 'user_login';
        });
        this.requestOTP();
    };
    ResOtpPage.prototype.requestOTP = function () {
        var _this = this;
        this.smsRetriever.startWatching().then(function (res) {
            var otp = res.Message.toString().substr(33, 4);
            _this.otp = otp;
        })["catch"](function (error) {
            console.error('Error starting SMS Retriever:', error);
        });
    };
    ResOtpPage.prototype.otpInputChange = function () {
        console.log(this.otp);
        if (this.otp.length === 4) {
            // this.signup_password();
        }
    };
    ResOtpPage.prototype.signup_password = function () {
        if (this.otp === '' || this.otp.length < 4) {
            this.commonservice.presentToast("Oops", "Please Enter Otp");
        }
        else {
            console.log(this.dataservice);
            if (this.dataservice.getOtp() === this.otp) {
                if (this.dataservice.is_user_login_or_signup === "user_signup") {
                    this.RegisterUser();
                }
                else {
                    if (this.dataservice.is_user_login_or_signup == 'user_login') {
                        this.authservice.isAuthenticated.next(true);
                        this.dataservice.setUserData(this.dataservice.user_req_token);
                        this.nav.navigateRoot(['/tabs']);
                    }
                }
            }
            else {
                this.commonservice.presentToast("Oops", "Invalid Otp");
            }
        }
    };
    ResOtpPage.prototype.RegisterUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber1, phoneNumber, user_data1, apidata;
            var _this = this;
            return __generator(this, function (_a) {
                this.commonservice.show("Please Wait");
                phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp("^\\" + this.dataservice.set_user_signup.mobile_number.dialCode + "\\s*"), '');
                phoneNumber = phoneNumber1.replace(/\s+/g, '');
                user_data1 = __assign(__assign({}, this.dataservice.set_user_signup), { mobile_number: phoneNumber, numberDeatails: this.dataservice.set_user_signup.mobile_number });
                console.log("user data ==>", user_data1);
                apidata = {
                    user_data: user_data1
                };
                console.log("API Data ==>", apidata);
                this.chatconnect.postData(apidata, "user_register").then(function (result) {
                    _this.commonservice.hide();
                    if (result.Response.status == 1) {
                        _this.authservice.isAuthenticated.next(true);
                        _this.dataservice.setUserData(result.Response.user_token);
                        _this.nav.navigateRoot(['/tabs']);
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    _this.commonservice.hide();
                    console.log("Connection failed Messge");
                });
                return [2 /*return*/];
            });
        });
    };
    ResOtpPage.prototype.Resend = function () {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber1, phoneNumber, apidata;
            var _this = this;
            return __generator(this, function (_a) {
                this.commonservice.show("Please Wait");
                phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp("^\\" + this.dataservice.set_user_signup.mobile_number.dialCode + "\\s*"), '');
                phoneNumber = phoneNumber1.replace(/\s+/g, '');
                apidata = {
                    mobile_number: phoneNumber,
                    request_type: this.requestType,
                    app_hash: this.dataservice.appHashString
                };
                this.requestOTP();
                this.chatconnect.postData(apidata, "sendloginotp").then(function (result) {
                    _this.commonservice.hide();
                    if (result.Response.status == 1) {
                        _this.dataservice.setOtp(result.Response.code);
                        if (result.Response.request_type === 'user_login') {
                            // this.dataservice.setUserData(result.Response.userdata.user_token);
                        }
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    _this.commonservice.hide();
                    console.log("Connection failed Message");
                });
                return [2 /*return*/];
            });
        });
    };
    ResOtpPage.prototype.signResend = function () {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber1, phoneNumber, apidata;
            var _this = this;
            return __generator(this, function (_a) {
                this.commonservice.show("Please Wait");
                phoneNumber1 = this.dataservice.set_user_signup.mobile_number.internationalNumber.replace(new RegExp("^\\" + this.dataservice.set_user_signup.mobile_number.dialCode + "\\s*"), '');
                phoneNumber = phoneNumber1.replace(/\s+/g, '');
                apidata = {
                    mobile_number: phoneNumber,
                    request_type: this.requestType,
                    app_hash: this.dataservice.appHashString
                };
                this.requestOTP();
                this.chatconnect.postData(apidata, "sendregisterotp").then(function (result) {
                    _this.commonservice.hide();
                    if (result.Response.status == 1) {
                        _this.dataservice.setOtp(result.Response.code);
                        if (result.Response.request_type === 'user_signup') {
                            _this.dataservice.setUserData(result.Response.userdata && result.Response.userdata.user_token);
                        }
                    }
                    else {
                        _this.commonservice.presentToast("Oops", result.Response.message);
                    }
                }, function (err) {
                    _this.commonservice.hide();
                    console.log("Connection failed Message");
                });
                return [2 /*return*/];
            });
        });
    };
    ResOtpPage = __decorate([
        core_1.Component({
            selector: 'app-res-otp',
            templateUrl: './res-otp.page.html',
            styleUrls: ['./res-otp.page.scss']
        })
    ], ResOtpPage);
    return ResOtpPage;
}());
exports.ResOtpPage = ResOtpPage;
