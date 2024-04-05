import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayhistoryPage } from './payhistory.page';

const routes: Routes = [
  {
    path: '',
    component: PayhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayhistoryPageRoutingModule {}
