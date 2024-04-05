import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddObituryPageRoutingModule } from './add-obitury-routing.module';

import { AddObituryPage } from './add-obitury.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddObituryPageRoutingModule
  ],
  declarations: [AddObituryPage]
})
export class AddObituryPageModule {}
