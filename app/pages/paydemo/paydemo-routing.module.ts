import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaydemoPage } from './paydemo.page';

const routes: Routes = [
  {
    path: '',
    component: PaydemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaydemoPageRoutingModule {}
