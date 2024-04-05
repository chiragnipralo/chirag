import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypagePageRoutingModule } from './paypage-routing.module';

import { PaypagePage } from './paypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypagePageRoutingModule
  ],
  declarations: [PaypagePage]
})
export class PaypagePageModule {}
