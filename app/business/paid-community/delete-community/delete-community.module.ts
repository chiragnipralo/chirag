import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCommunityPageRoutingModule } from './delete-community-routing.module';

import { DeleteCommunityPage } from './delete-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeleteCommunityPageRoutingModule
  ],
  declarations: [DeleteCommunityPage]
})
export class DeleteCommunityPageModule {}
