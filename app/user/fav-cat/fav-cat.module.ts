import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCatPageRoutingModule } from './fav-cat-routing.module';

import { FavCatPage } from './fav-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCatPageRoutingModule
  ],
  declarations: [FavCatPage]
})
export class FavCatPageModule {}
