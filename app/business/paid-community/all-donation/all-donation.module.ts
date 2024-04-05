import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDonationPageRoutingModule } from './all-donation-routing.module';

import { AllDonationPage } from './all-donation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDonationPageRoutingModule
  ],
  declarations: [AllDonationPage]
})
export class AllDonationPageModule {}
