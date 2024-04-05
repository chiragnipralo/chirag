import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydemoPageRoutingModule } from './paydemo-routing.module';

import { PaydemoPage } from './paydemo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaydemoPageRoutingModule
  ],
  declarations: [PaydemoPage]
})
export class PaydemoPageModule {}
