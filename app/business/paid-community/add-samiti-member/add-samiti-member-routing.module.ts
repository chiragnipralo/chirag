import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSamitiMemberPage } from './add-samiti-member.page';

const routes: Routes = [
  {
    path: '',
    component: AddSamitiMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSamitiMemberPageRoutingModule {}
