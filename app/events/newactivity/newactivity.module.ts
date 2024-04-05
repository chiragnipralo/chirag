import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewactivityPageRoutingModule } from './newactivity-routing.module';

import { NewactivityPage } from './newactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewactivityPageRoutingModule
  ],
  declarations: [NewactivityPage]
})
export class NewactivityPageModule {}
