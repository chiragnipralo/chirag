import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyeventPage } from './myevent.page';

const routes: Routes = [
  {
    path: '',
    component: MyeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyeventPageRoutingModule {}
