import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddObituaryPageRoutingModule } from './add-obituary-routing.module';

import { AddObituaryPage } from './add-obituary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddObituaryPageRoutingModule
  ],
  declarations: [AddObituaryPage]
})
export class AddObituaryPageModule {}
