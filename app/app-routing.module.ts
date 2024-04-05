import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule),
  },
  {
    path: 'detailseve',
    loadChildren: () => import('./pages/detailseve/detailseve.module').then(m => m.DetailsevePageModule)
  },
  {
    path: 'guest-list',
    loadChildren: () => import('./pages/guest-list/guest-list.module').then(m => m.GuestListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  }, {
    path: 'register',
    loadChildren: () => import('./user/register/register.module').then(m => m.RegisterPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'res-otp',
    loadChildren: () => import('./user/res-otp/res-otp.module').then(m => m.ResOtpPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'exploreeve',
    loadChildren: () => import('./pages/exploreeve/exploreeve.module').then(m => m.ExploreevePageModule)
  },
  {
    path: 'managevent',
    loadChildren: () => import('./events/managevent/managevent.module').then(m => m.ManageventPageModule)
  },
  {
    path: 'personalcard',
    loadChildren: () => import('./pages/personalcard/personalcard.module').then(m => m.PersonalcardPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then(m => m.QrcodePageModule)
  },
  {
    path: 'profilecards',
    loadChildren: () => import('./pages/profilecards/profilecards.module').then(m => m.ProfilecardsPageModule)
  },
  {
    path: 'inviteevent',
    loadChildren: () => import('./events/inviteevent/inviteevent.module').then(m => m.InviteeventPageModule)
  },
  {
    path: 'editprof',
    loadChildren: () => import('./pages/editprof/editprof.module').then(m => m.EditprofPageModule)
  },
  {
    path: 'editcard',
    loadChildren: () => import('./pages/editcard/editcard.module').then(m => m.EditcardPageModule)
  },
  {
    path: 'eventsearch',
    loadChildren: () => import('./pages/eventsearch/eventsearch.module').then(m => m.EventsearchPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./tabs/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'chat-detail',
    // path: 'chat-detail/:id',
    loadChildren: () => import('./pages/chat-detail/chat-detail.module').then(m => m.ChatDetailPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./events/edit-event/edit-event.module').then(m => m.EditEventPageModule)
  },
  {
    path: 'buzregister',
    loadChildren: () => import('./business/user/buzregister/buzregister.module').then(m => m.BuzregisterPageModule)
  },
  {
    path: 'buzwel',
    loadChildren: () => import('./business/user/buzwel/buzwel.module').then(m => m.BuzwelPageModule)
  },
  {
    path: 'buztabs',
    loadChildren: () => import('./business/buztabs/buztabs.module').then(m => m.BuztabsPageModule)
  },
  {
    path: 'curr-plan',
    loadChildren: () => import('./business/pages/curr-plan/curr-plan.module').then(m => m.CurrPlanPageModule)
  },
  {
    path: 'payhistory',
    loadChildren: () => import('./business/pages/payhistory/payhistory.module').then(m => m.PayhistoryPageModule)
  },
  {
    path: 'insights',
    loadChildren: () => import('./pages/insights/insights.module').then(m => m.InsightsPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./business/pages/create-event/create-event.module').then(m => m.CreateEventPageModule)
  },
  {
    path: 'create-perm',
    loadChildren: () => import('./business/pages/create-perm/create-perm.module').then(m => m.CreatePermPageModule)
  },
  {
    path: 'create-contact',
    loadChildren: () => import('./business/pages/create-contact/create-contact.module').then(m => m.CreateContactPageModule)
  },
  {
    path: 'paidmanage',
    loadChildren: () => import('./business/pages/paidmanage/paidmanage.module').then(m => m.PaidmanagePageModule)
  },
  {
    path: 'manageqr',
    loadChildren: () => import('./events/manageqr/manageqr.module').then(m => m.ManageqrPageModule)
  },
  {
    path: 'paypage',
    loadChildren: () => import('./business/user/paypage/paypage.module').then(m => m.PaypagePageModule)
  },
  {
    path: 'create-community',
    loadChildren: () => import('./community/create-community/create-community.module').then(m => m.CreateCommunityPageModule)
  },
  {
    path: 'my-community',
    loadChildren: () => import('./community/my-community/my-community.module').then(m => m.MyCommunityPageModule)
  },
  {
    path: 'community-details',
    loadChildren: () => import('./community/community-details/community-details.module').then(m => m.CommunityDetailsPageModule)
  },
  {
    path: 'choose-plan',
    loadChildren: () => import('./business/user/choose-plan/choose-plan.module').then(m => m.ChoosePlanPageModule)
  },
  {
    path: 'allcommunity',
    loadChildren: () => import('./community/allcommunity/allcommunity.module').then(m => m.AllcommunityPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./business/pages/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'all-community-event',
    loadChildren: () => import('./business/paid-community/all-community-event/all-community-event.module').then(m => m.AllCommunityEventPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./business/paid-community/post/post.module').then(m => m.PostPageModule)
  },
  {
    path: 'allmember',
    loadChildren: () => import('./business/paid-community/allmember/allmember.module').then(m => m.AllmemberPageModule)
  },
  {
    path: 'member-request',
    loadChildren: () => import('./business/paid-community/member-request/member-request.module').then(m => m.MemberRequestPageModule)
  },
  {
    path: 'delete-community',
    loadChildren: () => import('./business/paid-community/delete-community/delete-community.module').then(m => m.DeleteCommunityPageModule)
  },
  {
    path: 'community-chat',
    loadChildren: () => import('./business/page/community-chat/community-chat.module').then(m => m.CommunityChatPageModule)
  },
  {
    path: 'about-community',
    loadChildren: () => import('./business/paid-community/about-community/about-community.module').then(m => m.AboutCommunityPageModule)
  },
  {
    path: 'community-post',
    loadChildren: () => import('./community/community-post/community-post.module').then(m => m.CommunityPostPageModule)
  },
  {
    path: 'community-delete',
    loadChildren: () => import('./community/community-delete/community-delete.module').then(m => m.CommunityDeletePageModule)
  },
  {
    path: 'community-member',
    loadChildren: () => import('./community/community-member/community-member.module').then(m => m.CommunityMemberPageModule)
  },
  {
    path: 'add-member',
    loadChildren: () => import('./business/paid-community/add-member/add-member.module').then(m => m.AddMemberPageModule)
  },
  {
    path: 'add-obituary',
    loadChildren: () => import('./business/paid-community/add-obituary/add-obituary.module').then(m => m.AddObituaryPageModule)
  },
  {
    path: 'all-obituary',
    loadChildren: () => import('./business/paid-community/all-obituary/all-obituary.module').then(m => m.AllObituaryPageModule)
  },
  {
    path: 'raise-fund',
    loadChildren: () => import('./business/paid-community/raise-fund/raise-fund.module').then(m => m.RaiseFundPageModule)
  },
  {
    path: 'all-donation',
    loadChildren: () => import('./business/paid-community/all-donation/all-donation.module').then(m => m.AllDonationPageModule)
  },
  {
    path: 'exeplorecom',
    loadChildren: () => import('./community/exeplorecom/exeplorecom.module').then( m => m.ExeplorecomPageModule)
  },
  {
    path: 'edit-community',
    loadChildren: () => import('./community/edit-community/edit-community.module').then( m => m.EditCommunityPageModule)
  },
  {
    path: 'edit-paid-community',
    loadChildren: () => import('./business/paid-community/edit-paid-community/edit-paid-community.module').then( m => m.EditPaidCommunityPageModule)
  },
  {
    path: 'premium-community-details',
    loadChildren: () => import('./community/premium-community-details/premium-community-details.module').then( m => m.PremiumCommunityDetailsPageModule)
  },
  {
    path: 'community-event',
    loadChildren: () => import('./community/community-event/community-event.module').then( m => m.CommunityEventPageModule)
  },
  {
    path: 'member-details',
    loadChildren: () => import('./business/pages/member-details/member-details.module').then( m => m.MemberDetailsPageModule)
  },
  {
    path: 'multi-event',
    loadChildren: () => import('./events/multi-event/multi-event.module').then( m => m.MultiEventPageModule)
  },
  {
    path: 'myevent',
    loadChildren: () => import('./events/myevent/myevent.module').then( m => m.MyeventPageModule)
  },
  {
    path: 'event-payment',
    loadChildren: () => import('./events/event-payment/event-payment.module').then( m => m.EventPaymentPageModule)
  },
  {
    path: 'add-samiti',
    loadChildren: () => import('./business/paid-community/add-samiti/add-samiti.module').then( m => m.AddSamitiPageModule)
  },
  {
    path: 'all-samiti',
    loadChildren: () => import('./business/paid-community/all-samiti/all-samiti.module').then( m => m.AllSamitiPageModule)
  },
  {
    path: 'add-samiti-member',
    loadChildren: () => import('./business/paid-community/add-samiti-member/add-samiti-member.module').then( m => m.AddSamitiMemberPageModule)
  },
  {
    path: 'samiti-details',
    loadChildren: () => import('./business/paid-community/samiti-details/samiti-details.module').then( m => m.SamitiDetailsPageModule)
  },
  {
    path: 'successcom',
    loadChildren: () => import('./community/successcom/successcom.module').then( m => m.SuccesscomPageModule)
  },
  {
    path: 'add-obitury',
    loadChildren: () => import('./community/add-obitury/add-obitury.module').then( m => m.AddObituryPageModule)
  },
  {
    path: 'edit-paid-event',
    loadChildren: () => import('./business/pages/edit-paid-event/edit-paid-event.module').then( m => m.EditPaidEventPageModule)
  },
  {
    path: 'paid-guest-list',
    loadChildren: () => import('./business/pages/paid-guest-list/paid-guest-list.module').then( m => m.PaidGuestListPageModule)
  },
  {
    path: 'manage-community',
    loadChildren: () => import('./community/manage-community/manage-community.module').then( m => m.ManageCommunityPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      /*  enableTracing: true, */
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
