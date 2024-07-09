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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MyCommunityPage = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var MyCommunityPage = /** @class */ (function () {
    // get shouldShowEvents(): boolean {
    // 	return this.segment === 0;
    // }
    function MyCommunityPage(commonservice, _router, router, modalController, dataservice, chatconnect, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.router = router;
        this.modalController = modalController;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.alertController = alertController;
        this.my_community = [];
        this.my_joined_community = [];
        this.invite_community = [];
        this.my_paid_joined_community = [];
        this.segment = 0;
        this.handlerMessage = '';
    }
    MyCommunityPage.prototype.doRefresh = function (refresher) {
        this.GetUserEvents();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    MyCommunityPage.prototype.segmentChanged = function () {
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
    MyCommunityPage.prototype.slideChanged = function () {
        var _this = this;
        this.slider.getActiveIndex().then(function (index) {
            console.log("Current index: " + index);
            _this.segment = index;
        });
    };
    MyCommunityPage.prototype.deleteconfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Are You Sure!!',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    role: 'confirm'
                                },
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
    MyCommunityPage.prototype.add_staff = function (params) {
        console.log(params);
        this.dataservice.staff_data = params;
        this._router.navigate(['events/add-staff']);
    };
    MyCommunityPage.prototype.ngOnInit = function () {
    };
    MyCommunityPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.GetUserEvents();
    };
    MyCommunityPage.prototype.GetUserEvents = function () {
        var _this = this;
        this.commonservice.show();
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "filter_community").then(function (result) {
            _this.commonservice.hide();
            console.log(result);
            if (result.Response.status == 1) {
                _this.my_community = result.Response.my_community;
                if (_this.my_community) {
                    _this.crateCommunityCount = _this.my_community.length;
                }
                if (Array.isArray(result.Response.my_joined_community)) {
                    if (Array.isArray(result.Response.my_paid_joined_community)) {
                        _this.my_joined_community = __spreadArrays(result.Response.my_joined_community, result.Response.my_paid_joined_community);
                    }
                    else {
                        _this.my_joined_community = result.Response.my_joined_community;
                    }
                }
                else if (Array.isArray(result.Response.my_paid_joined_community)) {
                    _this.my_joined_community = result.Response.my_paid_joined_community;
                }
                _this.joinedCommunityCount = _this.my_joined_community.length;
                _this.invite_community = result.Response.invite_community;
                _this.inviteCommunityCount = _this.my_joined_community.length;
                if (_this.crateCommunityCount > 0) {
                    _this.segment = 0;
                }
                else if (_this.joinedCommunityCount > 0) {
                    _this.segment = 1;
                }
                else if (_this.inviteCommunityCount > 0) {
                    _this.segment = 2;
                }
                else {
                    _this.segment = 0;
                }
                console.log("Joined Result ==> ", _this.segment);
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    MyCommunityPage.prototype.view_detailss = function (params) {
        console.log("Deails Parameter ==> ", params);
        if (params.premium == 1) {
            console.log("This is premium");
            //this.dataservice.setCommunityData(params);
            this.dataservice.user_community_data = params;
            this._router.navigate(['/premium-community-details']);
        }
        else {
            console.log("This is normal");
            this.dataservice.user_community_data = params;
            this._router.navigate(['/community-details']);
        }
    };
    MyCommunityPage.prototype.edit_details = function (params) {
        console.log(params);
        this.dataservice.user_community_data = params;
        this._router.navigate(['/edit-event']);
    };
    __decorate([
        core_1.ViewChild('slider', { static: true })
    ], MyCommunityPage.prototype, "slider");
    MyCommunityPage = __decorate([
        core_1.Component({
            selector: 'app-my-community',
            templateUrl: './my-community.page.html',
            styleUrls: ['./my-community.page.scss'],
            animations: [
                animations_1.trigger('fadeIn', [
                    animations_1.state('void', animations_1.style({ opacity: 0 })),
                    animations_1.transition(':enter', [
                        animations_1.animate('1000ms ease', animations_1.style({ opacity: 1 })),
                    ]),
                ]),
            ]
        })
    ], MyCommunityPage);
    return MyCommunityPage;
}());
exports.MyCommunityPage = MyCommunityPage;
