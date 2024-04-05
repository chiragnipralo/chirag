import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCommunityEventPage } from './all-community-event.page';

const routes: Routes = [
  {
    path: '',
    component: AllCommunityEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCommunityEventPageRoutingModule {}
