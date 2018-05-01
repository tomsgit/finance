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
import { Portfolio } from 'app/transaction/portfolio';
import { PortfolioService } from 'app/transaction/portfolio.service';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],

})
export class TransactionListComponent implements OnInit {

  title:string;
  transactions:TxnWrapper[];
  portfolioList:Portfolio[];
  TxnType=TxnType;
  folioId:string;
  _copyTarget:string;
  copyTargetName:string;

  constructor(private _txnService:TransactionService,private route: ActivatedRoute,private _portfolioService:PortfolioService) { }
  get copyTarget(){
    return this._copyTarget;
  }
  set copyTarget(p:string){
    this._copyTarget=p;
    this.copyTargetName = this.portfolioList.find(f => f.id===p).name;
  }
  ngOnInit() {
    this.title="Transaction List";
    this.folioId = this.route.snapshot.parent.params['folioId'];
    this.getTransactions();
    this._portfolioService.getPortfolioList()
        .map(folioList => folioList.filter(folio => folio.id !== this.folioId))    
        .subscribe(
          folioList => this.portfolioList=folioList,
          err => console.error('err getting portfoliolist'+err.message),
          () => console.log('completed getting portfoliolist')
        );        
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
  copyTxn(txn:Txn){
    console.log(txn);
    console.log(this._copyTarget);
    this._txnService.addTransaction(txn,this.copyTarget);
  }

}
