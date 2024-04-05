import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketlistPage } from './ticketlist.page';

const routes: Routes = [
  {
    path: '',
    component: TicketlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketlistPageRoutingModule {}
