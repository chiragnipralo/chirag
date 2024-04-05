import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiEventPageRoutingModule } from './multi-event-routing.module';

import { MultiEventPage } from './multi-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MultiEventPageRoutingModule
  ],
  declarations: [MultiEventPage]
})
export class MultiEventPageModule {}
