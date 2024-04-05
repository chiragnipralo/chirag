import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddObituryPage } from './add-obitury.page';

const routes: Routes = [
  {
    path: '',
    component: AddObituryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddObituryPageRoutingModule {}
