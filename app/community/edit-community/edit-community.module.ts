import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditCommunityPageRoutingModule } from './edit-community-routing.module';
import { EditCommunityPage } from './edit-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCommunityPageRoutingModule
  ],
  declarations: [EditCommunityPage]
})
export class EditCommunityPageModule {}
