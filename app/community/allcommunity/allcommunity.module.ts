import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcommunityPageRoutingModule } from './allcommunity-routing.module';

import { AllcommunityPage } from './allcommunity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcommunityPageRoutingModule
  ],
  declarations: [AllcommunityPage]
})
export class AllcommunityPageModule {}
