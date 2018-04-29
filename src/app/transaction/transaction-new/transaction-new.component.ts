import { Component, OnInit } from '@angular/core';
import { Txn } from '../txn';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { Broker } from '../broker.enum';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from 'app/core/ngbootstrap/date-util';
import { NgForm } from '@angular/forms';
import { TickerService } from 'app/ticker/ticker.service';
import { Ticker } from 'app/ticker/ticker';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class NewTransactionComponent implements OnInit {

  private txn: Txn;
  _query:String;
  TxnType = TxnType;
  Exchange = Exchange;
  Broker = Broker;
  title: string;
  folioId: string;
  _date: NgbDateStruct;
  error:string;
  saving:boolean;
  tickers:Ticker[];
  constructor(private _tickerService:TickerService, private _txnService: TransactionService, private route: ActivatedRoute, private _dateUtil:DateUtil,private _router:Router) {
     this.tickers=[];
     
  }

  ngOnInit() {
    this.title = 'Add new Transaction'
    this.folioId = this.route.snapshot.parent.params['folioId'];
    console.log('Add txns for folioId>' + this.folioId);
    this.init();
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
  /*
  search (text$: Observable<string>){
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => console.log('searching'))
      .switchMap(term =>
        Observable.of(['alpha','beta'])
      .do(() => console.log('search complete'));

  }*/
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
  addTransaction(form:NgForm){
    console.log('saving');
    this.saving=true;
    this._txnService.addTransaction(this.txn,this.folioId)
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
  init():void{
    this.txn = new Txn();
    this.txn.date = new Date();
    this._date = this._dateUtil.toNgbDateStruct( this.txn.date); 
    this.txn.exchange = Exchange.NSE;
    this.txn.type = TxnType.BUY;
    this.txn.broker = Broker.ZERODHA;
    this.saving=false;
    this.getTickerData();
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
  setTicker(item:Ticker){
    console.log('selected'+item);
    this.txn.code=item.code;
    this.txn.name=item.name;
  }
  
}
