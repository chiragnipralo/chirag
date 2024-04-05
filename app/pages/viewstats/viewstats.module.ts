import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewstatsPageRoutingModule } from './viewstats-routing.module';

import { ViewstatsPage } from './viewstats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewstatsPageRoutingModule
  ],
  declarations: [ViewstatsPage]
})
export class ViewstatsPageModule {}
