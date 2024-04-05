import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityMemberPageRoutingModule } from './community-member-routing.module';

import { CommunityMemberPage } from './community-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityMemberPageRoutingModule
  ],
  declarations: [CommunityMemberPage]
})
export class CommunityMemberPageModule {}
