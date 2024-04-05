import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllObituaryPageRoutingModule } from './all-obituary-routing.module';

import { AllObituaryPage } from './all-obituary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllObituaryPageRoutingModule
  ],
  declarations: [AllObituaryPage]
})
export class AllObituaryPageModule {}
