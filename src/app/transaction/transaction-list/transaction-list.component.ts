import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Broker } from '../broker.enum';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { TransactionService } from '../transaction.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Txn } from '../txn';
import { ActivatedRoute } from '@angular/router';
import { TxnWrapper } from '../txn-wrapper';
import { Portfolio } from 'app/transaction/portfolio';
import { PortfolioService } from 'app/transaction/portfolio.service';
import { Ticker } from 'app/ticker/ticker';
import { TickerService } from 'app/ticker/ticker.service';
import { Quote } from 'app/ticker/quote/quote';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],

})
export class TransactionListComponent implements OnInit {

  title:string;
  transactions:TxnWrapper[];
  allTransactions:TxnWrapper[];
  portfolioList:Portfolio[];
  TxnType=TxnType;
  folioId:string;
  _copyTarget:string;
  copyTargetName:string;
  sortField:string;
  sortOrder:number;

  constructor(private _tickerService: TickerService, private _txnService:TransactionService,private route: ActivatedRoute,private _portfolioService:PortfolioService,private cdr: ChangeDetectorRef) { }
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
    this.sortOrder=1;
    
    this.getTransactions();
    this._portfolioService.getPortfolioList()
        .pipe(map(folioList => folioList.filter(folio => folio.id !== this.folioId)) )   
        .subscribe(
          folioList => this.portfolioList=folioList,
          err => console.error('err getting portfoliolist'+err.message),
          () => console.log('completed getting portfoliolist')
        );        
  }
  getTransactions(){
    console.log('Retrieving txns for folioId>'+this.folioId);
      this._txnService.getPorfolioTransactions(this.folioId)
                            .pipe(
                              map(wrprs => {
                                return wrprs.map(wrpr =>{
                                    this._txnService.compute(wrpr.txn);                                 
                                    return wrpr;
                                });
                              })
                            )
                            .subscribe(
                              result =>{
                                  this.transactions=result;
                                  this.allTransactions=result;
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
  sort(field:string){
    this.sortOrder=this.sortOrder*-1;
    let comparator:any;
    switch (field){
           
      case'code':{
        comparator=this.codeSorter;
        break;
      }
      case'type':{
        comparator=this.typeSorter;
        break;
      }
      case'value':{
        comparator=this.valueSorter;
        break;
      }
      case'date':{
        comparator=this.dateSorter;
        break;
      }
      default:{
        console.log('default sort');
        comparator=this.codeSorter;
        break;
      }
    }
    this.transactions.sort(comparator)
    
  }
 
  codeSorter=(l:TxnWrapper,r:TxnWrapper)=>{
    
    return this.sortOrder*(l.txn.code.localeCompare(r.txn.code));
  }
  typeSorter=(l:TxnWrapper,r:TxnWrapper)=>{
    
    return this.sortOrder*(l.txn.type>r.txn.type?1:-1);
  }
  valueSorter=(l:TxnWrapper,r:TxnWrapper)=>{
    
    return this.sortOrder*(l.txn.value>r.txn.value?1:-1);
  }
  dateSorter=(l:TxnWrapper,r:TxnWrapper)=>{
    
    return this.sortOrder*(l.txn.date>r.txn.date?1:-1);
    //console.log(this.sortOrder+' LEFT>'+l.txn.date+' RIGHT>'+r.txn.date+'o/p>'+o);
    //return o;
  }
  quote:Quote;
  setFilter(item:Ticker){
    console.log('selected'+item);
    this.filter=item;
    this.transactions= this.allTransactions.filter(t=> t.txn.code === this.filter.code);
    let q$=this._tickerService.getLatestQuote(this.filter.code);
    q$.subscribe(
        q =>{
           
            this.quote=q;
            this.cdr.markForCheck();
            console.log('quote'+this.quote.close);
            
        },
        (error)=>{
            console.error('error in quote>'+error.code +' : '+ error.message);
        },
        ()=>{
          console.log('Completed the quote service');
        }
    );
  }
  clearFilter(item:Ticker){
    this.filter=null;
    this.transactions=this.allTransactions;
    this.quote=null;
  }
  filter: Ticker;
  filterLabel:string="Filter";

}
