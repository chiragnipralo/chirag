import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatContactPage } from './chat-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ChatContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatContactPageRoutingModule {}
