import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExeplorecomPage } from './exeplorecom.page';

const routes: Routes = [
  {
    path: '',
    component: ExeplorecomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExeplorecomPageRoutingModule {}
