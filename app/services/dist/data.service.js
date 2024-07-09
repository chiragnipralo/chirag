"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataService = /** @class */ (function () {
    function DataService(_router, _location, authservice) {
        this._router = _router;
        this._location = _location;
        this.authservice = authservice;
        this.storageKey = 'activityData';
        this.initialHref = window.location.href;
        this.show_branch_view = new rxjs_1.BehaviorSubject(false);
        this.all_contacts = [];
        this.staff_data = {};
        // user_event_data:any;
        this.user_event_data = {};
        this.user_community_data = {};
        this.user_event_chat_data = {};
        this.user_profile_data = {};
        this.emergency_contact = [];
        this.events_form = [];
        this.events_categories = [];
        this.age_groups = [];
        this.foodImages = [];
        this.events_languages = [];
        this.events_fooditems = [];
        this.cusines_items = [];
        this.events_custom_fooditems = [];
        this.events_manager = [];
        this.events_guests = [];
        this.TicketList = [];
        this.events_activities = [];
        this.home_slider = [];
        this.set_user_signup = {};
        this.community_member = [];
        this.community_event_or_not = [];
        this.favourites = [{ id: 1, name: 'Religion', checked: false }, { id: 2, name: 'Sports', checked: false }, { id: 3, name: 'Children', checked: false }, { id: 4, name: 'Pets', checked: false }, { id: 5, name: 'Study', checked: false }, { id: 6, name: 'Art', checked: false }, { id: 7, name: 'Movies', checked: false }, { id: 8, name: 'Restaurant', checked: false }, { id: 9, name: 'Games', checked: false }];
    }
    DataService.prototype.setOtp = function (data) {
        this.otp = data;
    };
    DataService.prototype.getOtp = function () {
        var _a;
        return (_a = this.otp) === null || _a === void 0 ? void 0 : _a.toString();
    };
    DataService.prototype.getUserData = function () {
        return localStorage.getItem('user');
    };
    DataService.prototype.isNullOrUndefined = function (data) {
        console.log("imcoming locaal dats-->", data);
        console.log(typeof data);
        if ((data == null && data == undefined && data == "") || typeof data === 'object') {
            return true;
        }
        else {
            return false;
        }
    };
    DataService.prototype.ValidateArray = function (array) {
        if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    DataService.prototype.ValidateObject = function (obj) {
        if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
            return true;
        }
        else {
            return false;
        }
    };
    DataService.prototype.setItem = function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    };
    DataService.prototype.getItem = function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    };
    DataService.prototype.getInitials = function (x) {
        if (x) {
            var seperateWords = x.split(" ");
            var acronym = "";
            for (var i = 0; i < seperateWords.length; i++) {
                acronym = (acronym + seperateWords[i].substr(0, 1));
            }
            return acronym;
        }
    };
    /**
     * Convert BASE64 to BLOB
     * @param base64Image Pass Base64 image data to convert into the BLOB
     */
    DataService.prototype.convertBase64ToBlob = function (base64Image) {
        // console.log("base64Image ---->",base64Image);
        // Split into two parts
        var parts = base64Image.split(';base64,');
        // Hold the content type
        var imageType = parts[0].split(':')[1];
        // Decode Base64 string
        var decodedData = window.atob(parts[1]);
        // Create UNIT8ARRAY of size same as row data length
        var uInt8Array = new Uint8Array(decodedData.length);
        // Insert all character code into uInt8Array
        for (var i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        // Return BLOB image after conversion
        return new Blob([uInt8Array], { type: imageType });
    };
    DataService.prototype.blobToBase64 = function (blob) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(function (resolve) {
            reader.onloadend = function () {
                resolve(reader.result);
            };
        });
    };
    ;
    DataService.prototype.setUserData = function (useriddetails) {
        localStorage.setItem('user', useriddetails);
    };
    DataService.prototype.setAccountuser = function (accountiddetails) {
        this.user_account_data = accountiddetails;
    };
    DataService.prototype.GetAccountuser = function () {
        return this.user_account_data;
    };
    DataService.prototype.setEventData = function (evparams) {
        this.user_event_data = evparams;
        // localStorage.setItem('user',useriddetails);
    };
    DataService.prototype.GetEventData = function () {
        return this.user_event_data;
    };
    DataService.prototype.setCommunityData = function (evparams) {
        this.user_community_data = evparams;
        // localStorage.setItem('user',useriddetails);
    };
    DataService.prototype.GetCommunityData = function () {
        return this.user_community_data;
    };
    DataService.prototype.setInsightData = function (evparams) {
        this.insight_data = evparams;
    };
    DataService.prototype.GetInsightData = function () {
        return this.insight_data;
    };
    DataService.prototype.setTicketData = function (evparams) {
        this.ticket_data = evparams;
    };
    DataService.prototype.GetTicketData = function () {
        return this.ticket_data;
    };
    DataService.prototype.clearUserData = function () {
        localStorage.clear();
        this.authservice.isAuthenticated.next(false);
        this._router.navigate(['home']);
    };
    Object.defineProperty(DataService.prototype, "isUserLoggedIn", {
        get: function () {
            var data = localStorage.getItem('user');
            return data ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    DataService.prototype.saveActivity = function (activity) {
        // Get existing activity data from localStorage or initialize an empty array
        var existingData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        // Add the new activity to the existing data
        existingData.push(activity);
        // Save the updated data back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(existingData));
    };
    DataService.prototype.getActivityData = function () {
        // Retrieve activity data from localStorage
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
