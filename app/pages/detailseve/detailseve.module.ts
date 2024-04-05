import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsevePageRoutingModule } from './detailseve-routing.module';

import { DetailsevePage } from './detailseve.page';
import { ShareButtonComponent } from 'src/app/components/share-button/share-button.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailsevePageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [DetailsevePage,ShareButtonComponent]
})
export class DetailsevePageModule {}
