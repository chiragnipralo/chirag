import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageventPage } from './managevent.page';

const routes: Routes = [
  {
    path: '',
    component: ManageventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageventPageRoutingModule {}
