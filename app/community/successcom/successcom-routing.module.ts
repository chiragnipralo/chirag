import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccesscomPage } from './successcom.page';

const routes: Routes = [
  {
    path: '',
    component: SuccesscomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccesscomPageRoutingModule {}
