import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketlistPageRoutingModule } from './ticketlist-routing.module';

import { TicketlistPage } from './ticketlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketlistPageRoutingModule
  ],
  declarations: [TicketlistPage]
})
export class TicketlistPageModule {}
