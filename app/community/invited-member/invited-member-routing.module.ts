import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitedMemberPage } from './invited-member.page';

const routes: Routes = [
  {
    path: '',
    component: InvitedMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitedMemberPageRoutingModule {}
