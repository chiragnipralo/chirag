import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitedMemberPageRoutingModule } from './invited-member-routing.module';

import { InvitedMemberPage } from './invited-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitedMemberPageRoutingModule
  ],
  declarations: [InvitedMemberPage]
})
export class InvitedMemberPageModule {}
