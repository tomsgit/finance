import { Component, OnInit, Input } from '@angular/core';
import { Broker } from '../broker.enum';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { TransactionService } from '../transaction.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Txn } from '../txn';
import { ActivatedRoute } from '@angular/router';
import { TxnWrapper } from '../txn-wrapper';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],

})
export class TransactionListComponent implements OnInit {

  title:string;
  transactions:TxnWrapper[];
  
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
                            .map(wrprs => {
                                return wrprs.map(wrpr =>{
                                    this._txnService.compute(wrpr.txn);                                 
                                    return wrpr;
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
    
  deleteTxn(wrpr:TxnWrapper):void{
    console.log('deleting <'+wrpr.txn.code+'>'+wrpr.docRef.id);
    this._txnService.deleteTxn(wrpr);
  }
  deleteAll(transactions):void{
    console.log('delete all called');
    this.transactions
        .forEach(         
          wrpr => {           
              this.deleteTxn(wrpr);            
          }
        );         
  }
}
