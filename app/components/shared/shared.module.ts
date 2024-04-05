import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgcropperComponent } from '../imgcropper/imgcropper.component';
import { HammerModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { PaymentComponent } from '../payment/payment.component';

@NgModule({
  declarations: [
    ImgcropperComponent,ImageModalComponent,PaymentComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    HammerModule,
    ReactiveFormsModule,
    IonicModule,
    ],exports: [
    ImgcropperComponent,ImageModalComponent,PaymentComponent],
  })
export class SharedModule { }
