import { Injectable } from '@angular/core';
import { Observable ,  Subscriber ,  Observer } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Txn } from './txn';
import { Broker } from './broker.enum';
import { Exchange } from './exchange.enum';
import { TxnType } from './txn-type.enum';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PortfolioService } from './portfolio.service';
import firebase from 'firebase/compat/app';
import { TxnWrapper } from './txn-wrapper';

@Injectable()
export class TransactionService {
  batchSave(targetFolio:string,txns:Txn[]): any {
    
    let colref = this._portfolioService
        .getPortfolioRef(targetFolio)
        .collection(this.collection_txns);
    let batch = this._fireStore.firestore.batch();     
    txns.forEach(txn =>{

      batch.set(colref.doc(txn.code.toLocaleLowerCase()).ref,Txn.toObject(txn));
      
    });
    batch.commit();
        
        
  }

  deleteTxn(w:TxnWrapper): any {
    w.docRef.delete();
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
  getTransaction(porfolioId:string,txnId:string):Observable<TxnWrapper>{
    return this._portfolioService
        .getPortfolioRef(porfolioId)
        .collection(this.collection_txns)
        .doc(txnId)
        .snapshotChanges()
        .pipe(
          map(action => {

            let wrapper:TxnWrapper = new TxnWrapper();
            wrapper.docRef=action.payload.ref;
            wrapper.txn=action.payload.data() as Txn;          
            return wrapper;
            
          })
        );

  }
  getPorfolioTransactions(porfolioId:string):Observable<TxnWrapper[]>{

    return this._portfolioService.getPortfolioRef(porfolioId)
                .collection<Txn>(this.collection_txns,ref =>{
                  return ref.orderBy('date','desc');
                })
                .snapshotChanges()
                .pipe(
                  map(actions => {
                    
                    return actions.map(action => {
                      
                      let wrapper:TxnWrapper = new TxnWrapper();
                      wrapper.docRef=action.payload.doc.ref;
                      wrapper.txn=action.payload.doc.data() as Txn;         
                      return wrapper;
                    })
                  }),
                  tap(txns =>{
                    this._portfolioService.updateTxnCount(txns.length,porfolioId);
                  })
                );
    
  }
  
  getTransactionsLocal():Observable<Txn[]>{

    return Observable.create((observer:Observer<Txn[]>) => {
      observer.next(this.localTxns);
      observer.complete();
    });
  }
  compute(txn:Txn){
   
    //console.log('DAte' +txn.date);
    
    
 
    if(txn.date instanceof firebase.firestore.Timestamp){
      let ts:firebase.firestore.Timestamp=txn.date;
      txn.date=ts.toDate();
      //console.log('computeT>>>' +txn.date.constructor.name);
    }else{
       //date object comes as string!!! Convert to Date
      txn.date=new Date(txn.date);
    }
    //console.log('compute' +txn.date.constructor.name);
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
  addTransaction(txn:Txn,porfolioId:string):Promise<any>{

    txn.code=txn.code.toUpperCase();
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

  saveTransaction(w:TxnWrapper):Promise<any>{
    w.txn.code=w.txn.code.toUpperCase();  
    return w.docRef.update(w.txn);
    
  }

}
