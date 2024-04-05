import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaidmanagePageRoutingModule } from './paidmanage-routing.module';

import { PaidmanagePage } from './paidmanage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaidmanagePageRoutingModule
  ],
  declarations: [PaidmanagePage]
})
export class PaidmanagePageModule {}
