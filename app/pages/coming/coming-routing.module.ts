import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingPage } from './coming.page';

const routes: Routes = [
  {
    path: '',
    component: ComingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComingPageRoutingModule {}
