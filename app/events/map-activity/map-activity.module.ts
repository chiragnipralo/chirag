import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapActivityPageRoutingModule } from './map-activity-routing.module';

import { MapActivityPage } from './map-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapActivityPageRoutingModule
  ],
  declarations: [MapActivityPage]
})
export class MapActivityPageModule {}
