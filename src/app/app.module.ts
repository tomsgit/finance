import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsComponent } from './transaction/transactions/transactions.component';
import { TransactionModule } from './transaction/transaction.module';
import { TxnFormComponent } from './transaction/txn-form/txn-form.component';
import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment';

import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthNavBarComponent } from './auth/auth-nav-bar/auth-nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthRouteGuardService } from './auth/auth-route-guard.service';
import { LoginRouteGuardService } from './auth/login/login-route-guard.service';
import { NgbInDateParserFormatterService } from './ngbootstrap/ngb-in-date-parser-formatter.service';
import { DateUtil } from './ngbootstrap/date-util';

const routes:Routes = [
  {path:'login',component: LoginComponent,canActivate:[LoginRouteGuardService]},          
  {path:'',redirectTo:'portfolio', pathMatch:'full'},
  {path:'**',redirectTo:'portfolio', pathMatch:'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthNavBarComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TransactionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,  
    RouterModule.forRoot(routes,{ enableTracing: true })
  ],
  providers: [
    AuthService,
    AuthRouteGuardService, 
    LoginRouteGuardService, 
    {provide: NgbDateParserFormatter, useClass: NgbInDateParserFormatterService},
    DateUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
