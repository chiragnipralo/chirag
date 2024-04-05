import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComingPageRoutingModule } from './coming-routing.module';

import { ComingPage } from './coming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComingPageRoutingModule
  ],
  declarations: [ComingPage]
})
export class ComingPageModule {}
