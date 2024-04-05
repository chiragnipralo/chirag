import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcardPage } from './editcard.page';

const routes: Routes = [
  {
    path: '',
    component: EditcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
  
export class EditcardPageRoutingModule {}