import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { PaidGuestListPageRoutingModule } from './paid-guest-list-routing.module';

import { PaidGuestListPage } from './paid-guest-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaidGuestListPageRoutingModule
  ],
  providers: [NavParams],
  declarations: [PaidGuestListPage]
})
export class PaidGuestListPageModule {}
