import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDonationPage } from './all-donation.page';

const routes: Routes = [
  {
    path: '',
    component: AllDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDonationPageRoutingModule {}
