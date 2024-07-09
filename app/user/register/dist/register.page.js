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
exports.RegisterPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ngx_intl_tel_input_1 = require("ngx-intl-tel-input");
var RegisterPage = /** @class */ (function () {
    function RegisterPage(formBuilder, alertController, common, dataservice, chatconnect, router, navCtrl, loadingController) {
        this.formBuilder = formBuilder;
        this.alertController = alertController;
        this.common = common;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.router = router;
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.isModalOpen = false;
        this.isSubmitted = false;
        this.termss = false;
        this.isUsernameValid = false;
        this.separateDialCode = true;
        this.SearchCountryField = ngx_intl_tel_input_1.SearchCountryField;
        this.CountryISO = ngx_intl_tel_input_1.CountryISO;
        this.PhoneNumberFormat = ngx_intl_tel_input_1.PhoneNumberFormat;
        this.preferredCountries = [ngx_intl_tel_input_1.CountryISO.UnitedStates, ngx_intl_tel_input_1.CountryISO.UnitedKingdom];
        this.error_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid Email address.' },
            ],
            'mobile_number': [
                { type: 'required', message: 'Mobile number is required.' }
            ],
            'your_name': [
                { type: 'required', message: 'First name is required.' },
                { type: 'minlength', message: 'minimum 2 characters is required.' },
                { type: 'pattern', message: 'Only text Allowed .' },
                { type: 'maxlength', message: 'First name length.' },
            ],
            'last_name': [
                { type: 'required', message: 'Last name is required.' },
                { type: 'minlength', message: 'minimum 2 characters is required.' },
                { type: 'pattern', message: 'Only text Allowed .' },
                { type: 'maxlength', message: 'Last name length.' },
            ],
            'username': [
                { type: 'required', message: 'Username is required.' }
            ]
        };
        this.ionicForm = this.formBuilder.group({
            full_name: ['', [forms_1.Validators.required]],
            last_name: ['', [forms_1.Validators.required]],
            mobile_number: ['', [forms_1.Validators.required]],
            username: ['', [forms_1.Validators.required]],
            email_id: ['', [forms_1.Validators.required, forms_1.Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+,[A-Z|a-z]{2,}$/)]],
            date_birth: [],
            gender: [],
            is_terms_checked: [false, [forms_1.Validators.requiredTrue]]
        });
    }
    RegisterPage.prototype.capitalizeName = function (input) {
        var value = input.value;
        if (value) {
            input.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
    };
    RegisterPage.prototype.getMaxDate = function () {
        var today = new Date();
        var fiveYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
        return fiveYearsAgo.toISOString().split('T')[0];
    };
    RegisterPage.prototype.setOpen = function (isOpen) {
        this.isModalOpen = isOpen;
    };
    RegisterPage.prototype.settOpen = function (isOpen) {
        this.termss = isOpen;
    };
    RegisterPage.prototype.GoToSignIn = function () {
        this.router.navigate(['/login']);
    };
    RegisterPage.prototype.ngOnInit = function () {
        this.ionicForm = this.formBuilder.group({
            full_name: ['', [forms_1.Validators.required]],
            last_name: ['', [forms_1.Validators.required]],
            username: ['', [forms_1.Validators.required]],
            mobile_number: ['', [forms_1.Validators.required]],
            email_id: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            date_birth: [],
            gender: [],
            is_terms_checked: [false, [forms_1.Validators.requiredTrue]]
        });
    };
    RegisterPage.prototype.onUsernameInput = function (username) {
        var _this = this;
        if (username.length > 3) {
            var apidata = {
                username: username
            };
            this.chatconnect.postData(apidata, "username_validator").then(function (result) {
                if (result.Response.status == 1) {
                    _this.isUsernameValid = true;
                    _this.msgg = result.Response.message;
                }
                else {
                    _this.isUsernameValid = false;
                    _this.msgg = result.Response.message;
                }
            }, function (err) {
                _this.common.hide();
                console.log("Connection failed Messge");
            });
        }
        else {
            this.msgg = 'noMsg';
        }
    };
    RegisterPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert, phoneNumber1, phoneNumber, apidata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        console.log("Res==>", this.isUsernameValid);
                        if (!(!this.ionicForm.valid || !this.isUsernameValid)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Please Enter all details',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        phoneNumber1 = this.ionicForm.value.mobile_number.internationalNumber.replace(new RegExp("^\\" + this.ionicForm.value.mobile_number.dialCode + "\\s*"), '');
                        phoneNumber = phoneNumber1.replace(/\s+/g, '');
                        this.common.show("Please Wait");
                        apidata = {
                            user_name: this.ionicForm.value.full_name,
                            last_name: this.ionicForm.value.last_name,
                            username: this.ionicForm.value.username,
                            mobile_number: phoneNumber,
                            numberDetails: this.ionicForm.value.mobile_number,
                            email_id: this.ionicForm.value.email_id,
                            date_birth: this.ionicForm.value.date_birth,
                            gender: this.ionicForm.value.gender,
                            request_type: "user_signup",
                            is_terms_checked: this.ionicForm.value.is_terms_checked
                        };
                        console.log("This is Api data ==>", apidata);
                        this.chatconnect.postData(apidata, "sendregisterotp").then(function (result) {
                            _this.common.hide();
                            if (result.Response.status == 1) {
                                _this.dataservice.is_user_login_or_signup = result.Response.request_type;
                                _this.dataservice.set_user_signup = _this.ionicForm.value;
                                _this.dataservice.setOtp(result.Response.code);
                                _this.router.navigate(['/res-otp'], { queryParams: { requestType: 'user_signup' } });
                                if (result.Response.request_type == 'user_login') {
                                    _this.dataservice.setUserData(result.Response.userdata.user_token);
                                }
                            }
                            else {
                                _this.common.presentToast("", result.Response.message);
                            }
                        }, function (err) {
                            _this.common.hide();
                            console.log("Connection failed Messge");
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.ionViewWillLeave = function () {
        this.dataservice.mobile_number = null;
    };
    RegisterPage = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss']
        })
    ], RegisterPage);
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
