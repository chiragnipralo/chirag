import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailsPageRoutingModule } from './event-details-routing.module';

import { EventDetailsPage } from './event-details.page';
import { DatePipe } from '@angular/common';
// import { ShareButtonComponent } from 'src/app/components/share-button/share-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EventDetailsPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule {}
