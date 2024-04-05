import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared/shared.module';

// import { TabsPage } from './tabs.page';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'createv4',
    children: [
    {
      path: '',
      loadChildren: () => import('./createv4/createv4.module').then(m => m.Createv4PageModule),
    },
    ],
  },
  {
    path: 'newactivity',
    children: [
    {
      path: '',            
      loadChildren: () => import('./newactivity/newactivity.module').then(m => m.NewactivityPageModule),
    },
    ],
  },
  {
    path: 'manageevent',
    children: [
    {
      path: '',            
      loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    },
    ],
  },
  {
    path: 'payment',
    children: [
    {
      path: '',            
      loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
    },
    ],
  },
  {
    path: 'contact',
    children: [
    {
      path: '',            
      loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule),
    },
    ],
  },
  {
    path: 'allevent',
    children: [
    {
      path: '',            
      loadChildren: () => import('./allevent/allevent.module').then(m => m.AlleventPageModule),
    },
    ],
  },
  {
    path: 'mapactivity',
    children: [
    {
      path: '',            
      loadChildren: () => import('./map-activity/map-activity.module').then(m => m.MapActivityPageModule),
    },
    ],
  },
  {
    path: 'success',
    children: [
    {
      path: '',            
      loadChildren: () => import('./success/success.module').then(m => m.SuccessPageModule),
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
    path: 'add-staff',
    children: [
    {
      path: '',            
      loadChildren: () => import('./add-staff/add-staff.module').then( m => m.AddStaffPageModule)
    },
    ],
  },
  {
    path: '**',
    redirectTo: '/events/create',
    pathMatch: 'full',
  },
  ],
},
{
  path: '**',
  redirectTo: '/events/create',
  pathMatch: 'full',
},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes),
    ],
  // declarations: [TabsPage],
})
export class TabsPageModule {}
