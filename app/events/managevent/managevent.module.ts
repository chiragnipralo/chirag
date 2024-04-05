import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageventPageRoutingModule } from './managevent-routing.module';

import { ManageventPage } from './managevent.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageventPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [ManageventPage]
})
export class ManageventPageModule {}
