import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
  },
  {
    path: 'coming',
    loadChildren: () => import('./coming/coming.module').then( m => m.ComingPageModule)
  },
  {
    path: 'chat-contact',
    loadChildren: () => import('./chat-contact/chat-contact.module').then( m => m.ChatContactPageModule)
  },
  {
    path: 'viewstats',
    loadChildren: () => import('./viewstats/viewstats.module').then( m => m.ViewstatsPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'delete-account',
    loadChildren: () => import('./delete-account/delete-account.module').then( m => m.DeleteAccountPageModule)
  },
  {
    path: 'event-type',
    loadChildren: () => import('./event-type/event-type.module').then( m => m.EventTypePageModule)
  },
  {
    path: 'multieventdetails',
    loadChildren: () => import('./multieventdetails/multieventdetails.module').then( m => m.MultieventdetailsPageModule)
  },
  {
    path: 'successmul',
    loadChildren: () => import('./successmul/successmul.module').then( m => m.SuccessmulPageModule)
  },
  {
    path: 'reinvite',
    loadChildren: () => import('./reinvite/reinvite.module').then( m => m.ReinvitePageModule)
  },
  {
    path: 'create-card',
    loadChildren: () => import('./create-card/create-card.module').then( m => m.CreateCardPageModule)
  },
  {
    path: 'personal-card',
    loadChildren: () => import('./personal-card/personal-card.module').then( m => m.PersonalCardPageModule)
  },
  {
    path: 'business-card',
    loadChildren: () => import('./business-card/business-card.module').then( m => m.BusinessCardPageModule)
  },
  {
    path: 'add-more-guest',
    loadChildren: () => import('./add-more-guest/add-more-guest.module').then( m => m.AddMoreGuestPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'payment-info',
    loadChildren: () => import('./payment-info/payment-info.module').then( m => m.PaymentInfoPageModule)
  },
  {
    path: 'paydemo',
    loadChildren: () => import('./paydemo/paydemo.module').then( m => m.PaydemoPageModule)
  },
  {
    path: 'ticketlist',
    loadChildren: () => import('./ticketlist/ticketlist.module').then( m => m.TicketlistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
