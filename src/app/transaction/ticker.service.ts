import { Injectable } from '@angular/core';
import { Ticker } from './ticker';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Quote } from './quote';
import { IQuoteService } from './i-quote-service';
import { LocalQuoteService } from './local-quote.service';
//import { QuandlQuoteServiceService } from './quandl-quote-service.service';


@Injectable()
export class TickerService {
  
  
  private collection_tickers='ticker';
  private _quoteService:IQuoteService;
  constructor(private _fireStore:AngularFirestore,quoteService:LocalQuoteService) {
    this._quoteService=quoteService;
  }

  findTicker(code:string):Observable<Ticker[]>{
    console.log('tsnew');
    return this._fireStore.collection<Ticker>(this.collection_tickers,
                              (ref) =>{
                                  return ref.where('code','==',code.toLowerCase());
                              })
                          .valueChanges();
  }
  
  getAllTickers():Observable<Ticker[]>{
    return this._fireStore.collection<Ticker>(this.collection_tickers).valueChanges();
  }
  
  getLatestQuote(code:string):Observable<Quote>{
    return this._quoteService.getLatesQuote(code);
  }
}
