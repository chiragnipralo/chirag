import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InviteeventPageRoutingModule } from './inviteevent-routing.module';
import { InviteeventPage } from './inviteevent.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteeventPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [InviteeventPage]
})
export class InviteeventPageModule {}
