import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreevePageRoutingModule } from './exploreeve-routing.module';
import { ExploreevePage } from './exploreeve.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreevePageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [ExploreevePage]
})
export class ExploreevePageModule {}
