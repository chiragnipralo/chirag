import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlleventPage } from './allevent.page';

const routes: Routes = [
  {
    path: '',
    component: AlleventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlleventPageRoutingModule {}
