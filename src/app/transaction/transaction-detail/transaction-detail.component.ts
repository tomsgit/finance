import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Txn } from '../txn';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { Broker } from '../broker.enum';
import { TransactionService } from '../transaction.service';
import { DateUtil } from 'app/core/ngbootstrap/date-util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { TxnWrapper } from '../txn-wrapper';
import { Ticker } from 'app/ticker/ticker';
import  firebase  from 'firebase/compat/app';


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
  labelSearch:string="Search";

  constructor(private _txnService: TransactionService,private _dateUtil:DateUtil,private route: ActivatedRoute,private _router:Router) { 

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

  }
  
  compute(t:Txn):void{
    
   
    if(t.date instanceof firebase.firestore.Timestamp){
      let ts:firebase.firestore.Timestamp=t.date;
      t.date=ts.toDate();
      //console.log('computeT>>>' +txn.date.constructor.name);
    }else{
       //date object comes as string!!! Convert to Date
      t.date=new Date(t.date);
    }
    this.txn=t;
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
    console.log("<>>>"+this.txn.date);
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
  
  setTicker(item:Ticker){
    console.log('selected'+item);
    this.txn.code=item.code;
    this.txn.name=item.name;
  }
  
}
