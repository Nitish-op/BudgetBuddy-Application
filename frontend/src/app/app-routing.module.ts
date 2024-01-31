import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { LimitsComponent } from './limits/limits.component';
import { ExpenseComponent } from './expense/expense.component';
import { OffersComponent } from './offers/offers.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {path:'navbar',component:NavbarComponent,
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'categories',component:CategoriesComponent},
      {path:'limits',component:LimitsComponent},
      {path:'expense',component:ExpenseComponent},
      {path:'offers',component:OffersComponent},
      {path:'upload',component:UploadComponent}
      
    
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
