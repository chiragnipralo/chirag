import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoreGuestPageRoutingModule } from './add-more-guest-routing.module';

import { AddMoreGuestPage } from './add-more-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddMoreGuestPageRoutingModule
  ],
  declarations: [AddMoreGuestPage]
})
export class AddMoreGuestPageModule {}
