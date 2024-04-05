import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AlleventPageRoutingModule } from './allevent-routing.module';
import { AlleventPage } from './allevent.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlleventPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AlleventPage]
})
export class AlleventPageModule {}
