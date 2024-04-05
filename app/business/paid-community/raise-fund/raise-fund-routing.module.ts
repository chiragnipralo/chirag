import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaiseFundPage } from './raise-fund.page';

const routes: Routes = [
  {
    path: '',
    component: RaiseFundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaiseFundPageRoutingModule {}
