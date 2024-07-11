import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePlanPageRoutingModule } from './choose-plan-routing.module';

import { ChoosePlanPage } from './choose-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePlanPageRoutingModule
  ],
  declarations: [ChoosePlanPage],
  providers: [FormBuilder] // Add FormBuilder to the providers array

})
export class ChoosePlanPageModule {}
