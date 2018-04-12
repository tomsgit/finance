import { Injectable } from '@angular/core';
import { IQuoteService } from './i-quote-service';
import { Quote } from './quote';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuandlResponse } from './quandl-response';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../environments/environment';

@Injectable()
export class QuandlQuoteServiceService implements IQuoteService{

  readonly _url:string = 'https://www.quandl.com/api/v3/datasets/NSE/|code|/data.json?limit=1&api_key=|apikey|';
  constructor(private _http: HttpClient) { 
    this.cache=new Map<string,Quote>();
    console.log('quandl service initing');
  }
  cache:Map<string,Quote>;
  get url():string{
    return this._url.replace('|apikey|',environment.quandl.apiKey);
  }
  getLatesQuote(code: string): Observable<Quote> {
      let c:string = code.toLowerCase();
      let o:Observable<Quote>;
      if(this.cache && this.cache.has(c)){
        o = Observable.of(this.cache.get(c));
      }else{
        //o = this.getLatesQuoteDummy(c);
        o = this.getLatesQuoteInternal(c);
        o.forEach(
          obs => {
            this.cache.set(c,obs);
            console.log('quandl cache size>'+this.cache.size);
          }
        );
      }
      return o;
  }
  getLatesQuoteInternal(code: string): Observable<Quote> {
    
    let u = this.url.replace('|code|',code);
    console.log('url>>'+u)
    return this._http.get<QuandlResponse>(u)
            .pipe(
              map(qr =>{
                return this.toQuote(qr);                
              }),
              catchError(this.handleError)
            )

    
  }
  toQuote(qr:QuandlResponse):Quote{
    let q=null;
    console.log('transforming to quote'+qr.dataset_data);
    if(qr.dataset_data){
        //q = {date:'4/3/18',close:1000,high:1005,last:980,low:985,open:985,quantity:57000,turnover:123};
        q= new Quote();
        q.date=qr.dataset_data.data[0][0];
        q.open=qr.dataset_data.data[0][1];
        q.high=qr.dataset_data.data[0][2];
        q.low=qr.dataset_data.data[0][3];
        q.last=qr.dataset_data.data[0][4];
        q.close=qr.dataset_data.data[0][5];
        q.quantity=qr.dataset_data.data[0][6];
        q.turnover=qr.dataset_data.data[0][7];

    }
    
    return q;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
  

}
