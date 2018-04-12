import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Txn } from './txn';
import { Broker } from './broker.enum';
import { Exchange } from './exchange.enum';
import { TxnType } from './txn-type.enum';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';
import { AngularFirestore } from 'angularfire2/firestore';
import { PortfolioService } from './portfolio.service';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class TransactionService {

  deleteTxn(txn:Txn): any {
    txn.docRef.delete();
  }
  
  constructor(private _fireStore:AngularFirestore, private _portfolioService:PortfolioService ) { 
    
    
   
   /*
    this.localTxns=[
      {id:'',code:'infy',name:'Infosys',shares:10,broker:'ZERODHA',exchange:'NSE',type:'BUY',date:new Date(), price:920,commission:6,value:10000},
      {id:'',code:'hex',name:'Hexaware',shares:20,broker:'ICICIDirect',exchange:'BSE',type:'SELL',date:new Date(), price:390,commission:45,value:6000}
    ];
     */
  }
  private collection_txns='txns';
  private txns:Observable<Txn[]>;
  private localTxns:Txn[];
  
  getTransactions():Observable<Txn[]>{

    return this._fireStore.collection<Txn>(this.collection_txns).valueChanges();
  }
  getPorfolioTransactions(porfolioId:string):Observable<Txn[]>{

    return this._portfolioService.getPortfolioRef(porfolioId)
                .collection<Txn>(this.collection_txns)
                .snapshotChanges()
                .map(actions => {

                  return actions.map(action => {

                    let t = action.payload.doc.data() as Txn;
                    t.id = action.payload.doc.id;
                    t.docRef = action.payload.doc.ref;
                    return t;
                  })
                });
    
  }
  
  getTransactionsLocal():Observable<Txn[]>{

    return Observable.create((observer:Observer<Txn[]>) => {
      observer.next(this.localTxns);
      observer.complete();
    });
  }
  compute(txn:Txn){
    
      //console.log('computing value');
      let val:number=0;
      if(txn.price && txn.shares){
          val=txn.price * txn.shares;
          if(txn.type && txn.commission){
             if(txn.type as TxnType === TxnType.BUY){
                  val+=txn.commission;
             }else{
                 val-=txn.commission;
             }    
          } 
      }
      txn.value=val;  
  }
  saveTransactions(txn:Txn,porfolioId:string):Promise<any>{

    
    return this._portfolioService.getPortfolioRef(porfolioId)
        .collection<Txn>(this.collection_txns)
        .add(JSON.parse(JSON.stringify(txn)))
        .then(
          (value) =>{
            return value.id;
          },
          (reason) =>{
            return reason;
          }
        );
   
  }

}
