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
exports.PersonalCardPage = void 0;
var core_1 = require("@angular/core");
var share_1 = require("@capacitor/share");
var image_modal_component_1 = require("src/app/components/image-modal/image-modal.component");
var PersonalCardPage = /** @class */ (function () {
    function PersonalCardPage(commonservice, common, dataservice, chatconnect, modalController, alertController, router, navCtrl) {
        this.commonservice = commonservice;
        this.common = common;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.alertController = alertController;
        this.router = router;
        this.navCtrl = navCtrl;
    }
    PersonalCardPage.prototype.ngOnInit = function () {
    };
    PersonalCardPage.prototype.ionViewWillEnter = function () {
        this.showCard();
    };
    PersonalCardPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PersonalCardPage.prototype.share_card = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var token, fullUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.dataservice.getUserData();
                        fullUrl = "" + url + params + "?token=" + token + "&&?card_type=1";
                        return [4 /*yield*/, share_1.Share.share({
                                title: 'Personal Card',
                                text: '..',
                                url: fullUrl
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PersonalCardPage.prototype.showCard = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData(),
            request_type: 1
        };
        this.chatconnect.postData(apidata, "show_card").then(function (result) {
            console.log(result);
            if (result.Response.status == 1) {
                _this.modalData = result.Response.pesonal_card;
                console.log("This is Personal Card:", _this.modalData);
            }
            else {
                _this.common.presentToast("", result.Response.message);
            }
        })["catch"](function (err) {
            console.log("Connection failed Message", err);
            _this.common.presentToast("Create Digital Card", "Please create your digital card first.");
        });
    };
    PersonalCardPage.prototype.navigateToEditPage = function (requestType) {
        this.router.navigate(['/editcard', { requestType: requestType }]);
        console.log('parameter', requestType);
    };
    PersonalCardPage.prototype.openModal = function (originalEventImages) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("This Is Image:", originalEventImages);
                        return [4 /*yield*/, this.modalController.create({
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
    PersonalCardPage = __decorate([
        core_1.Component({
            selector: 'app-personal-card',
            templateUrl: './personal-card.page.html',
            styleUrls: ['./personal-card.page.scss']
        })
    ], PersonalCardPage);
    return PersonalCardPage;
}());
exports.PersonalCardPage = PersonalCardPage;
