import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePermPageRoutingModule } from './create-perm-routing.module';

import { CreatePermPage } from './create-perm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePermPageRoutingModule
  ],
  declarations: [CreatePermPage]
})
export class CreatePermPageModule {}
