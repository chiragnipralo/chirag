import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AllmemberPageRoutingModule } from './allmember-routing.module';
import { AllmemberPage } from './allmember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AllmemberPageRoutingModule
  ],
  declarations: [AllmemberPage]
})
export class AllmemberPageModule {}
