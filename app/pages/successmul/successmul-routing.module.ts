import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessmulPage } from './successmul.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessmulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessmulPageRoutingModule {}
