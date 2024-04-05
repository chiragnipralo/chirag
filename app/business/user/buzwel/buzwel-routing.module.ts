import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzwelPage } from './buzwel.page';

const routes: Routes = [
  {
    path: '',
    component: BuzwelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzwelPageRoutingModule {}
