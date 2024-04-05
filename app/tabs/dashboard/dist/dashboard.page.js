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
exports.DashboardPage = void 0;
var core_1 = require("@angular/core");
var geolocation_1 = require("@capacitor/geolocation");
var contacts_1 = require("@capacitor-community/contacts");
var core_2 = require("@capacitor/core");
var DashboardPage = /** @class */ (function () {
    function DashboardPage(commonservice, _router, appcomponent, sanitizer, dataservice, authservice, chatconnect, activatedRoute, datePipe, loadingController) {
        this.commonservice = commonservice;
        this._router = _router;
        this.appcomponent = appcomponent;
        this.sanitizer = sanitizer;
        this.dataservice = dataservice;
        this.authservice = authservice;
        this.chatconnect = chatconnect;
        this.activatedRoute = activatedRoute;
        this.datePipe = datePipe;
        this.loadingController = loadingController;
        this.showSearchBar = false;
        this.showSearch = false;
        this.searchQuery = '';
        this.loaded = false;
        this.events = [];
        this.events_data = [];
        this.my_events = [];
        this.nearby_events = [];
        this.todays_event = [];
        this.upcoming_event = [];
        this.insights_arr = [];
        this.yt_videos_arr = [];
        this.free_events = [];
        this.paid_events = [];
        this.my_community = [];
        this.popular_community = [];
        this.invited_community = [];
        this.lists = [];
        this.showCaldate = false;
        this.contacts = [];
        this.segment_one = "Popular";
        this.free_paid = "Paid";
    }
    DashboardPage.prototype.ionViewWillEnter = function () {
        console.log('Refreshing page ionViewWillEnter...');
        this.loaded = false;
        this.GetDashboard();
    };
    DashboardPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var geoPermResult, contactPermResult, retrievedContacts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.activatedRoute.url.subscribe(function () {
                            _this.GetDashboard();
                        });
                        if (!core_2.Capacitor.isNativePlatform()) return [3 /*break*/, 8];
                        return [4 /*yield*/, geolocation_1.Geolocation.requestPermissions()];
                    case 1:
                        geoPermResult = _a.sent();
                        return [4 /*yield*/, contacts_1.Contacts.requestPermissions()];
                    case 2:
                        contactPermResult = _a.sent();
                        console.log('Geolocation Permission request result:', geoPermResult);
                        console.log('Contacts Permission request result:', contactPermResult);
                        if (geoPermResult) {
                            this.getCurrentCoordinate();
                        }
                        if (!(contactPermResult.contacts === 'granted')) return [3 /*break*/, 6];
                        retrievedContacts = JSON.parse(localStorage.getItem('cust_contacts') || 'null');
                        if (!(retrievedContacts && retrievedContacts.length > 0)) return [3 /*break*/, 3];
                        this.dataservice.all_contacts = retrievedContacts;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.retrieveListOfContacts()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (contactPermResult.contacts === 'denied') {
                            console.log('Contacts permission is denied. Please enable it to retrieve contacts.');
                        }
                        _a.label = 7;
                    case 7:
                        this.appcomponent.requestPermissions();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.retrieveListOfContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var projection, contacts, unique, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        projection = {
                            name: true,
                            phones: true
                        };
                        return [4 /*yield*/, contacts_1.Contacts.getContacts({ projection: projection })];
                    case 1:
                        contacts = _a.sent();
                        contacts.contacts.forEach(function (contact) {
                            if (contact.name && contact.name.display && contact.phones) {
                                for (var i = 0; i < contact.phones.length; i++) {
                                    if (contact.phones[i].number.length > 9) {
                                        _this.contacts.push({
                                            'name': contact.name.display,
                                            'phone_number': contact.phones[i].number.replace(/\D/g, '').slice(-10)
                                        });
                                    }
                                }
                            }
                        });
                        this.contacts.sort(function (a, b) { return _this.compareObjects(a, b, 'name'); });
                        unique = this.contacts.filter(function (value, index, self) { return self.findIndex(function (v) { return v.phone_number === value.phone_number; }) === index; });
                        localStorage.setItem('cust_contacts', JSON.stringify(unique));
                        this.dataservice.all_contacts = unique;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error retrieving contacts:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.getCurrentCoordinate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var position, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, geolocation_1.Geolocation.getCurrentPosition()];
                    case 1:
                        position = _a.sent();
                        this.coordinate = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error getting current position:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.toggleSearchBar = function () {
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
    DashboardPage.prototype.GoToNotification = function () {
        this._router.navigate(['/pages/notification']);
    };
    DashboardPage.prototype.toggleChanged = function (event) {
        console.log("This is Toggle Value=>", event);
        if (event.detail.checked) {
            this._router.navigate(['/buzwel']);
        }
    };
    DashboardPage.prototype.doRefresh = function (refresher) {
        this.ngOnInit();
        setTimeout(function () {
            refresher.target.complete();
        }, 2000);
    };
    DashboardPage.prototype.toggleCal = function () {
        var _this = this;
        this.showCaldate = !this.showCaldate;
        if (this.showCaldate)
            setTimeout(function () {
                if (_this.showCal)
                    _this.showCal.setFocus();
            });
    };
    DashboardPage.prototype.GetDashboard = function (refresher) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apidata = {
                user_token: _this.dataservice.getUserData(),
                user_fcm_token: _this.dataservice.user_fcmpush_token
            };
            _this.chatconnect.postData(apidata, "user_dashboard").then(function (result) {
                console.log(result);
                _this.loaded = true;
                console.log("Value Updated==>", _this.loaded);
                if (result.Response.status == 1) {
                    _this.notifyCount = result.Response.notify_count;
                    _this.dataservice.inviteCharge = result.Response.inviteCharge;
                    _this.my_community = result.Response.my_community;
                    _this.invited_community = result.Response.invited_community;
                    _this.popular_community = result.Response.popular_community;
                    _this.my_events = [];
                    if (Array.isArray(result.Response.my_events)) {
                        _this.my_events = _this.my_events.concat(result.Response.my_events);
                    }
                    if (Array.isArray(result.Response.my_multiple_events)) {
                        _this.my_events = _this.my_events.concat(result.Response.my_multiple_events);
                    }
                    _this.nearby_events = result.Response.nearby_events;
                    _this.todays_event = result.Response.todays_event;
                    _this.upcoming_event = result.Response.upcoming_event;
                    _this.free_events = result.Response.free_events;
                    _this.paid_events = result.Response.paid_events;
                    _this.dataservice.user_profile_data = result.Response.user_profile_data;
                    _this.insights_arr = result.Response.insights_arr;
                    _this.yt_videos_arr = result.Response.yt_videos_arr;
                    _this.dataservice.events_categories = result.Response.all_categories;
                    _this.dataservice.home_slider = result.Response.banner;
                    resolve(true);
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
                if (refresher) {
                    setTimeout(function () {
                        refresher.target.complete();
                    }, 2000);
                }
            }, function (err) {
                console.log("Connection failed Message");
                reject(err);
            });
        });
    };
    DashboardPage.prototype.getCityFromEvent = function (eventVenues) {
        var city = eventVenues.split(',')[0].trim();
        return city;
    };
    DashboardPage.prototype.getFormattedDate = function (eventDate) {
        var date = new Date(eventDate);
        if (!isNaN(date.getTime())) {
            var formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy');
            return formattedDate || '';
        }
        else {
            return '';
        }
    };
    DashboardPage.prototype.filterItems = function (ev) {
        var _this = this;
        if (ev.detail.value.length > 2) {
            var apidata = {
                user_token: this.dataservice.getUserData(),
                search_params: ev.detail.value
            };
            this.chatconnect.postData(apidata, "search").then(function (result) {
                console.log(result);
                if (result.Response.status == 1) {
                    _this.lists = result.Response.search_result;
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
            });
            this.showSearch = true;
        }
        else {
            this.showSearch = false;
        }
    };
    DashboardPage.prototype.create_community = function () {
        var navigationExtras = {
            queryParams: {
                value: 1
            }
        };
        this._router.navigate(['create-community'], navigationExtras);
    };
    DashboardPage.prototype.create_events = function () {
        this._router.navigate(['pages/event-type']);
    };
    DashboardPage.prototype.SearchResult = function (params) {
        var _this = this;
        console.log("This is Search Result ==> ", params);
        if (params.flag == 1) {
            var apidata = {
                user_token: this.dataservice.getUserData(),
                event_id: params.id
            };
            console.log(apidata);
            this.chatconnect.postData(apidata, "view_events_by_id").then(function (result) {
                console.log("This is result", result.Response.events_data);
                if (result.Response.status == 1) {
                    _this.dataservice.setEventData(result.Response.events_data);
                    console.log(_this.dataservice.user_event_data);
                    _this._router.navigate(['/detailseve']);
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
            });
        }
        else if (params.flag === 2) {
            var apidata = {
                premium: 0,
                user_token: this.dataservice.getUserData(),
                type: 1,
                community_id: params.id
            };
            this.chatconnect.postData(apidata, "view_community_by_id").then(function (result) {
                console.log("This is result", result.Response.community_data);
                if (result.Response.status == 1) {
                    _this.dataservice.setCommunityData(result.Response.community_data);
                    _this._router.navigate(['/community-details']);
                }
                else {
                    _this.commonservice.presentToast("Oops", result.Response.message);
                }
            }, function (err) {
                console.log("Connection failed Messge");
            });
        }
    };
    DashboardPage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    DashboardPage.prototype.formatDate = function (time) {
        var dummyDate = new Date();
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        var formattedTime = this.datePipe.transform(dummyDate, 'h:mm a');
        return formattedTime || time;
    };
    DashboardPage.prototype.view_details = function (params) {
        console.log("This is Event Details ==> ", params);
        if (params.event_for == 'multiple_event') {
            this._router.navigate(['pages/multieventdetails', { multievent_id: params.id }]);
        }
        else {
            this.dataservice.setEventData(params);
            this._router.navigate(['/detailseve']);
        }
    };
    DashboardPage.prototype.view_event_details = function (params) {
        this.dataservice.setEventData(params);
        this._router.navigate(['/detailseve']);
    };
    DashboardPage.prototype.view_community_details = function (params) {
        this.dataservice.setCommunityData(params);
        this._router.navigate(['/community-details']);
    };
    DashboardPage.prototype.view_insight = function (params) {
        this.dataservice.setInsightData(params);
        this._router.navigate(['/insights']);
    };
    DashboardPage.prototype.GoToEvents = function (params) {
        this._router.navigate(['/events/allevent', { view_event: params }]);
    };
    DashboardPage.prototype.GoToCommunity = function (params) {
        this._router.navigate(['/allcommunity', { view_community: params }]);
    };
    DashboardPage.prototype.compareObjects = function (object1, object2, key) {
        var _a, _b;
        var obj1 = (_a = object1[key]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        var obj2 = (_b = object2[key]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
        if (obj1 < obj2) {
            return -1;
        }
        if (obj1 > obj2) {
            return 1;
        }
        return 0;
    };
    __decorate([
        core_1.ViewChild('showCal')
    ], DashboardPage.prototype, "showCal");
    __decorate([
        core_1.ViewChild('searchBar', { read: core_1.ElementRef })
    ], DashboardPage.prototype, "searchBarRef");
    DashboardPage = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss']
        })
    ], DashboardPage);
    return DashboardPage;
}());
exports.DashboardPage = DashboardPage;
