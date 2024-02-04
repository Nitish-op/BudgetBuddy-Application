import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpencetrackingComponent } from './expencetracking/expencetracking.component';
import { OffersComponent } from './offers/offers.component';
import { AddcardComponent } from './addcard/addcard.component';
import { UploadbillsComponent } from './uploadbills/uploadbills.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'navbar',component:NavbarComponent,
  children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'addcard',component:AddcardComponent},
    {path:'cards',component:CardsComponent},
    {path:'expencetracking',component:ExpencetrackingComponent},
    {path:'offers',component:OffersComponent},
    {path:'upload',component:UploadbillsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
