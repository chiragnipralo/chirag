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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var messaging_1 = require("@capacitor-firebase/messaging");
var app_1 = require("@capacitor/app");
var LOGTAG = '[FirebaseMessagingPage]';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, _navController, dataservice, commonservice, ngZone, router) {
        this.platform = platform;
        this._navController = _navController;
        this.dataservice = dataservice;
        this.commonservice = commonservice;
        this.ngZone = ngZone;
        this.router = router;
        this.token = '';
        this.deliveredNotifications = [];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (core_2.Capacitor.isNativePlatform()) {
                _this.requestPermissions();
                _this.getToken();
                messaging_1.FirebaseMessaging.removeAllListeners().then(function () {
                    messaging_1.FirebaseMessaging.addListener('tokenReceived', function (event) {
                        console.log("tokenReceived", { event: event });
                        _this.ngZone.run(function () {
                            _this.dataservice.user_fcmpush_token = event.token;
                        });
                    });
                    messaging_1.FirebaseMessaging.addListener('notificationReceived', function (event) {
                        console.log("notificationReceived", { event: event });
                        if (event.notification) {
                            console.log("event.notification ==============>", event.notification.data.type);
                            if (event.notification.data.type == 'create_event') {
                                console.log("If Here...");
                                //this.commonservice.EventInvitationAlert(event.notification.data.event_id,event.notification.data.type,
                                //event.notification.title,event.notification.body)
                            }
                            else if (event.notification.data.type == 'community_invite') {
                                //this.commonservice.communityInvitationAlert(event.notification.data.event_id,event.notification.data.type,
                                //event.notification.title,event.notification.body)
                            }
                        }
                    });
                    messaging_1.FirebaseMessaging.addListener('notificationActionPerformed', function (event) {
                        console.log("notificationActionPerformed", { event: event });
                        if (event.actionId == "tap") {
                            console.log("event.notification alert ==============>", event.notification);
                            if (event.notification.data.type == 'event_chat') {
                                _this.router.navigate(['tabs/chat']);
                            }
                            else if (event.notification.data.type == 'create_event' || event.notification.data.type == 'free_event') {
                                _this.dataservice.user_event_data.id = event.notification.data.event_id;
                                _this.router.navigate(['/detailseve']);
                            }
                            else if (event.notification.data.type == 'paid_event') {
                                _this.dataservice.user_event_data.id = event.notification.data.event_id;
                                _this.router.navigate(['/event-details']);
                            }
                            else if (event.notification.data.type == 'community_invite' || event.notification.data.type == 'free_community') {
                                _this.dataservice.user_community_data.id = event.notification.data.event_id;
                                _this.dataservice.user_community_data.account_type = 1;
                                _this.router.navigate(['/community-details']);
                            }
                            else if (event.notification.data.type == 'paid_community') {
                                _this.dataservice.user_community_data.id = event.notification.data.event_id;
                                _this.dataservice.user_community_data.account_type = 1;
                                _this.router.navigate(['/premium-community-details']);
                            }
                            else {
                                console.log("Notification Not Working");
                            }
                        }
                    });
                });
            }
        });
        app_1.App.addListener('appUrlOpen', function (event) {
            _this.ngZone.run(function () {
                // const slug = event.url.split(".app").pop();
                // if (slug) {
                //     this.router.navigateByUrl(slug);
                // }
                var domain = 'soeasyapp.com';
                console.log("This Is Domain:", domain);
                var pathArray = event.url.split(domain);
                var appPath = pathArray.pop();
                if (appPath) {
                    _this.router.navigateByUrl(appPath);
                }
            });
        });
    };
    AppComponent.prototype.requestPermissions = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, messaging_1.FirebaseMessaging.requestPermissions()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.getToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, messaging_1.FirebaseMessaging.getToken()];
                    case 1:
                        token = (_a.sent()).token;
                        console.log(token);
                        this.dataservice.user_fcmpush_token = token;
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.getDeliveredNotifications = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, messaging_1.FirebaseMessaging.getDeliveredNotifications()];
                    case 1:
                        result = _a.sent();
                        this.deliveredNotifications = result.notifications;
                        console.log("this.deliveredNotifications ===============>", this.deliveredNotifications);
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.onLogout = function () {
        // this._userDetailService.clearUserData();
        this._navController.navigateRoot('/auth');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
