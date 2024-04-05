import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Createv4Page } from './createv4.page';

const routes: Routes = [
  {
    path: '',
    component: Createv4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Createv4PageRoutingModule {}
