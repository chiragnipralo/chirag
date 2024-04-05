import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityDeletePageRoutingModule } from './community-delete-routing.module';

import { CommunityDeletePage } from './community-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommunityDeletePageRoutingModule
  ],
  declarations: [CommunityDeletePage]
})
export class CommunityDeletePageModule {}
