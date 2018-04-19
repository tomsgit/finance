import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioContainerRootComponent } from 'app/transaction/portfolio-container-root/portfolio-container-root.component';
import { AuthRouteGuardService } from 'app/core/auth/auth-route-guard.service';
import { PortfolioListComponent } from 'app/transaction/portfolio-list/portfolio-list.component';
import { PortfolioContainerChildComponent } from 'app/transaction/portfolio-container-child/portfolio-container-child.component';
import { PortfolioPerformanceComponent } from 'app/transaction/portfolio-performance/portfolio-performance.component';
import { TransactionListComponent } from 'app/transaction/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from 'app/transaction/transaction-detail/transaction-detail.component';
import { NewTransactionComponent } from './transaction-new/transaction-new.component';


const routes:Routes = [
  {path:'',
    component:PortfolioContainerRootComponent,
    canActivate:[AuthRouteGuardService],
    children:[
      {path:'',component:PortfolioListComponent},
      {path:':folioId',component:PortfolioContainerChildComponent,
        children:[
            {path:'',pathMatch: 'full', redirectTo: 'perf'},
            {path:'perf',component:PortfolioPerformanceComponent},
            {path:'txns',component:TransactionListComponent},
            {path:'txns/:txnId',component:TransactionDetailComponent},
            {path:'newtxn',component:NewTransactionComponent},           
        ]
      },
    ]
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
