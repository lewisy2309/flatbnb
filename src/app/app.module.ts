import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { TodayComponent } from './pages/today/today.component';
import { UncomingLeavingComponent } from './components/uncoming-leaving/uncoming-leaving.component';
import { PresentStayingComponent } from './components/present-staying/present-staying.component';
import { NextPeopleComingComponent } from './components/next-people-coming/next-people-coming.component';
import { PeopleComingComponent } from './components/people-coming/people-coming.component';
import { WaitingForCommentsComponent } from './components/waiting-for-comments/waiting-for-comments.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { InformationsComponent } from './pages/informations/informations.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressionComponent } from './pages/informations/progression/progression.component';
import { EarningsComponent } from './pages/informations/earnings/earnings.component';
import { SuperhostComponent } from './pages/informations/superhost/superhost.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartEarningComponent } from './pages/informations/earnings/chart-earning/chart-earning.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterUnloggedComponent } from './components/footer-unlogged/footer-unlogged.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HeaderUnloggedComponent } from './components/header-unlogged/header-unlogged.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SignUpHostComponent } from './pages/auth/sign-up-host/sign-up-host.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TodayComponent,
    UncomingLeavingComponent,
    PresentStayingComponent,
    NextPeopleComingComponent,
    PeopleComingComponent,
    WaitingForCommentsComponent,
    MessagesComponent,
    CalendarComponent,
    InformationsComponent,
    ProgressionComponent,
    EarningsComponent,
    SuperhostComponent,
    ChartEarningComponent,
    HomeComponent,
    FooterUnloggedComponent,
    HeaderUnloggedComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    SignUpHostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    NgbModalModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
