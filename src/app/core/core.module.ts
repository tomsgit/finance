import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerService } from 'app/ticker/ticker.service';
import { LocalQuoteService } from 'app/ticker/quote/local/local-quote.service';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthRouteGuardService } from 'app/core/auth/auth-route-guard.service';
import { LoginRouteGuardService } from 'app/core/auth/login/login-route-guard.service';
//import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbInDateParserFormatterService } from 'app/core/ngbootstrap/ngb-in-date-parser-formatter.service';
import { DateUtil } from 'app/core/ngbootstrap/date-util';
import { BatchLogService } from '../admin/batch-log.service';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [

  ],
  providers:[
    TickerService,
    LocalQuoteService,
    AuthService,
    AuthRouteGuardService, 
    LoginRouteGuardService, 
    {provide: NgbDateParserFormatter, useClass: NgbInDateParserFormatterService},
    DateUtil,
    BatchLogService
  ],
  exports:[
  ]
})
export class CoreModule { 

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot():ModuleWithProviders{
    return {
      ngModule: CoreModule,
      providers: [
        //{provide: UserServiceConfig, useValue: config }
      ]
    };
  }
}
