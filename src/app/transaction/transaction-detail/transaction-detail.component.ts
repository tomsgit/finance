import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Txn } from '../txn';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { Broker } from '../broker.enum';
import { TransactionService } from '../transaction.service';
import { DateUtil } from 'app/core/ngbootstrap/date-util';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { NgForm } from '@angular/forms';
import { TxnWrapper } from '../txn-wrapper';
import { Ticker } from 'app/ticker/ticker';
import { TickerService } from 'app/ticker/ticker.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  
  
  title:string;
  folioId:string;
  txnId:string;

  txn:Txn;
  _txnWrapper:TxnWrapper;
  TxnType = TxnType;
  Exchange = Exchange;
  Broker = Broker;
  _date: NgbDateStruct;
  error:string;
  saving:boolean;
  _query:String;
  tickers:Ticker[];

  constructor(private _tickerService:TickerService, private _txnService: TransactionService,private _dateUtil:DateUtil,private route: ActivatedRoute,private _router:Router) { 
    this.tickers=[];
  }

  ngOnInit() {
    this.title='Transaction Detail';
    this.folioId = this.route.snapshot.parent.params['folioId'];
    this.txnId = this.route.snapshot.params['txnId'];
    console.log(this.folioId +'<>'+this.txnId);
    this.init();
  }
  init():void{
    this._txnService.getTransaction(this.folioId,this.txnId)
        .pipe(
          tap(txnwpr => this.compute(txnwpr.txn))
          
        ).subscribe(
          t => this._txnWrapper=t,
          e => console.error('error while fetching transaction'+e.message),
          () => console.log('completed get transaction')
        );
    this.saving=false;
    this.getTickerData();
  }
  getTickerData():void{
    this._tickerService.getAllTickers().subscribe(
      (tickers:Ticker[]) =>{
        console.log('Tickers fetched');
        this.tickers=tickers;
      },
      (error)=>{
        console.error('error in ticker'+error);
      },
      ()=>{
        console.log('Completed the ticker service');
      }
    );
  }
  compute(t:Txn):void{
    
    this.txn=t;
    //date object comes as string!!! Convert to Date
    this.txn.date=new Date(this.txn.date);
    this._date = this._dateUtil.toNgbDateStruct( this.txn.date);
  }
  get date():NgbDateStruct{     
     return this._date;  
  }
  set date(dt:NgbDateStruct){
    if(dt){
      this._date=dt;  
      this.txn.date=this._dateUtil.fromNgbDateStruct(dt);
    }    
  }
  saveTransaction(form:NgForm){
    console.log('saving');
    this.saving=true;
    this._txnWrapper.txn=this.txn;
    this._txnService.saveTransaction(this._txnWrapper)
          .then(
            (result) =>{
              console.log('Saved document'+result);
              this.saving=false;
              
              this._router.navigate(['portfolio',this.folioId,'txns']);
            },
            (error) =>{
              console.log('error saving : '+error.message);
              this.error=error.message;
              this.saving=false;
            }

          )
  }
  deleteTxn():void{
    console.log('deleting <'+this._txnWrapper.txn.code+'>'+this._txnWrapper.docRef.id);
    this.saving=true;
    this._txnService.deleteTxn(this._txnWrapper);
    this.saving=false;
    this._router.navigate(['portfolio',this.folioId,'txns']);
  }
  get query(){
    return this._query;
  }
  set query(q:any){
    console.log('setq');
    let c=q;
    if(q.code){
      c=q.code;
    }
    this._query=c;
    if(! (c===this.txn.code || c.code===this.txn.code)){
      this.txn.code="";
      this.txn.name="";
    }
    
  }
  setTicker(item:Ticker){
    console.log('selected'+item);
    this.txn.code=item.code;
    this.txn.name=item.name;
  }
  formatter = (t:Ticker) =>{return t.code}
  search = (text$: Observable<string>) => {  
   
    return text$
    .pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
    .map(term => {
      if(term.length < 3){
        return [];
      }
      let q = term.toUpperCase();
      console.log('ticker search>'+q);
      return this.tickers
                  .filter(t =>                     
                      (t.code.toUpperCase().indexOf(q) > -1) 
                      || 
                      (t.name.toUpperCase().indexOf(q) > -1)
                  )
                  .slice(0, 10);
                  //.map(t => t.code);
    });
  }
}
