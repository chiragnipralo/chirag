import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuztabsPage } from './buztabs.page';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component:BuztabsPage,
    children: [
    {
      path: 'dashboard',
      children: [
      {
        path: '',            
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
      },
      ],
    },
    {
      path: 'trending',
      children: [
      {
        path: '',            
        loadChildren: () => import('./trending/trending.module').then(m => m.TrendingPageModule),
      },
      ],
    },
    {
      path: 'map',
      children: [
      {
        path: '',            
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule),
      },
      ],
    },
    {
      path: 'chat',
      children: [
      {
        path: '',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
      },
      ],
    },
  
    {
      path: 'about',
      children: [
      {
        path: '',            
        loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule),
      },
      ],
    },{
      path: 'create',
      children: [
      {
        path: '',            
        loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule),
      },
      ],
    },
    {
      path: '**',
      redirectTo: '/buztabs/map',
      pathMatch: 'full',
    },
    ],
  },
  {
    path: '**',
    redirectTo: '/buztabs/map',
    pathMatch: 'full',
  },
  ];
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BuztabsPage]
})
export class BuztabsPageModule {}
