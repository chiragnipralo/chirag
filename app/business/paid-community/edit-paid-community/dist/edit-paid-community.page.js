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
exports.EditPaidCommunityPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var imgcropper_component_1 = require("../../../components/imgcropper/imgcropper.component");
var EditPaidCommunityPage = /** @class */ (function () {
    function EditPaidCommunityPage(sanitizer, commonservice, formBuilder, common, dataservice, navCtrl, chatconnect, modalController, successmodal, router, location, alertController) {
        this.commonservice = commonservice;
        this.formBuilder = formBuilder;
        this.common = common;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.successmodal = successmodal;
        this.router = router;
        this.location = location;
        this.alertController = alertController;
        this.isSubmitted = false;
        this.file_uploaddata = '';
        this.Blobimage = [];
        this.showMoreBar = false;
        this.isSelectDisabled = false;
        this.error_messages = {
            'title': [
                { type: 'required', message: 'Title is required.' },
            ],
            'description': [
                { type: 'required', message: 'Description is required.' },
            ],
            'category': [
                { type: 'required', message: 'Category is required.' },
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
            ],
            'contact': [
                { type: 'required', message: 'Contact is required.' },
            ],
            'open_for': [
                { type: 'required', message: 'required.' },
            ],
            'member_status': [
                { type: 'required', message: 'required.' },
            ]
        };
        this.sanitizer = sanitizer;
        this.imageUrls = [];
    }
    EditPaidCommunityPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.commonservice.show();
                        this.ionicForm = this.formBuilder.group({
                            title: ['', [forms_1.Validators.required]],
                            description: [''],
                            category: ['', [forms_1.Validators.required]],
                            email: ['', [forms_1.Validators.required]],
                            contact: ['', [forms_1.Validators.required]],
                            open_for: [''],
                            member_status: ['']
                        });
                        return [4 /*yield*/, this.GetDashboard()];
                    case 1:
                        _a.sent();
                        this.All_community();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPaidCommunityPage.prototype.GetDashboard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apidata = {
                user_token: _this.dataservice.getUserData()
            };
            _this.chatconnect.postData(apidata, "user_dashboard").then(function (result) {
                console.log(result);
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
    EditPaidCommunityPage.prototype.view = function (img, showflag) {
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
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditPaidCommunityPage.prototype.loadImageFromDevice = function (event, showflag) {
        var _this = this;
        console.log(event);
        var photo = event.target.files[0];
        console.log(photo);
        this.file_uploaddata = photo;
        console.log(photo);
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
        console.log(this.Blobimage);
        reader.onerror = function (error) { };
    };
    ;
    EditPaidCommunityPage.prototype.submit = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var alert, userToken, id, formData, community_images;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        this.isSubmitted = true;
                        this.ionicForm.markAllAsTouched();
                        if (!!this.ionicForm.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Please Enter',
                                subHeader: 'Please Enter all details',
                                buttons: ['Dismiss']
                            })];
                    case 1:
                        alert = _h.sent();
                        alert.present();
                        return [3 /*break*/, 3];
                    case 2:
                        userToken = this.dataservice.getUserData();
                        id = this.dataservice.GetAccountuser();
                        formData = new FormData();
                        formData.append('premium', "1");
                        formData.append('community_id', id);
                        community_images = localStorage.getItem('event_images');
                        if (community_images !== null && !this.dataservice.isNullOrUndefined(community_images)) {
                            formData.append('community_images', this.dataservice.convertBase64ToBlob(community_images));
                        }
                        if (userToken !== null) {
                            formData.append('user_token', userToken);
                        }
                        formData.append('title', (_a = this.ionicForm.get('title')) === null || _a === void 0 ? void 0 : _a.value);
                        formData.append('description', (_b = this.ionicForm.get('description')) === null || _b === void 0 ? void 0 : _b.value);
                        formData.append('category', (_c = this.ionicForm.get('category')) === null || _c === void 0 ? void 0 : _c.value);
                        formData.append('email', (_d = this.ionicForm.get('email')) === null || _d === void 0 ? void 0 : _d.value);
                        formData.append('contact', (_e = this.ionicForm.get('contact')) === null || _e === void 0 ? void 0 : _e.value);
                        //formData.append('community_type', this.ionicForm.get('category').value);
                        formData.append('open_for', (_f = this.ionicForm.get('open_for')) === null || _f === void 0 ? void 0 : _f.value);
                        formData.append('member_status', (_g = this.ionicForm.get('member_status')) === null || _g === void 0 ? void 0 : _g.value);
                        formData.append('previous_image', this.dataservice.previous_img);
                        console.log(formData);
                        this.chatconnect.postFormData(formData, "edit_community").then(function (result) {
                            _this.common.hide();
                            if (result.Response.status == 1) {
                                _this.common.presentToast("", result.Response.message);
                                _this.location.back();
                            }
                            else {
                                _this.common.presentToast("Oops", result.Response.message);
                            }
                        }, function (err) {
                            _this.common.hide();
                            console.log("Connection failed Messge");
                        });
                        _h.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditPaidCommunityPage.prototype.All_community = function () {
        var _this = this;
        var id = this.dataservice.GetAccountuser();
        var apidata = {
            user_token: this.dataservice.getUserData(),
            community_id: id
        };
        this.chatconnect.postData(apidata, "paid_community_details_by_id").then(function (result) {
            _this.commonservice.hide();
            if (result.Response.status == 1) {
                var communityData_1 = result.Response.Details;
                console.log("This is Result ==> ", communityData_1[0].account_name);
                // Update form values
                _this.ionicForm.patchValue({
                    title: communityData_1[0].account_name,
                    description: communityData_1[0].description,
                    email: communityData_1[0].email,
                    contact: communityData_1[0].contact
                });
                // handle event category
                var selectedCategory = _this.dataservice.events_categories.find(function (category) { return category.name === communityData_1[0].category; });
                console.log(selectedCategory);
                _this.ionicForm.patchValue({
                    category: selectedCategory ? selectedCategory.id : null
                });
                // handle Community is open or closed
                var selectedCommunityType = communityData_1[0].open_for;
                console.log(selectedCommunityType);
                var selectedType = selectedCommunityType !== undefined ? selectedCommunityType.toString() : null;
                _this.ionicForm.patchValue({
                    open_for: selectedType
                });
                // handle Community is open or closed
                var selectedCommunityMember = communityData_1[0].member_details;
                console.log(selectedCommunityType);
                var selectedMember = selectedCommunityMember !== undefined ? selectedCommunityMember.toString() : null;
                _this.ionicForm.patchValue({
                    member_status: selectedMember
                });
                var imageUrl = communityData_1[0].account_image;
                if (imageUrl !== null) {
                    _this.imageUrls.push(imageUrl);
                }
                console.log("This is Image ==>", _this.imageUrls);
            }
            else {
                _this.common.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Message");
        });
    };
    EditPaidCommunityPage = __decorate([
        core_1.Component({
            selector: 'app-edit-paid-community',
            templateUrl: './edit-paid-community.page.html',
            styleUrls: ['./edit-paid-community.page.scss']
        })
    ], EditPaidCommunityPage);
    return EditPaidCommunityPage;
}());
exports.EditPaidCommunityPage = EditPaidCommunityPage;
