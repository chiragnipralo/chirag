"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImgcropperComponent = void 0;
var core_1 = require("@angular/core");
var ImgcropperComponent = /** @class */ (function () {
    function ImgcropperComponent(commonservice, dataservice, modalController) {
        this.commonservice = commonservice;
        this.dataservice = dataservice;
        this.modalController = modalController;
        this.myImage = null;
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.scale = 1;
        this.transform = {};
    }
    ImgcropperComponent.prototype.ngOnInit = function () {
        // console.log(this.global.global_base_path)
    };
    ImgcropperComponent.prototype.imageLoaded = function () {
        // this.loadingCtrl.dismiss();
    };
    // Called when we finished editing (because autoCrop is set to false)
    ImgcropperComponent.prototype.imageCropped = function (event) {
        this.croppedImage = event.base64;
        // console.log(this.croppedImage)
    };
    // We encountered a problem while loading the image
    ImgcropperComponent.prototype.loadImageFailed = function () {
        console.log('Image load failed!');
    };
    ImgcropperComponent.prototype.fileChangeEvent = function (event) {
        this.imageChangedEvent = event;
    };
    // Manually trigger the crop
    ImgcropperComponent.prototype.cropImage = function () {
        if (this.cropper && this.cropper.crop() && this.cropper.crop().base64) {
            this.croppedImage = this.cropper.crop().base64;
        }
        this.myImage = null;
        this.modalController.dismiss({
            'dismissed': true,
            'cropped_image': this.croppedImage
        });
    };
    ImgcropperComponent.prototype.close = function () {
        // localStorage.removeItem('event_images');
        // localStorage.removeItem('menu_imgData');
        this.myImage = null;
        this.croppedImage = null;
        this.modalController.dismiss();
    };
    // Discard all changes
    ImgcropperComponent.prototype.discardChanges = function () {
        this.myImage = null;
        this.croppedImage = null;
    };
    // Edit the image
    ImgcropperComponent.prototype.rotate = function () {
        var _a;
        var newValue = (((_a = this.transform.rotate) !== null && _a !== void 0 ? _a : 0) + 90) % 360;
        this.transform = __assign(__assign({}, this.transform), { rotate: newValue });
    };
    ImgcropperComponent.prototype.zoomOut = function () {
        var minScale = 0.1;
        this.scale = Math.max(minScale, this.scale - 0.1);
        this.transform = __assign(__assign({}, this.transform), { scale: this.scale });
    };
    ImgcropperComponent.prototype.zoomIn = function () {
        var maxScale = 3.0;
        this.scale = Math.min(maxScale, this.scale + 0.1);
        this.transform = __assign(__assign({}, this.transform), { scale: this.scale });
    };
    __decorate([
        core_1.ViewChild('cropper')
    ], ImgcropperComponent.prototype, "cropper");
    ImgcropperComponent = __decorate([
        core_1.Component({
            selector: 'app-imgcropper',
            templateUrl: './imgcropper.component.html',
            styleUrls: ['./imgcropper.component.scss']
        })
    ], ImgcropperComponent);
    return ImgcropperComponent;
}());
exports.ImgcropperComponent = ImgcropperComponent;
