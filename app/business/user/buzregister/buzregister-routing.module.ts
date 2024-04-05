import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzregisterPage } from './buzregister.page';

const routes: Routes = [
  {
    path: '',
    component: BuzregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzregisterPageRoutingModule {}
