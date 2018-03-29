import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Txn } from './txn';
import { Broker } from './broker.enum';
import { Exchange } from './exchange.enum';
import { TxnType } from './txn-type.enum';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TransactionService {

  constructor(private _fireStore:AngularFirestore) { 
    
    this.localTxns=[
      {id:'',code:'infy',name:'Infosys',shares:10,broker:Broker.ZERODHA,exchange:Exchange.NSE,type:TxnType.BUY,date:new Date(), price:920,commission:6,value:10000},
      {id:'',code:'hex',name:'Hexaware',shares:20,broker:Broker.ICICIDirect,exchange:Exchange.BSE,type:TxnType.SELL,date:new Date(), price:390,commission:45,value:6000}
    ];
   
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
  getTransactionsLocal():Observable<Txn[]>{

    return Observable.create((observer:Observer<Txn[]>) => {
      observer.next(this.localTxns);
      observer.complete();
    });
  }
  saveTransactions(txn:Txn):void{

    const id = this._fireStore.createId();
    let atxn: Txn = this.localTxns[0];
    atxn.id=id;
    this._fireStore.collection<Txn>(this.collection_txns).add(atxn);
  }

}
