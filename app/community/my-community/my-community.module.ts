import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCommunityPageRoutingModule } from './my-community-routing.module';

import { MyCommunityPage } from './my-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCommunityPageRoutingModule
  ],
  declarations: [MyCommunityPage]
})
export class MyCommunityPageModule {}
