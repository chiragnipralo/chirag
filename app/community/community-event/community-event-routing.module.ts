import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityEventPage } from './community-event.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityEventPageRoutingModule {}
