import { Injectable } from '@angular/core';
import { Ticker } from './ticker';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Quote } from 'app/ticker/quote/quote';
import { IQuoteService } from 'app/ticker/quote/i-quote-service';
import { LocalQuoteService } from 'app/ticker/quote/local/local-quote.service';
import { TickerWrapper } from 'app/ticker/ticker-wrapper';
import { take } from 'rxjs/operators';


//import { QuandlQuoteServiceService } from './quandl-quote-service.service';


@Injectable()
export class TickerService {


  private collection_tickers = 'ticker';
  private _quoteService: IQuoteService;
  constructor(private _fireStore: AngularFirestore, quoteService: LocalQuoteService) {
    this._quoteService = quoteService;
  }

  findTicker(code: string): Observable<Ticker[]> {
    console.log('findTicker >'+code);
    return this._fireStore.collection<Ticker>(this.collection_tickers,
      (ref) => {
        return ref.where('code', '==', code.toUpperCase());
      })
      .valueChanges();
  }
  getForUpdate(code: string): Observable<TickerWrapper[]> {
    console.log('getForUpdate >'+code);
    return this._fireStore.collection<Ticker>(this.collection_tickers,
      (ref) => {
        return ref.where('code', '==', code.toUpperCase());
      })
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {

          let wrapper: TickerWrapper = new TickerWrapper();
          wrapper.docRef = action.payload.doc.ref;
          wrapper.ticker = action.payload.doc.data() as Ticker;
          return wrapper;
        })
      });
  }

  getAllTickers(): Observable<Ticker[]> {
    return this._fireStore.collection<Ticker>(this.collection_tickers).valueChanges();
  }

  getLatestQuote(code: string): Observable<Quote> {
    return this._quoteService.getLatesQuote(code);
  }

  async addTicker(ticker: Ticker): Promise<any> {

    ticker.code = ticker.code.toUpperCase();
    //need to take(1) from observable for this to work,
    // since observable never completes ==> promise will never resolve
    let dups: Ticker[] = await this.findTicker(ticker.code).pipe(take(1)).toPromise();
    if (dups && dups.length > 0) {
      throw new Error('Duplicate found. Ticker not saved');

    } else {
      console.log('No duplicate');
      return this._fireStore.collection<Ticker>(this.collection_tickers)
        .add(JSON.parse(JSON.stringify(ticker)));

    }

  }
  saveTicker(w:TickerWrapper):Promise<any>{
    w.ticker.code=w.ticker.code.toUpperCase();  
    return w.docRef.update(w.ticker);
    
  }
  deleteTicker(w:TickerWrapper): Promise<any> {
    return w.docRef.delete();
  }
}
