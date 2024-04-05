import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuzwelPageRoutingModule } from './buzwel-routing.module';

import { BuzwelPage } from './buzwel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuzwelPageRoutingModule
  ],
  declarations: [BuzwelPage]
})
export class BuzwelPageModule {}
