import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcardPageRoutingModule } from './editcard-routing.module';

import { EditcardPage } from './editcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditcardPageRoutingModule
  ],
  declarations: [EditcardPage]
})
export class EditcardPageModule {}

