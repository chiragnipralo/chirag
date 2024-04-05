import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumCommunityDetailsPageRoutingModule } from './premium-community-details-routing.module';

import { PremiumCommunityDetailsPage } from './premium-community-details.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumCommunityDetailsPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [PremiumCommunityDetailsPage]
})
export class PremiumCommunityDetailsPageModule {}
