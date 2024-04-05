import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberRequestPageRoutingModule } from './member-request-routing.module';

import { MemberRequestPage } from './member-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberRequestPageRoutingModule
  ],
  declarations: [MemberRequestPage]
})
export class MemberRequestPageModule {}
