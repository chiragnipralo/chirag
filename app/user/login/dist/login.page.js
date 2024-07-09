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
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ngx_intl_tel_input_1 = require("ngx-intl-tel-input");
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, alertController, common, smsRetriever, authservice, dataservice, chatconnect, router, navCtrl, platform, loadingController) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.alertController = alertController;
        this.common = common;
        this.smsRetriever = smsRetriever;
        this.authservice = authservice;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.router = router;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.loadingController = loadingController;
        this.smsTextmessage = '';
        this.appHashString = '';
        this.isSubmitted = false;
        this.separateDialCode = true;
        this.SearchCountryField = ngx_intl_tel_input_1.SearchCountryField;
        this.CountryISO = ngx_intl_tel_input_1.CountryISO;
        this.PhoneNumberFormat = ngx_intl_tel_input_1.PhoneNumberFormat;
        this.preferredCountries = [ngx_intl_tel_input_1.CountryISO.UnitedStates, ngx_intl_tel_input_1.CountryISO.UnitedKingdom];
        this.error_messages = {
            'mobile_number': [
                { type: 'required', message: 'Mobile number is required.' }
            ]
        };
        this.ionicForm = this.formBuilder.group({
            mobile_number: ['', [forms_1.Validators.required]]
        });
        this.platform.backButton.subscribeWithPriority(10, function () {
            if (_this.router.url === '/login') {
                _this.navCtrl.navigateRoot('/login');
            }
            else {
                _this.navCtrl.back();
            }
            if (_this.platform.is('android') && _this.platform.is('cordova')) {
                if (window.location.pathname === '/login') {
                    navigator['app'].exitApp();
                }
            }
        });
    }
    LoginPage.prototype.GoToSignUp = function () {
        this.router.navigate(['/register']);
    };
    LoginPage.prototype.ngOnInit = function () {
        this.ionicForm = this.formBuilder.group({
            mobile_number: ['', [forms_1.Validators.required]]
        });
        this.getHashCode();
    };
    LoginPage.prototype.getHashCode = function () {
        var _this = this;
        this.smsRetriever.getAppHash().then(function (res) {
            console.log(res);
            _this.dataservice.appHashString = res;
        })["catch"](function (error) { return console.error(error); });
    };
    LoginPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert, phoneNumber1, phoneNumber_1, apidata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        if (!!this.ionicForm.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Please Enter valid Mobile Number',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        phoneNumber1 = this.ionicForm.value.mobile_number.internationalNumber.replace(new RegExp("^\\" + this.ionicForm.value.mobile_number.dialCode + "\\s*"), '');
                        phoneNumber_1 = phoneNumber1.replace(/\s+/g, '');
                        this.common.show("Please Wait");
                        apidata = {
                            mobile_number: phoneNumber_1,
                            numberDetails: this.ionicForm.value.mobile_number,
                            app_hash: this.dataservice.appHashString,
                            request_type: "user_login"
                        };
                        this.dataservice.is_user_login_or_signup = "user_login";
                        this.chatconnect.postData(apidata, "sendloginotp").then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var alert;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.common.hide();
                                        if (!(result.Response.status == 1)) return [3 /*break*/, 1];
                                        this.dataservice.set_user_signup = this.ionicForm.value;
                                        this.dataservice.setOtp(result.Response.code);
                                        this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_login' } });
                                        if (result.Response.request_type == 'user_login') {
                                            this.dataservice.user_req_token = result.Response.userdata.user_token;
                                            // this.dataservice.setUserData(result.Response.userdata.user_token);
                                        }
                                        else {
                                            this.common.presentToast("Oops", "Please Register");
                                            this.router.navigate(['/register']);
                                        }
                                        return [3 /*break*/, 4];
                                    case 1:
                                        this.dataservice.mobile_number = phoneNumber_1;
                                        return [4 /*yield*/, this.alertController.create({
                                                header: 'Please Register...',
                                                message: result.Response.message,
                                                cssClass: 'loginAlert',
                                                buttons: [
                                                    {
                                                        text: 'Register',
                                                        cssClass: 'alert-button-confirm',
                                                        handler: function () {
                                                            _this.router.navigate(['/register']);
                                                        }
                                                    },
                                                    {
                                                        text: 'Cancel',
                                                        cssClass: 'alert-button-cancel',
                                                        role: 'cancel',
                                                        handler: function () {
                                                        }
                                                    }
                                                ]
                                            })];
                                    case 2:
                                        alert = _a.sent();
                                        return [4 /*yield*/, alert.present()];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            _this.common.hide();
                            console.log("Connection failed Messge");
                        });
                        console.log(this.ionicForm.value);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss']
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
