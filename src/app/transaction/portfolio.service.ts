import { Injectable, Injector } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Portfolio } from './portfolio';
import { Observable } from 'rxjs/Observable';
import { CollectionReference, QuerySnapshot } from '@firebase/firestore-types';
import { TransactionService } from './transaction.service';
import { PortfolioPerf } from './portfolio-perf';
import { Txn } from './txn';
import { TxnWrapper } from './txn-wrapper';

@Injectable()
export class PortfolioService {

  private readonly collection_portfolio: string;

  constructor(private _fireStore: AngularFirestore, private injector:Injector) {
    this.collection_portfolio = 'portfolio'
  }
  get _txnService():TransactionService{
    return this.injector.get(TransactionService);
  }
  
  getPortfolioList(): Observable<Portfolio[]> {

    return this._fireStore.collection<Portfolio>(this.collection_portfolio, (query) => {
      return query.orderBy('priority', 'desc');
    }).snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let p = action.payload.doc.data() as Portfolio;
          p.id = action.payload.doc.id;
          return p;
        })
      });

  }

  /* getPortfolioRef(portfolioName:string):AngularFirestoreDocument<Portfolio>{
     this._fireStore.collection<Portfolio>(this.collection_portfolio,(query) =>{
      return query.where('name','==',portfolioName);
    }).valueChanges();
    return null;
  } */
  getPortfolio(portfolioId: string): Observable<Portfolio> {
     return this._fireStore.collection<Portfolio>(this.collection_portfolio)
            .doc<Portfolio>(portfolioId)
            .valueChanges();
  }
  getPortfolioRef(portfolioId: string): AngularFirestoreDocument<Portfolio> {
    return this._fireStore.collection<Portfolio>(this.collection_portfolio).doc(portfolioId);

  }

  calculatePortfolio(folioId:string):Observable<PortfolioPerf[]>{
    console.log('Retrieving txns for folioId>'+folioId);
        
    return this._txnService
                      .getPorfolioTransactions(folioId)
                      .map(wrprs =>{
                        console.log('Txns size '+wrprs.length);
                        //folios
                        let folios:PortfolioPerf[] = this.pushTransactions(wrprs);
                        //calulate folios
                        folios.forEach(f => f.settle());
                        return folios;                            
                      });
                                       
  }
  processFolios(folios:PortfolioPerf[]){

  }
  pushTransactions(wrprs:TxnWrapper[]):PortfolioPerf[]{
    let folio:Map<string,PortfolioPerf> = new Map<string,PortfolioPerf>();    
    wrprs.forEach(
      w =>{
        let t=w.txn;
        let c = t.code.toLowerCase();
        //console.log('adding txn for '+c);
        //compute cost value
        this._txnService.compute(t);
        if(folio.has(c)){
          //console.log('Folio entry exists for '+c);
          folio.get(c).addTransaction(t);
        }else{
          //console.log('New Folio entry for '+c);
          let p =new PortfolioPerf(t);
          folio.set(c,p);          
        }
    });
    return Array.from(folio.values());
  }

}
