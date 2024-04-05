import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyeventPageRoutingModule } from './myevent-routing.module';
import { MyeventPage } from './myevent.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyeventPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [MyeventPage]
})
export class MyeventPageModule {}
