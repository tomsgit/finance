import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionModule } from './transaction/transaction.module';
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
import { TickerModule } from './ticker/ticker.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';


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
    //TransactionModule,
    //TickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CoreModule.forRoot(),  
    AppRoutingModule
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
