import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewactivityPage } from './newactivity.page';

const routes: Routes = [
  {
    path: '',
    component: NewactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewactivityPageRoutingModule {}
