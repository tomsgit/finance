import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TransactionModule } from './transaction/transaction.module';
import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './../environments/environment';

import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { LoginComponent } from 'app/core//auth/login/login.component';
import { AuthRouteGuardService } from 'app/core//auth/auth-route-guard.service';
import { LoginRouteGuardService } from 'app/core//auth/login/login-route-guard.service';
import { NgbInDateParserFormatterService } from 'app/core/ngbootstrap/ngb-in-date-parser-formatter.service';
import { DateUtil } from 'app/core/ngbootstrap/date-util';
import { TickerModule } from './ticker/ticker.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    //TransactionModule,
    //TickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    SharedModule,
    CoreModule.forRoot(),  
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
