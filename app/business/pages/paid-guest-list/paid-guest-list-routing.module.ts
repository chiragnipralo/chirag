import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaidGuestListPage } from './paid-guest-list.page';

const routes: Routes = [
  {
    path: '',
    component: PaidGuestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidGuestListPageRoutingModule {}
