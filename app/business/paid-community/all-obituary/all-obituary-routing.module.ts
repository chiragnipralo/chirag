import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllObituaryPage } from './all-obituary.page';

const routes: Routes = [
  {
    path: '',
    component: AllObituaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllObituaryPageRoutingModule {}
