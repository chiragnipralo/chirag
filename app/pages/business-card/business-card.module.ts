import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessCardPageRoutingModule } from './business-card-routing.module';

import { BusinessCardPage } from './business-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessCardPageRoutingModule
  ],
  declarations: [BusinessCardPage]
})
export class BusinessCardPageModule {}
