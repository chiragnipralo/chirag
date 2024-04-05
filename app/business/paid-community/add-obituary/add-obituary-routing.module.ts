import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddObituaryPage } from './add-obituary.page';

const routes: Routes = [
  {
    path: '',
    component: AddObituaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddObituaryPageRoutingModule {}
