import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCommunityPage } from './my-community.page';

const routes: Routes = [
  {
    path: '',
    component: MyCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCommunityPageRoutingModule {}
