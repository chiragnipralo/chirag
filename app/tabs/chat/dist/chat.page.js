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
exports.ChatPage = void 0;
var core_1 = require("@angular/core");
var image_modal_component_1 = require("../../components/image-modal/image-modal.component");
var ChatPage = /** @class */ (function () {
    function ChatPage(commonservice, dataservice, chatconnect, modalController, _router) {
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this._router = _router;
        // chat_events = [];
        this.community_chats = [];
        this.showSearchBar = false;
        this.searchQuery = '';
        this.chat_events = [];
        this.filterData = [];
        this.segment = "chat";
    }
    ChatPage.prototype.toggleSearchBar = function () {
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
    ChatPage.prototype.doRefresh = function (refresher) {
        this.ionViewDidEnter();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    ChatPage.prototype.filterItems = function (event) {
        if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
            this.filterData = this.chat_events.filter(function (data) {
                return (data.event_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
            });
        }
    };
    ChatPage.prototype.ngOnInit = function () {
        console.log("ENter 11");
    };
    ChatPage.prototype.listChats = function () {
        var _this = this;
        var apidata = {
            user_token: this.dataservice.getUserData()
        };
        this.chatconnect.postData(apidata, "get_all_event_chats").then(function (result) {
            _this.chat_events = [];
            if (Array.isArray(result.Response.event_chats)) {
                _this.chat_events = _this.chat_events.concat(result.Response.event_chats);
            }
            if (Array.isArray(result.Response.community_chats)) {
                _this.chat_events = _this.chat_events.concat(result.Response.community_chats);
            }
            if (Array.isArray(result.Response.paid_community_chats)) {
                _this.chat_events = _this.chat_events.concat(result.Response.paid_community_chats);
            }
            //this.filterData = this.chat_events;
            _this.filterData = _this.chat_events.sort(function (a, b) {
                var dateA = new Date(a.latest_chat_date);
                var dateB = new Date(b.latest_chat_date);
                return dateB.getTime() - dateA.getTime();
            });
            console.log("Final Result ==>", _this.filterData);
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    ChatPage.prototype.navigatetoChat = function (params) {
        this.dataservice.user_event_chat_data = params;
        this._router.navigate(['chat-detail']);
    };
    ChatPage.prototype.chat_connect = function () {
        this._router.navigate(['pages/chat-contact']);
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        console.log("ENter");
        this.listChats();
    };
    ChatPage.prototype.openModal = function (originalEventImages) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
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
    __decorate([
        core_1.ViewChild('searchBar', { read: core_1.ElementRef })
    ], ChatPage.prototype, "searchBarRef");
    ChatPage = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.page.html',
            styleUrls: ['./chat.page.scss']
        })
    ], ChatPage);
    return ChatPage;
}());
exports.ChatPage = ChatPage;
