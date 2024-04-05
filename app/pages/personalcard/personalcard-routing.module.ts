import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalcardPage } from './personalcard.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalcardPageRoutingModule {}
