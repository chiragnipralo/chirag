import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutCommunityPageRoutingModule } from './about-community-routing.module';

import { AboutCommunityPage } from './about-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutCommunityPageRoutingModule
  ],
  declarations: [AboutCommunityPage]
})
export class AboutCommunityPageModule {}
