import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMoreGuestPage } from './add-more-guest.page';

const routes: Routes = [
  {
    path: '',
    component: AddMoreGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMoreGuestPageRoutingModule {}
