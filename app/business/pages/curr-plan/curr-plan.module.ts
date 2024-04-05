import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrPlanPageRoutingModule } from './curr-plan-routing.module';

import { CurrPlanPage } from './curr-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrPlanPageRoutingModule
  ],
  declarations: [CurrPlanPage]
})
export class CurrPlanPageModule {}
