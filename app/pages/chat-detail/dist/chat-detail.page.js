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
exports.ChatDetailPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var image_modal_component_1 = require("../../components/image-modal/image-modal.component");
var ChatDetailPage = /** @class */ (function () {
    function ChatDetailPage(commonservice, dataservice, chatconnect, modalController, platformService) {
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this.chatconnect = chatconnect;
        this.modalController = modalController;
        this.platformService = platformService;
        // @ViewChild(IonContent, { static: true }) content: IonContent;
        this.canInfinite = false;
        this.chat_events = [];
        this.imageBg = 'chat-bg';
        this.chat_events_messages = [];
        this.editorMsg = '';
        this.showEmojiPicker = false;
    }
    ChatDetailPage.prototype.ngOnInit = function () {
    };
    ChatDetailPage.prototype.listChats = function () {
        var _this = this;
        console.log(this.dataservice.user_event_chat_data);
        console.log(this.dataservice.user_event_chat_data);
        var apidata = {
            user_id: this.dataservice.user_event_chat_data.user_id,
            user_token: this.dataservice.getUserData(),
            event_id: this.dataservice.user_event_chat_data.event_id,
            chat_type: this.dataservice.user_event_chat_data.chat_type,
            is_premium: this.dataservice.user_event_chat_data.is_premium
        };
        console.log("This is API Data ==>", apidata);
        this.chatconnect.postData(apidata, "get_event_chats_by_userid_and_eventid").then(function (result) {
            console.log('result', result);
            _this.chat_events_messages = result.Response.event_chats;
            _this.current_user_id = result.Response.current_user_id;
            _this.current_chat_type = result.Response.current_chat_type;
            console.log('chatdata', _this.chat_events_messages);
            console.log("This is chat type ==> ", _this.current_chat_type);
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    ChatDetailPage.prototype.ionViewDidEnter = function () {
        this.listChats();
    };
    ChatDetailPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.scrollToBottom();
    };
    /**
     * @name sendMsg
     */
    ChatDetailPage.prototype.sendMsg = function () {
        var _this = this;
        if (!this.editorMsg.trim())
            return;
        console.log("IM HERE ");
        var apidata = {
            "user_id": this.dataservice.user_event_chat_data.user_id,
            "event_id": this.dataservice.user_event_chat_data.event_id,
            "chat_message": this.editorMsg,
            "chat_type": this.dataservice.user_event_chat_data.chat_type,
            "is_premium": this.dataservice.user_event_chat_data.is_premium
        };
        this.chatconnect.postData(apidata, "add_events_chats").then(function (result) {
            console.log(result);
            _this.chat_events_messages.push({ "user_id": _this.current_user_id,
                "event_id": _this.dataservice.user_event_chat_data.event_id,
                "message": _this.editorMsg,
                "user_initials": _this.dataservice.getInitials(_this.dataservice.user_profile_data.user_name),
                "chat_type": _this.dataservice.user_event_chat_data.chat_type,
                "is_premium": _this.dataservice.user_event_chat_data.is_premium
            });
            console.log(_this.chat_events_messages);
            _this.editorMsg = '';
            _this.scrollToBottom();
            _this.listChats();
        }, function (err) {
            console.log("Connection failed Messge");
        });
    };
    ChatDetailPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    ChatDetailPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    ChatDetailPage.prototype.getMoreMessagesI = function (e) { };
    ChatDetailPage.prototype.logScrolling = function (e) {
        // console.log("logScrolling ------->",e.detail.currentY)
        this.canInfinite = e.detail.currentY > 10;
    };
    ChatDetailPage.prototype.openModal = function (originalEventImages) {
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
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], ChatDetailPage.prototype, "content");
    __decorate([
        core_1.ViewChild('chat_input')
    ], ChatDetailPage.prototype, "messageInput");
    ChatDetailPage = __decorate([
        core_1.Component({
            selector: 'app-chat-detail',
            templateUrl: './chat-detail.page.html',
            styleUrls: ['./chat-detail.page.scss']
        })
    ], ChatDetailPage);
    return ChatDetailPage;
}());
exports.ChatDetailPage = ChatDetailPage;
