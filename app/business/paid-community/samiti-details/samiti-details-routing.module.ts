import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SamitiDetailsPage } from './samiti-details.page';

const routes: Routes = [
  {
    path: '',
    component: SamitiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamitiDetailsPageRoutingModule {}
