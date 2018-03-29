import { Component, OnInit } from '@angular/core';
import { Broker } from '../broker.enum';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { TransactionService } from '../transaction.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Txn } from '../txn';

@Component({
  selector: 'transaction-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class TransactionsComponent implements OnInit {

  title:string;
  transactions:Observable<Txn[]>;
  
  constructor(private _txnService:TransactionService) { }
  TxnType=TxnType;
  ngOnInit() {
    this.title="Transaction List";
    
    this.transactions = this._txnService.getTransactions();
    
    //this._txnService.saveTransactions(null);

  }

}
