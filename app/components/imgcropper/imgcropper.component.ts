import { Component, OnInit ,ViewChild} from '@angular/core';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { ModalController, NavParams } from '@ionic/angular';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper'; 

@Component({
  selector: 'app-imgcropper',
  templateUrl: './imgcropper.component.html',
  styleUrls: ['./imgcropper.component.scss'],
})
export class ImgcropperComponent implements OnInit {

  @ViewChild('cropper')
  cropper!: ImageCropperComponent;
  myImage: any = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  transform: ImageTransform = {};

  constructor( public commonservice:CommonService,
    public dataservice: DataService,
    private modalController: ModalController, 
    ) { }

  ngOnInit(){
    // console.log(this.global.global_base_path)
  }

  imageLoaded() {
  // this.loadingCtrl.dismiss();
  }

  // Called when we finished editing (because autoCrop is set to false)
  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
    // console.log(this.croppedImage)
  }

  // We encountered a problem while loading the image
  loadImageFailed() {
    console.log('Image load failed!');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // Manually trigger the crop
  cropImage(){
    if (this.cropper && this.cropper.crop() && this.cropper.crop()!.base64) {
      this.croppedImage = this.cropper.crop()!.base64;
    }
    this.myImage = null;
    this.modalController.dismiss({
      'dismissed': true,
      'cropped_image': this.croppedImage,
    });

  }

  close() {
    // localStorage.removeItem('event_images');
    // localStorage.removeItem('menu_imgData');
    this.myImage = null;
    this.croppedImage = null;
    this.modalController.dismiss();
  }
  // Discard all changes
  discardChanges() {
    this.myImage = null;
    this.croppedImage = null;
  }

  // Edit the image
  rotate() {
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;

    this.transform = {
      ...this.transform,
      rotate: newValue,
    };
  }


  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

}