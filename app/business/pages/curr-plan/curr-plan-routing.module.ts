import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrPlanPage } from './curr-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CurrPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrPlanPageRoutingModule {}
