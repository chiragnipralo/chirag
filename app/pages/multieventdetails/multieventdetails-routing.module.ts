import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultieventdetailsPage } from './multieventdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MultieventdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultieventdetailsPageRoutingModule {}
