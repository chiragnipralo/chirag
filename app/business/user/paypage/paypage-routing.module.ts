import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypagePage } from './paypage.page';

const routes: Routes = [
  {
    path: '',
    component: PaypagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypagePageRoutingModule {}
