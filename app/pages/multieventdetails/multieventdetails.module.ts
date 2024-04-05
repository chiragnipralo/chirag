import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultieventdetailsPageRoutingModule } from './multieventdetails-routing.module';

import { MultieventdetailsPage } from './multieventdetails.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultieventdetailsPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [MultieventdetailsPage]
})
export class MultieventdetailsPageModule {}
