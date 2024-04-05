import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { BuzregisterPageRoutingModule } from './buzregister-routing.module';
import { BuzregisterPage } from './buzregister.page';

const routes: Routes = [
  {
    path: '',
    component: BuzregisterPage
  }
];

@NgModule({
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule,
    ReactiveFormsModule,
    BuzregisterPageRoutingModule
  ],
  declarations: [BuzregisterPage]
})
export class BuzregisterPageModule {}
