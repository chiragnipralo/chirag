import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
{
  path: '',
  component: TabsPage,
  children: [
  {
    path: 'dashboard',
    children: [
    {
      path: '',            
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        data: { cache: false }
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
    path: 'userchat',
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
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
  ],
},
{
  path: '**',
  redirectTo: '/tabs/dashboard',
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
  declarations: [TabsPage],
})
export class TabsPageModule {}
