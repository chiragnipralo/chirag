import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResOtpPage } from './res-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ResOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResOtpPageRoutingModule {}
