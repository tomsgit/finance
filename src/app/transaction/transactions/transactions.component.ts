import { Component, OnInit, Input } from '@angular/core';
import { Broker } from '../broker.enum';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { TransactionService } from '../transaction.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Txn } from '../txn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'transaction-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class TransactionsComponent implements OnInit {

  title:string;
  transactions:Txn[];
  
  constructor(private _txnService:TransactionService,private route: ActivatedRoute) { }
  TxnType=TxnType;
  folioId:string;
  ngOnInit() {
    this.title="Transaction List";
    
    this.folioId = this.route.snapshot.parent.params['folioId'];
    this.getTransactions();
            
  }
  getTransactions(){
    console.log('Retrieving txns for folioId>'+this.folioId);
      this._txnService.getPorfolioTransactions(this.folioId)
                            .map(result => {
                                return result.map(txn =>{
                                    this._txnService.compute(txn);                                 
                                    return txn;
                                });
                            }).subscribe(
                              result =>{
                                  this.transactions=result;
                                  console.log('Got Values');
                              }
                            ),
                            error=>{
                              console.error(error.message);
                            },
                            ()=>{
                              console.log('complete get');
                            };
    }
    
  deleteTxn(txn:Txn):void{
    console.log('deleting <'+txn.code+'>'+txn.docRef.id);
    this._txnService.deleteTxn(txn);
  }
  deleteAll(transactions):void{
    console.log('delete all called');
    this.transactions
        .forEach(         
          txn => {           
              this.deleteTxn(txn);            
          }
        );         
  }
}
