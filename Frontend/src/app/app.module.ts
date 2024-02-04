import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsComponent } from './cards/cards.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpencetrackingComponent } from './expencetracking/expencetracking.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { OffersComponent } from './offers/offers.component';
import { TrailComponent } from './trail/trail.component';
import { AddcardComponent } from './addcard/addcard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UploadbillsComponent } from './uploadbills/uploadbills.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    CardsComponent,
    ExpencetrackingComponent,
    OffersComponent,
    TrailComponent,
    AddcardComponent,
    UploadbillsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    NgxChartsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
