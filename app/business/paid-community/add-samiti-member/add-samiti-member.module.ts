import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSamitiMemberPageRoutingModule } from './add-samiti-member-routing.module';

import { AddSamitiMemberPage } from './add-samiti-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSamitiMemberPageRoutingModule
  ],
  declarations: [AddSamitiMemberPage]
})
export class AddSamitiMemberPageModule {}
