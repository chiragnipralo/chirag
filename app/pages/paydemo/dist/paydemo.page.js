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
exports.PaydemoPage = void 0;
var core_1 = require("@angular/core");
var PaydemoPage = /** @class */ (function () {
    function PaydemoPage(sanitizer, formBuilder, commonservice, alertController, dataservice, navCtrl, chatconnect, modalController, createv4omdal, successmodal, router) {
        this.formBuilder = formBuilder;
        this.commonservice = commonservice;
        this.alertController = alertController;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.createv4omdal = createv4omdal;
        this.successmodal = successmodal;
        this.router = router;
        this.paymentHistory = [];
        this.paymentRecivedHistory = [];
        this.segment = 0;
    }
    PaydemoPage.prototype.ngOnInit = function () {
    };
    PaydemoPage.prototype.ionViewWillEnter = function () {
        this.PaymentInfo();
    };
    PaydemoPage.prototype.segmentChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.slider.slideTo(this.segment)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PaydemoPage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            console.log("Current index: " + index);
            _this.segment = index;
        });
    };
    PaydemoPage.prototype.sendPayPdf = function (params) {
        var _this = this;
        console.log("pdf", params);
        var apidata = {
            user_token: this.dataservice.getUserData(),
            pdf_data: params
        };
        this.chatconnect.postData(apidata, "payment_pdf").then(function (result) {
            if (result.Response.status == 1) {
                _this.commonservice.presentToast("", result.Response.message);
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    PaydemoPage.prototype.PaymentInfo = function () {
        var _this = this;
        this.commonservice.show();
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "payment_history").then(function (result) {
            _this.commonservice.hide();
            if (result.Response.status == 1) {
                _this.paymentHistory = result.Response.payment_history;
                _this.paymentRecivedHistory = result.Response.payment_received_history;
                console.log("History==>", _this.paymentHistory);
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    __decorate([
        core_1.ViewChild('slider', { static: true })
    ], PaydemoPage.prototype, "slider");
    PaydemoPage = __decorate([
        core_1.Component({
            selector: 'app-paydemo',
            templateUrl: './paydemo.page.html',
            styleUrls: ['./paydemo.page.scss']
        })
    ], PaydemoPage);
    return PaydemoPage;
}());
exports.PaydemoPage = PaydemoPage;
