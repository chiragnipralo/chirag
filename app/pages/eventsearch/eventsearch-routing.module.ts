import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsearchPage } from './eventsearch.page';

const routes: Routes = [
  {
    path: '',
    component: EventsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsearchPageRoutingModule {}
