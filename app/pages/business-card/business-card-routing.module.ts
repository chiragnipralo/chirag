import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessCardPage } from './business-card.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessCardPageRoutingModule {}
