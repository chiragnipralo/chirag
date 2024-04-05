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
exports.HttpService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var network_1 = require("@capacitor/network");
// let apiUrl = "http://localhost/soeasyapi/";
//let apiUrl = "https://slimapi.webinovator.com/soeasyapi/";
//let apiUrl = "https://betaapi.soeasyapp.com/";
var apiUrl = "https://api.soeasyapp.com/";
var paymentUrl = "https://admin.payomatix.com/payment/merchant/";
var HttpService = /** @class */ (function () {
    function HttpService(http, dataservice, common) {
        this.http = http;
        this.dataservice = dataservice;
        this.common = common;
        this.checkInternetConnection();
    }
    HttpService.prototype.initiatePayment = function (credentials, type) {
        var _this = this;
        var header = {
            headers: new http_1.HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'PAY46ZGYME1AE6LUR1AVI1701862757.YFGJ11SECKEY')
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(paymentUrl + type, JSON.stringify(credentials), header).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                if (err.name == "HttpErrorResponse") {
                    if (err.statusText == "Unknown Error") {
                        _this.checkInternetConnection();
                    }
                    else if (err.statusText == "OK") {
                        _this.common.presentToast("", "Something Went Wrong...");
                    }
                    else {
                        _this.common.presentToast("", err.statusText);
                    }
                }
                console.log("In Chatconnect provider : Error", err);
            });
        });
    };
    HttpService.prototype.postData = function (credentials, type) {
        var _this = this;
        var header = {
            headers: new http_1.HttpHeaders()
                .set('Content-Type', 'application/json')
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(apiUrl + type, JSON.stringify(credentials), header).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                if (err.name == "HttpErrorResponse") {
                    if (err.statusText == "Unknown Error") {
                        _this.checkInternetConnection();
                    }
                    else if (err.statusText == "OK") {
                        _this.common.presentToast("", "Something Went Wrong...");
                    }
                    else {
                        _this.common.presentToast("", err.statusText);
                    }
                    // this.dataservice.clearUserData();
                }
                console.log("In Chatconnect provider : Error", err);
            });
        });
    };
    HttpService.prototype.checkInternetConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, network_1.Network.getStatus()];
                    case 1:
                        networkStatus = _a.sent();
                        if (networkStatus.connected) {
                            console.log('Internet is connected');
                            // Handle the case when the internet is connected
                        }
                        else {
                            console.log('No internet connection');
                            this.common.presentToast("", "Check your internet connection");
                            // Handle the case when there is no internet connection
                            // You can set an error message or take other actions here
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpService.prototype.postFormData = function (formData, url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.HttpHeaders()
                .set('Accept', 'application/json'); // No need to specify 'Content-Type' for FormData
            _this.http.post(apiUrl + url, formData, { headers: headers }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
