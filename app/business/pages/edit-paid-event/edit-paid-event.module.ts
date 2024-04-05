import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPaidEventPageRoutingModule } from './edit-paid-event-routing.module';

import { EditPaidEventPage } from './edit-paid-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditPaidEventPageRoutingModule
  ],
  declarations: [EditPaidEventPage]
})
export class EditPaidEventPageModule {}
