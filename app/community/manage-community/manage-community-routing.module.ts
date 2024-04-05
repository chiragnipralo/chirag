import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCommunityPage } from './manage-community.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCommunityPageRoutingModule {}
