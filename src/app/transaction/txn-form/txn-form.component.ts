import { Component, OnInit } from '@angular/core';
import { Txn } from '../txn';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { Broker } from '../broker.enum';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../ngbootstrap/date-util';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'transaction-txn-form',
  templateUrl: './txn-form.component.html',
  styleUrls: ['./txn-form.component.css']
})
export class TxnFormComponent implements OnInit {

  private txn: Txn;
  TxnType = TxnType;
  Exchange = Exchange;
  Broker = Broker;
  title: string;
  folioId: string;
  _date: NgbDateStruct;
  error:string;
  saving:boolean;
  constructor(private _txnService: TransactionService, private route: ActivatedRoute, private _dateUtil:DateUtil,private _router:Router) {
     
     
  }

  ngOnInit() {
    this.title = 'Add new Transaction'
    this.folioId = this.route.snapshot.parent.params['folioId'];
    console.log('Add txns for folioId>' + this.folioId);
    this.init();
  }
  saveTransaction(form:NgForm){
    console.log('saving');
    this.saving=true;
    this._txnService.saveTransactions(this.txn,this.folioId)
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
  init():void{
    this.txn = new Txn();
    this.txn.date = new Date();
    this._date = this._dateUtil.toNgbDateStruct( this.txn.date); 
    this.txn.exchange = Exchange.NSE;
    this.txn.type = TxnType.BUY;
    this.txn.broker = Broker.ZERODHA;
    this.saving=false;
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
  
}
