import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReinvitePageRoutingModule } from './reinvite-routing.module';

import { ReinvitePage } from './reinvite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReinvitePageRoutingModule
  ],
  declarations: [ReinvitePage]
})
export class ReinvitePageModule {}
