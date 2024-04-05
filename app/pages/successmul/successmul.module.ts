import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessmulPageRoutingModule } from './successmul-routing.module';

import { SuccessmulPage } from './successmul.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessmulPageRoutingModule
  ],
  declarations: [SuccessmulPage]
})
export class SuccessmulPageModule {}
