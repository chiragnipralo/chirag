import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityDeletePage } from './community-delete.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityDeletePageRoutingModule {}
