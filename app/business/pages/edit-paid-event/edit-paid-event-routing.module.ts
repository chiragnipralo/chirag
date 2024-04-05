import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPaidEventPage } from './edit-paid-event.page';

const routes: Routes = [
  {
    path: '',
    component: EditPaidEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPaidEventPageRoutingModule {}
