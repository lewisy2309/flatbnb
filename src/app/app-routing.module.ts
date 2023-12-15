import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextPeopleComingComponent } from './components/next-people-coming/next-people-coming.component';
import { PeopleComingComponent } from './components/people-coming/people-coming.component';
import { PresentStayingComponent } from './components/present-staying/present-staying.component';
import { UncomingLeavingComponent } from './components/uncoming-leaving/uncoming-leaving.component';
import { WaitingForCommentsComponent } from './components/waiting-for-comments/waiting-for-comments.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EarningsComponent } from './pages/informations/earnings/earnings.component';
import { InformationsComponent } from './pages/informations/informations.component';
import { ProgressionComponent } from './pages/informations/progression/progression.component';
import { SuperhostComponent } from './pages/informations/superhost/superhost.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { TodayComponent } from './pages/today/today.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SignUpHostComponent } from './pages/auth/sign-up-host/sign-up-host.component';
import { AnnounceComponent } from './pages/announce/announce.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'sign-up/host', component:SignUpHostComponent},
  {path: 'announces/:announceId', component:AnnounceComponent},
  {path: 'my-bookings', component:AnnounceComponent},
  {path: 'airbnb.com/hosting/my-bookings', component:AnnounceComponent},
  {path: 'airbnb.com/hosting', component:TodayComponent,
    children:[
      {path:'',component:UncomingLeavingComponent},
      {path:'uncoming-leaving',component:UncomingLeavingComponent},
      {path:'present-staying',component:PresentStayingComponent},
      {path:'waiting-for-comments',component:WaitingForCommentsComponent},
      {path:'next-people-coming',component:NextPeopleComingComponent},
      {path:'people-coming',component:PeopleComingComponent},
    ]},
  {path: 'airbnb.com/inbox/folder/all', component:MessagesComponent},
  {path: 'airbnb.com/multicalendar/708641880350965148', component:CalendarComponent},
  {path: 'airbnb.com/progress', component:InformationsComponent,
    children:[
      {path:'',component:ProgressionComponent},
      {path:'opportunity-hub',component:ProgressionComponent},
      {path:'earnings',component:EarningsComponent},
      {path:'opportunities/superhost',component:SuperhostComponent},
      {path:'reviews',component:TodayComponent},
      {path:'views',component:TodayComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
