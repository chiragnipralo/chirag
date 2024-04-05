import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityDetailsPageRoutingModule } from './community-details-routing.module';

import { CommunityDetailsPage } from './community-details.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityDetailsPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [CommunityDetailsPage]
})
export class CommunityDetailsPageModule {}
