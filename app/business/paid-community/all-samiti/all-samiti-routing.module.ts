import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSamitiPage } from './all-samiti.page';

const routes: Routes = [
  {
    path: '',
    component: AllSamitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSamitiPageRoutingModule {}
