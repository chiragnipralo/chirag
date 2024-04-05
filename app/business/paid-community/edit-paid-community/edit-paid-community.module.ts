import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPaidCommunityPageRoutingModule } from './edit-paid-community-routing.module';

import { EditPaidCommunityPage } from './edit-paid-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPaidCommunityPageRoutingModule
  ],
  declarations: [EditPaidCommunityPage]
})
export class EditPaidCommunityPageModule {}
