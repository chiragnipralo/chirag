import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ResOtpPageRoutingModule } from './res-otp-routing.module';
import { ResOtpPage } from './res-otp.page';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResOtpPageRoutingModule
  ],
  declarations: [ResOtpPage],
  providers: [SmsRetriever]
})
export class ResOtpPageModule {}
