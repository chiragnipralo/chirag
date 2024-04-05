import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutCommunityPage } from './about-community.page';

const routes: Routes = [
  {
    path: '',
    component: AboutCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutCommunityPageRoutingModule {}
