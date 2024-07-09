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
exports.InvitedMemberPage = void 0;
var core_1 = require("@angular/core");
var InvitedMemberPage = /** @class */ (function () {
    function InvitedMemberPage(commonservice, _router, modalCtrl, dataservice, navCtrl, popoverController, chatconnect, alertController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.modalCtrl = modalCtrl;
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.popoverController = popoverController;
        this.chatconnect = chatconnect;
        this.alertController = alertController;
        this.events_data = [];
        this.showSearchBar = false;
        this.searchQuery = '';
        this.filterData = [];
        this.is_modal_open = false;
        this.community_members = [];
        this.isOpen = false;
    }
    InvitedMemberPage.prototype.toggleSearchBar = function () {
        var _this = this;
        this.showSearchBar = !this.showSearchBar;
        if (this.showSearchBar) {
            setTimeout(function () {
                var searchBar = _this.searchBarRef.nativeElement;
                searchBar.setFocus();
            }, 100);
        }
        else {
            this.searchQuery = '';
        }
    };
    InvitedMemberPage.prototype.filterItems = function (event) {
        if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
            this.filterData = this.community_members.filter(function (data) {
                return (data.user_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
            });
        }
    };
    InvitedMemberPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    InvitedMemberPage.prototype.presentPopover = function (e) {
        this.popover.event = e;
        this.isOpen = true;
    };
    InvitedMemberPage.prototype.ngOnInit = function () {
        this.is_modal_open = true;
        this.type = this.dataservice.community_type;
        this.community_data = this.dataservice.community_member;
        this.All_community();
    };
    InvitedMemberPage.prototype.All_community = function () {
        var _this = this;
        this.commonservice.show();
        var apidata = {
            premium: this.dataservice.is_premium,
            user_token: this.dataservice.getUserData(),
            type: this.dataservice.community_type,
            community_id: this.community_data.id
        };
        this.chatconnect.postData(apidata, "view_community_by_id").then(function (result) {
            _this.commonservice.hide();
            if (result.Response.status == 1) {
                _this.community_data = result.Response.community_data;
                _this.community_members = JSON.parse(result.Response.community_data.member_invited);
                console.log(typeof _this.community_members);
                console.log("Community Member ==> ", _this.community_members);
                _this.filterData = _this.community_members;
            }
            else {
                _this.commonservice.presentToast("Oops", result.Response.message);
            }
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    InvitedMemberPage.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.dismiss({
                            'dismissed': true
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('searchBar', { read: core_1.ElementRef })
    ], InvitedMemberPage.prototype, "searchBarRef");
    __decorate([
        core_1.ViewChild('popover')
    ], InvitedMemberPage.prototype, "popover");
    InvitedMemberPage = __decorate([
        core_1.Component({
            selector: 'app-invited-member',
            templateUrl: './invited-member.page.html',
            styleUrls: ['./invited-member.page.scss']
        })
    ], InvitedMemberPage);
    return InvitedMemberPage;
}());
exports.InvitedMemberPage = InvitedMemberPage;
