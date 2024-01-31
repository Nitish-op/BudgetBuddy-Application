import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { LimitsComponent } from './limits/limits.component';
import { ExpenseComponent } from './expense/expense.component';
import { OffersComponent } from './offers/offers.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
         DashboardComponent,
         CategoriesComponent,
         LimitsComponent,
         ExpenseComponent,
         OffersComponent,
         UploadComponent,
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
