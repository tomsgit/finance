import { Component, OnInit } from '@angular/core';
import { Txn } from '../txn';
import { Exchange } from '../exchange.enum';
import { TxnType } from '../txn-type.enum';
import { Broker } from '../broker.enum';

@Component({
  selector: 'transaction-txn-form',
  templateUrl: './txn-form.component.html',
  styleUrls: ['./txn-form.component.css']
})
export class TxnFormComponent implements OnInit {

  private txn:Txn;
  TxnType=TxnType;
  Exchange=Exchange;
  Broker=Broker;
  title:string;
  constructor() {
    this.title ='Add new Transaction'
    this.txn=new Txn();
    

   }

  ngOnInit() {
    this.txn.date=new Date();
    this.txn.exchange=Exchange.NSE;
    this.txn.type=TxnType.BUY;
    this.txn.broker=Broker.ZERODHA;
  }

}
