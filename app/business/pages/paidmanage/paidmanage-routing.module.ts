import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaidmanagePage } from './paidmanage.page';

const routes: Routes = [
  {
    path: '',
    component: PaidmanagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidmanagePageRoutingModule {}
