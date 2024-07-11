import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { ChoosePlanPageRoutingModule } from './choose-plan-routing.module';

import { ChoosePlanPage } from './choose-plan.page';
const routes: Routes = [
  {
    path: '',
    component: ChoosePlanPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePlanPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  declarations: [ChoosePlanPage]
})
export class ChoosePlanPageModule {}
