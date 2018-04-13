import { Injectable, OnInit } from '@angular/core';
import { IQuoteService } from 'app/ticker/quote/i-quote-service';
import { Observable } from 'rxjs/Observable';
import { Quote } from 'app/ticker/quote/quote';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class LocalQuoteService implements IQuoteService{

  init(): void {
    this.populateCache();
  }
  private quote='quote';
  private latest='latestquote';

  private cache:Map<string,Quote>;
  
  getLatesQuote(code: string): Observable<Quote>{
    let c=code.toUpperCase();
    if(this.cache && this.cache.has(c)){
      return Observable.of(this.cache.get(c));
    }
    console.log('cache miss>'+c);
    return this.getLatesQuoteInternal(c);
  }
  
  private getLatesQuoteInternal(code: string): Observable<Quote> {

      return this._fireStore.collection<Quote>(this.latest,
                                (ref) =>{
                                    return ref.where('code','==',code)
                                            .limit(1);
                                })
                            .valueChanges()
                            .map(quotes =>{
                              let q:Quote;
                              if(quotes && quotes.length>0){
                                q=quotes[0];
                                this.cache.set(code,q);
                              }
                              return q;
                            });                            
  }
  
  constructor(private _fireStore:AngularFirestore) {
    this.cache=new Map<string,Quote>();
    this.init()
  }

  private populateCache() {
    console.log('populateCache');
    this._fireStore.collection<Quote>(this.latest)                              
                          .valueChanges()
                          .subscribe(
                            quotes =>{
                              console.log('cache> quotes size>'+quotes.length);
                              quotes.forEach(
                                quote => {
                                  this.cache.set(quote.code,quote)
                                  //console.log('cache set '+quote.code);
                                }
                              )
                            }
                          );                                                    
  }

}
