import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/core/auth/login/login.component';
import { LoginRouteGuardService } from 'app/core/auth/login/login-route-guard.service';
import { TransactionModule } from './transaction/transaction.module';

const routes:Routes = [
  {path:'login',component: LoginComponent,canActivate:[LoginRouteGuardService]},          
  {path: 'portfolio',loadChildren: 'app/transaction/transaction.module#TransactionModule'},
  {path: 'ticker',loadChildren: 'app/ticker/ticker.module#TickerModule'},
  {path: 'admin',loadChildren: 'app/admin/admin.module#AdminModule'},
  {path:'',redirectTo:'portfolio', pathMatch:'full'},
  {path:'**',redirectTo:'portfolio', pathMatch:'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }