import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilecardsPageRoutingModule } from './profilecards-routing.module';

import { ProfilecardsPage } from './profilecards.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfilecardsPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ProfilecardsPageRoutingModule
  ],
  declarations: [ProfilecardsPage]
})
export class ProfilecardsPageModule {}
