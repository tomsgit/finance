import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from 'app/transaction/transaction-list/transaction-list.component';
import { TransactionService } from './transaction.service';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { PortfolioContainerRootComponent } from './portfolio-container-root/portfolio-container-root.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioContainerChildComponent } from './portfolio-container-child/portfolio-container-child.component';
import { PortfolioPerformanceComponent } from './portfolio-performance/portfolio-performance.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { AuthRouteGuardService } from 'app/core/auth/auth-route-guard.service';
import { PortfolioService } from './portfolio.service';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TickerModule } from '../ticker/ticker.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { NewTransactionComponent } from './transaction-new/transaction-new.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    SharedModule,
    TransactionRoutingModule
  ],
  exports:[
    RouterModule
  ],
 
  declarations: [
    TransactionListComponent,
    NewTransactionComponent,    
    PortfolioListComponent,
    PortfolioPerformanceComponent,
    PageTitleComponent,
    TransactionDetailComponent,
    PortfolioContainerChildComponent,
    PortfolioContainerRootComponent
  ],
  providers: [
    TransactionService,
    PortfolioService
  ]
})
export class TransactionModule { }
