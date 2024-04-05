import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsevePage } from './detailseve.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsevePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsevePageRoutingModule {}
