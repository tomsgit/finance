import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerService } from 'app/ticker/ticker.service';
import { LocalQuoteService } from 'app/ticker/quote/local/local-quote.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers:[
    TickerService,
    LocalQuoteService
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
