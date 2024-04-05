import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumCommunityDetailsPage } from './premium-community-details.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumCommunityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumCommunityDetailsPageRoutingModule {}
