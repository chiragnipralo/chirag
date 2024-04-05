import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteeventPage } from './inviteevent.page';

const routes: Routes = [
  {
    path: '',
    component: InviteeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteeventPageRoutingModule {}
