import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPaymentPage } from './event-payment.page';

const routes: Routes = [
  {
    path: '',
    component: EventPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPaymentPageRoutingModule {}
