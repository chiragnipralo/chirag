import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsearchPageRoutingModule } from './eventsearch-routing.module';

import { EventsearchPage } from './eventsearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsearchPageRoutingModule
  ],
  declarations: [EventsearchPage]
})
export class EventsearchPageModule {}
