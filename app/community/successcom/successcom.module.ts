import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccesscomPageRoutingModule } from './successcom-routing.module';

import { SuccesscomPage } from './successcom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccesscomPageRoutingModule
  ],
  declarations: [SuccesscomPage]
})
export class SuccesscomPageModule {}
