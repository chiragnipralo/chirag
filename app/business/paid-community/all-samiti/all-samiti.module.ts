import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSamitiPageRoutingModule } from './all-samiti-routing.module';

import { AllSamitiPage } from './all-samiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSamitiPageRoutingModule
  ],
  declarations: [AllSamitiPage]
})
export class AllSamitiPageModule {}
