import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcommunityPage } from './allcommunity.page';

const routes: Routes = [
  {
    path: '',
    component: AllcommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcommunityPageRoutingModule {}
