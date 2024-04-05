import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePermPage } from './create-perm.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePermPageRoutingModule {}
