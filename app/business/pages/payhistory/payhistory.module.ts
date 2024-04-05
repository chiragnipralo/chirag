import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayhistoryPageRoutingModule } from './payhistory-routing.module';

import { PayhistoryPage } from './payhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayhistoryPageRoutingModule
  ],
  declarations: [PayhistoryPage]
})
export class PayhistoryPageModule {}
