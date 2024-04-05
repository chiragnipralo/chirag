import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSamitiPage } from './add-samiti.page';

const routes: Routes = [
  {
    path: '',
    component: AddSamitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSamitiPageRoutingModule {}
