import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCommunityPage } from './edit-community.page';

const routes: Routes = [
  {
    path: '',
    component: EditCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCommunityPageRoutingModule {}
