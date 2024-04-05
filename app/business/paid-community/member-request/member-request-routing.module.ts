import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberRequestPage } from './member-request.page';

const routes: Routes = [
  {
    path: '',
    component: MemberRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRequestPageRoutingModule {}
