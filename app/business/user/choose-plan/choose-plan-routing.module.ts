import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { ChoosePlanPage } from './choose-plan.page';

const routes: Routes = [
  
  {
    path: '',
    component: ChoosePlanPage
  },
  {
    path: 'choose-plan',
    loadChildren: () => import('./choose-plan.module').then(m => m.ChoosePlanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class ChoosePlanPageRoutingModule {}
