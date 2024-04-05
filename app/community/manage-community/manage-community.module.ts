import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCommunityPageRoutingModule } from './manage-community-routing.module';

import { ManageCommunityPage } from './manage-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCommunityPageRoutingModule
  ],
  declarations: [ManageCommunityPage]
})
export class ManageCommunityPageModule {}
