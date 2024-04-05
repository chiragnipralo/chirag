import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPaymentPageRoutingModule } from './event-payment-routing.module';

import { EventPaymentPage } from './event-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPaymentPageRoutingModule
  ],
  declarations: [EventPaymentPage]
})
export class EventPaymentPageModule {}
