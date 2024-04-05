import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatContactPageRoutingModule } from './chat-contact-routing.module';

import { ChatContactPage } from './chat-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatContactPageRoutingModule
  ],
  declarations: [ChatContactPage]
})
export class ChatContactPageModule {}
