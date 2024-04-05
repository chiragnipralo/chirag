import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiEventPage } from './multi-event.page';

const routes: Routes = [
  {
    path: '',
    component: MultiEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiEventPageRoutingModule {}
