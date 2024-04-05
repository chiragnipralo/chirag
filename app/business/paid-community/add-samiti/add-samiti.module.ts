import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSamitiPageRoutingModule } from './add-samiti-routing.module';

import { AddSamitiPage } from './add-samiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSamitiPageRoutingModule
  ],
  declarations: [AddSamitiPage]
})
export class AddSamitiPageModule {}
