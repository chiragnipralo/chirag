import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventTypePageRoutingModule } from './event-type-routing.module';

import { EventTypePage } from './event-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventTypePageRoutingModule
  ],
  declarations: [EventTypePage]
})
export class EventTypePageModule {}
