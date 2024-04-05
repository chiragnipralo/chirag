import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageqrPageRoutingModule } from './manageqr-routing.module';

import { ManageqrPage } from './manageqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageqrPageRoutingModule
  ],
  declarations: [ManageqrPage]
})
export class ManageqrPageModule {}
