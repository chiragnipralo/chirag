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
exports.EditcardPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var imgcropper_component_1 = require("../../components/imgcropper/imgcropper.component");
var EditcardPage = /** @class */ (function () {
    function EditcardPage(sanitizer, formBuilder, common, dataservice, navCtrl, chatconnect, modalController, successmodal, contactpagemodal, router, location, _route, alertController) {
        this.formBuilder = formBuilder;
        this.common = common;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.successmodal = successmodal;
        this.contactpagemodal = contactpagemodal;
        this.router = router;
        this.location = location;
        this._route = _route;
        this.alertController = alertController;
        this.fileName = '';
        this.isSubmitted = false;
        this.showCreateButton = false;
        this.isBusinessModalOpen = false;
        this.isPersonalModalOpen = false;
        this.file_uploaddata = '';
        this.Blobimage = [];
        this.selectedFiles = [];
        this.cardImages = [];
        this.sanitizer = sanitizer;
        this.imageUrls = [];
        this.multiImages = [];
        this.profile_img = [];
    }
    EditcardPage.prototype.customCounterFormatter = function (inputLength, maxLength) {
        return maxLength - inputLength + " characters remaining";
    };
    EditcardPage.prototype.onImageSelected = function (event) {
        var _this = this;
        if (event.target.files.length > this.maxAllowedFiles) {
            this.common.presentToast('File Limit Exceeded', "You can only select up to " + this.maxAllowedFiles + " files.");
            event.target.value = null;
        }
        else {
            var files = event.target.files;
            if (files && files.length > 0) {
                var _loop_1 = function (i) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        _this.cardImages.push(reader.result);
                    };
                    reader.readAsDataURL(files[i]);
                    this_1.selectedFiles.push(files[i]);
                };
                var this_1 = this;
                for (var i = 0; i < files.length; i++) {
                    _loop_1(i);
                }
            }
        }
    };
    EditcardPage.prototype.removeImage = function (index) {
        this.cardImages.splice(index, 1);
        this.selectedFiles.splice(index, 1);
    };
    EditcardPage.prototype.removePrevImage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to delete this Image?',
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
                                            card_id: _this.modalData.id,
                                            row_id: params,
                                            command: "cardMultiImg",
                                            premium: 0,
                                            command_Type: "delete"
                                        };
                                        _this.chatconnect.postData(apidata, "card_operations").then(function (result) {
                                            if (result.Response.status == 1) {
                                                _this.multiImages = [];
                                                _this.showCard();
                                                _this.common.presentToast("", result.Response.message);
                                            }
                                            else {
                                                _this.common.presentToast("Oops", result.Response.message);
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
    EditcardPage.prototype.capitalizeName = function (input) {
        var value = input.value;
        if (value) {
            input.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
    };
    EditcardPage.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.requestType = +params['requestType'];
            console.log('Received requestType:', _this.requestType);
        });
        this.ionicForm = this.formBuilder.group({
            card_type: [''],
            profile_img: [''],
            full_name: ['', forms_1.Validators.required],
            designation: [''],
            profession: [''],
            mobile_number: ['', forms_1.Validators.required],
            whatsapp_number: [''],
            landline: [],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            email1: [''],
            email2: [''],
            user_address: [''],
            office_name: [''],
            office_address: [''],
            head_office_address: [''],
            address: [''],
            address1: [''],
            address2: [''],
            website: [''],
            facebook: [''],
            linkedin: [''],
            twitter: [''],
            instagram: [''],
            youtube: [''],
            snapchat: [''],
            about_me: [''],
            about_us: ['']
        });
        this.showCard();
    };
    EditcardPage.prototype.onFileSelected = function (event) {
        var file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.fileName = file.name;
        }
    };
    EditcardPage.prototype.showCard = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            request_type: this.requestType
        };
        this.chatconnect.postData(apidata, "show_card").then(function (result) {
            console.log(result);
            if (result.Response.status == 1) {
                _this.modalData = result.Response.pesonal_card;
                _this.ionicForm.patchValue({
                    full_name: _this.modalData.user_name,
                    mobile_number: _this.modalData.user_contact,
                    landline: _this.modalData.landline_number,
                    designation: _this.modalData.user_designation,
                    whatsapp_number: _this.modalData.whatsapp_number,
                    email: _this.modalData.user_email,
                    email1: _this.modalData.email1,
                    email2: _this.modalData.email2,
                    user_address: _this.modalData.user_address,
                    address: _this.modalData.address,
                    address1: _this.modalData.address1,
                    address2: _this.modalData.address2,
                    office_name: _this.modalData.office_name,
                    office_address: _this.modalData.office_address,
                    linkedin: _this.modalData.linkedin,
                    website: _this.modalData.website,
                    facebook: _this.modalData.facebook,
                    instagram: _this.modalData.instagram,
                    twitter: _this.modalData.twitter,
                    head_office_address: _this.modalData.head_office_address,
                    about_me: _this.modalData.about_me,
                    youtube: _this.modalData.youtube,
                    profession: _this.modalData.user_profession,
                    snapchat: _this.modalData.snapchatId,
                    about_us: _this.modalData.about_us
                });
                if (_this.modalData.images && Array.isArray(_this.modalData.images)) {
                    _this.multiImages.push(_this.modalData.images);
                    var imageCount = _this.modalData.images.length;
                    _this.maxAllowedFiles = 5 - imageCount;
                }
                _this.imageUrls.push(_this.modalData.user_img);
                console.log("This is image ==>", _this.imageUrls);
                _this.prevImage = _this.modalData.user_img;
            }
            else {
                _this.common.presentToast("", result.Response.message);
            }
        })["catch"](function (err) {
            console.log("Connection failed Message", err);
            _this.common.presentToast("Edit Digital Card", "Failed to fetch card details. Please try again.");
        });
    };
    EditcardPage.prototype.view = function (img, showflag) {
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
                                        localStorage.setItem("profile_card", data.data.cropped_image);
                                    }
                                }
                            }
                            else {
                                if (_this.prevImage !== null) {
                                    _this.imageUrls = [];
                                    _this.imageUrls.push(_this.prevImage);
                                }
                                else {
                                    _this.imageUrls = [];
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditcardPage.prototype.loadImageFromDevice = function (event, showflag) {
        var _this = this;
        console.log(event);
        var photo = event.target.files[0];
        this.dataservice.orginalImage = photo;
        this.file_uploaddata = photo;
        var formData = new FormData();
        // Add the file that was just added to the form data
        formData.append("photo", photo, photo.name);
        this.Blobimage.push(photo);
        this.dataservice.blobToBase64(photo).then(function (res) {
            _this.dataservice.event_base64img = res;
            _this.view(res, showflag);
        });
        // const file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsArrayBuffer(photo);
        reader.onload = function () {
            // get the blob of the image:
            var blob = new Blob([new Uint8Array(reader.result)]);
            // create blobURL, such that we could use it in an image element:
            var blobURL = URL.createObjectURL(blob);
            // console.log(blob);
            if (showflag == "event") {
                _this.imageUrls.unshift(_this.sanitizer.bypassSecurityTrustUrl(blobURL));
            }
        };
        console.log(this.Blobimage);
        reader.onerror = function (error) { };
    };
    ;
    EditcardPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert, userToken, formData_1, profile_card;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        if (!!this.ionicForm.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                header: '',
                                subHeader: 'Please Enter Required Fileds.',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        this.common.show('Please Wait');
                        userToken = this.dataservice.getUserData();
                        console.log(userToken);
                        formData_1 = new FormData();
                        if (userToken) {
                            formData_1.append('user_token', userToken);
                        }
                        formData_1.append('idd', this.modalData.id);
                        formData_1.append('user_name', this.ionicForm.value.full_name || '');
                        formData_1.append('contact', this.ionicForm.value.mobile_number || '');
                        formData_1.append('landline', this.ionicForm.value.landline);
                        formData_1.append('email', this.ionicForm.value.email || '');
                        formData_1.append('email1', this.ionicForm.value.email1);
                        formData_1.append('email2', this.ionicForm.value.email2);
                        formData_1.append('designation', this.ionicForm.value.designation);
                        formData_1.append('profession', this.ionicForm.value.profession || '');
                        formData_1.append('card_type', this.requestType.toString());
                        formData_1.append('user_address', this.ionicForm.value.user_address || '');
                        formData_1.append('head_office_address', this.ionicForm.value.head_office_address || '');
                        formData_1.append('address', this.ionicForm.value.address || '');
                        formData_1.append('address1', this.ionicForm.value.address1);
                        formData_1.append('address2', this.ionicForm.value.address2);
                        formData_1.append('about_me', this.ionicForm.value.about_me || '');
                        formData_1.append('youtube', this.ionicForm.value.youtube || '');
                        formData_1.append('facebook', this.ionicForm.value.facebook || '');
                        formData_1.append('linkedin', this.ionicForm.value.linkedin || '');
                        formData_1.append('twitter', this.ionicForm.value.twitter || '');
                        formData_1.append('instagram', this.ionicForm.value.instagram || '');
                        formData_1.append('office_name', this.ionicForm.value.office_name || '');
                        formData_1.append('office_address', this.ionicForm.value.office_address || '');
                        formData_1.append('website', this.ionicForm.value.website || '');
                        formData_1.append('whatsapp_number', this.ionicForm.value.whatsapp_number || '');
                        formData_1.append('snapchat', this.ionicForm.value.snapchat);
                        formData_1.append('about_us', this.ionicForm.value.about_us);
                        profile_card = localStorage.getItem('profile_card');
                        if (profile_card !== null && !this.dataservice.isNullOrUndefined(profile_card)) {
                            formData_1.append('profile_img', this.dataservice.convertBase64ToBlob(profile_card));
                        }
                        else {
                            formData_1.append('prev_img', this.modalData.user_img);
                        }
                        this.selectedFiles.forEach(function (file) {
                            formData_1.append('multi_images[]', file);
                        });
                        this.chatconnect.postFormData(formData_1, 'edit_card').then(function (result) {
                            console.log(result);
                            _this.common.hide();
                            if (result.Response.status == 1) {
                                localStorage.removeItem('profile_card');
                                _this.common.presentToast('', result.Response.message);
                                _this.location.back();
                                //this.navCtrl.navigateForward('/profilecards');
                            }
                        }, function (err) {
                            _this.common.hide();
                            console.log('Connection failed Messge');
                        });
                        console.log(this.ionicForm.value);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditcardPage = __decorate([
        core_1.Component({
            selector: 'editcard-card',
            templateUrl: './editcard.page.html',
            styleUrls: ['./editcard.page.scss']
        })
    ], EditcardPage);
    return EditcardPage;
}());
exports.EditcardPage = EditcardPage;
