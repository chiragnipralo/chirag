import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityEventPageRoutingModule } from './community-event-routing.module';

import { CommunityEventPage } from './community-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityEventPageRoutingModule
  ],
  declarations: [CommunityEventPage]
})
export class CommunityEventPageModule {}
