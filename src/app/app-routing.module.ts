import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/auth/login/login.component';
import { LoginRouteGuardService } from 'app/auth/login/login-route-guard.service';
import { TransactionModule } from './transaction/transaction.module';

const routes:Routes = [
  {path:'login',component: LoginComponent,canActivate:[LoginRouteGuardService]},          
  {path: 'portfolio',loadChildren: 'app/transaction/transaction.module#TransactionModule'},
  {path:'',redirectTo:'portfolio', pathMatch:'full'},
  {path:'**',redirectTo:'portfolio', pathMatch:'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }