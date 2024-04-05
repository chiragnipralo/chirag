import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCommunityEventPageRoutingModule } from './all-community-event-routing.module';
import { DatePipe } from '@angular/common';
import { AllCommunityEventPage } from './all-community-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCommunityEventPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AllCommunityEventPage]
})
export class AllCommunityEventPageModule {}
