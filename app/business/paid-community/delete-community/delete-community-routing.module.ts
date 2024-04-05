import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCommunityPage } from './delete-community.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCommunityPageRoutingModule {}
