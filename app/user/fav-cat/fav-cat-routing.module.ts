import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavCatPage } from './fav-cat.page';

const routes: Routes = [
  {
    path: '',
    component: FavCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavCatPageRoutingModule {}
