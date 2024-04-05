import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExeplorecomPageRoutingModule } from './exeplorecom-routing.module';

import { ExeplorecomPage } from './exeplorecom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExeplorecomPageRoutingModule
  ],
  declarations: [ExeplorecomPage]
})
export class ExeplorecomPageModule {}
