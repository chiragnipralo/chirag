import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllmemberPage } from './allmember.page';

const routes: Routes = [
  {
    path: '',
    component: AllmemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllmemberPageRoutingModule {}
