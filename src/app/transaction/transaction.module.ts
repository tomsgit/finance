import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionService } from './transaction.service';
import { TxnFormComponent } from './txn-form/txn-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { PortfolioPerformanceComponent } from './portfolio-performance/portfolio-performance.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { AuthRouteGuardService } from '../auth/auth-route-guard.service';

const routes:Routes = [
  {path:'portfolio',
    component:PortfolioComponent,
    canActivate:[AuthRouteGuardService],
    children:[
      {path:'',component:PortfolioListComponent},
      {path:':folioName',component:PortfolioDetailComponent,
        children:[
            {path:'',pathMatch: 'full', redirectTo: 'perf'},
            {path:'perf',component:PortfolioPerformanceComponent},
            {path:'txns',component:TransactionsComponent},
            {path:'newtxn',component:TxnFormComponent},           
        ]},
    ]
    
  }];
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
 
  declarations: [
    TransactionsComponent,
    TxnFormComponent,
    PortfolioComponent,
    PortfolioListComponent,
    PortfolioDetailComponent,
    PortfolioPerformanceComponent,
    PageTitleComponent
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
