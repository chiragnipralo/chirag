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
exports.MultiEventPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var imgcropper_component_1 = require("../../components/imgcropper/imgcropper.component");
var MultiEventPage = /** @class */ (function () {
    function MultiEventPage(sanitizer, formBuilder, common, dataservice, navCtrl, chatconnect, modalController, createv4omdal, successmodal, contactpagemodal, router, route, alertController) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.common = common;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.createv4omdal = createv4omdal;
        this.successmodal = successmodal;
        this.contactpagemodal = contactpagemodal;
        this.router = router;
        this.route = route;
        this.alertController = alertController;
        this.isSubmitted = false;
        this.file_uploaddata = '';
        this.showMoreBar = false;
        this.Blobimage = [];
        this.showSubmitButton = false;
        this.error_messages = {
            'title': [
                { type: 'required', message: 'Title is required.' },
            ],
            'description': [
                { type: 'required', message: 'Description is required.' },
            ]
        };
        this.sanitizer = sanitizer;
        this.imageUrls = [];
        this.route.queryParams.subscribe(function (params) {
            _this.accountType = +params['value'];
        });
    }
    MultiEventPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ionicForm = this.formBuilder.group({
                            title: ['', [forms_1.Validators.required]],
                            description: [''],
                            start_date: [''],
                            end_date: ['']
                        });
                        return [4 /*yield*/, this.GetDashboard()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MultiEventPage.prototype.GetDashboard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apidata = {
                user_token: _this.dataservice.getUserData()
            };
            _this.chatconnect.postData(apidata, "user_dashboard").then(function (result) {
                if (result.Response.status == 1) {
                    _this.dataservice.events_categories = result.Response.all_categories;
                    resolve(true);
                }
                else {
                    _this.common.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
                reject(err);
            });
        });
    };
    MultiEventPage.prototype.submit = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var alert, formData, eventImages, titleValue, descriptionValue, startDateValue, endDateValue;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        if (!!this.ionicForm.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                header: '',
                                subHeader: 'Please Enter Details',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _m.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        formData = new FormData();
                        formData.append('user_token', (_b = (_a = this.dataservice.getUserData()) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
                        eventImages = (_c = localStorage.getItem('event_images')) !== null && _c !== void 0 ? _c : '';
                        if (!this.dataservice.isNullOrUndefined(eventImages)) {
                            formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
                        }
                        else {
                            formData.append('event_images', '');
                        }
                        titleValue = (_e = (_d = this.ionicForm.get('title')) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : '';
                        formData.append('title', titleValue);
                        descriptionValue = (_g = (_f = this.ionicForm.get('description')) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : '';
                        formData.append('description', descriptionValue);
                        startDateValue = (_j = (_h = this.ionicForm.get('start_date')) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : '';
                        formData.append('start_date', startDateValue);
                        endDateValue = (_l = (_k = this.ionicForm.get('end_date')) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : '';
                        formData.append('end_date', endDateValue);
                        this.chatconnect.postFormData(formData, "multiple_event").then(function (result) {
                            _this.common.hide();
                            if (result.Response.status == 1) {
                                _this.ionicForm.reset();
                                localStorage.removeItem('event_images');
                                _this.imageUrls = [];
                                _this.router.navigate(['pages/successmul', { multievent_id: result.Response.last_id }]);
                            }
                            else {
                                _this.common.presentToast("Oops", result.Response.message);
                            }
                        }, function (err) {
                            _this.common.hide();
                            console.log("Connection failed Messge");
                        });
                        _m.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MultiEventPage.prototype.view = function (img, showflag) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: imgcropper_component_1.ImgcropperComponent,
                            cssClass: 'my-menubar'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (data.data != undefined) {
                                if (data.data.cropped_image) {
                                    _this.dataservice.convertBase64ToBlob(data.data.cropped_image);
                                    if (showflag == "event") {
                                        _this.imageUrls = [];
                                        _this.imageUrls.unshift(data.data.cropped_image);
                                        localStorage.setItem("event_images", data.data.cropped_image);
                                    }
                                }
                            }
                            else {
                                _this.imageUrls = [];
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MultiEventPage.prototype.loadImageFromDevice = function (event, showflag) {
        var _this = this;
        var photo = event.target.files[0];
        this.file_uploaddata = photo;
        var formData = new FormData();
        formData.append("photo", photo, photo.name);
        this.Blobimage.push(photo);
        this.dataservice.blobToBase64(photo).then(function (res) {
            _this.dataservice.event_base64img = res;
            _this.view(res, showflag);
        });
        var reader = new FileReader();
        reader.readAsArrayBuffer(photo);
        reader.onload = function () {
            var blob = new Blob([new Uint8Array(reader.result)]);
            var blobURL = URL.createObjectURL(blob);
            if (showflag == "event") {
                _this.imageUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
        };
        reader.onerror = function (error) { };
    };
    ;
    MultiEventPage = __decorate([
        core_1.Component({
            selector: 'app-multi-event',
            templateUrl: './multi-event.page.html',
            styleUrls: ['./multi-event.page.scss']
        })
    ], MultiEventPage);
    return MultiEventPage;
}());
exports.MultiEventPage = MultiEventPage;
