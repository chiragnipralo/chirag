import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SamitiDetailsPageRoutingModule } from './samiti-details-routing.module';

import { SamitiDetailsPage } from './samiti-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SamitiDetailsPageRoutingModule
  ],
  declarations: [SamitiDetailsPage]
})
export class SamitiDetailsPageModule {}
