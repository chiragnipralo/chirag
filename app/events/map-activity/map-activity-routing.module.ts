import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapActivityPage } from './map-activity.page';

const routes: Routes = [
  {
    path: '',
    component: MapActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapActivityPageRoutingModule {}
