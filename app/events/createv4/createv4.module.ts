import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Createv4PageRoutingModule } from './createv4-routing.module';

import { Createv4Page } from './createv4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Createv4PageRoutingModule
  ],
  declarations: [Createv4Page]
})
export class Createv4PageModule {}
