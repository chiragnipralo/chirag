import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalcardPageRoutingModule } from './personalcard-routing.module';

import { PersonalcardPage } from './personalcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalcardPageRoutingModule
  ],
  declarations: [PersonalcardPage]
})
export class PersonalcardPageModule {}
