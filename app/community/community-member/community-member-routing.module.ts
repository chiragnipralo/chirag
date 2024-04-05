import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityMemberPage } from './community-member.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityMemberPageRoutingModule {}
