import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReinvitePage } from './reinvite.page';

const routes: Routes = [
  {
    path: '',
    component: ReinvitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReinvitePageRoutingModule {}
