import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewstatsPage } from './viewstats.page';

const routes: Routes = [
  {
    path: '',
    component: ViewstatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewstatsPageRoutingModule {}
