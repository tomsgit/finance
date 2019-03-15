import { Txn } from "./txn";
import { TxnType } from "./txn-type.enum";
import { Ticker } from "app/ticker/ticker";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Quote } from "app/ticker/quote/quote";


export class PortfolioPerf {
    code:string;
    name:string;

    shares:number;
    sharesToSettle:number;
    costValue:number;
    
    currentPrice:number;
    currentValue:number
    gainPercent:number;
    gain:number;
    realisedGain:number;
    change:number;
    changePercent:number;
    openTxns:Txn[];
    settledTxns:Txn[];
    private _avgPrice:number;
    _quote:Quote;
    realised:number=0;
    
    set quote(q:Quote){
        //console.log('set quote'+q);
        this._quote=q;
        if(q){
            if(q.close){
                //console.log('set quote close'+q.close);
                this.currentPrice=q.close;
                this.currentValue=this.currentPrice*this.shares;
                this.change=(q.close-q.prevclose)*this.shares;
                this.changePercent=(q.close-q.prevclose)*100/q.last;
                this.gain=(this.currentPrice*this.shares)-this.costValue;
                this.gainPercent=this.gain*100/this.costValue;

            }

        }
    }
    get quote():Quote{
        return this._quote;
    }
    get avgPrice():number{      
        return this._avgPrice;
    }
    constructor(t:Txn){
        this.code=t.code;
        this.name=t.name;
        this.openTxns=[];
        this.settledTxns=[];
        this.currentPrice=0;
        this.currentValue=0;
        this.shares=0;
        this.change=0;
        this.changePercent=0;
        this.gain=0;
        this.gainPercent=0;
        this.sharesToSettle=0;
        this.realised=0;
        this.costValue=0;
        this.addTransaction(t);
    }
    addTransaction(t:Txn){
        if(t.type as TxnType === TxnType.BUY){
            this.openTxns.push(t);
        }else{
            this.sharesToSettle+=t.shares
            this.settledTxns.push(t);
        }
    }
    settle(){
        //sort oldest last
        this.openTxns.sort((l,r) => {
            //console.log("L>"+l.date.constructor.name);
            //console.log("R>"+r.date.constructor.name);
            return l.date>r.date?-1:1;
        });
       // this.openTxns.forEach(t=>{
       //     console.log("ddbug"+t.name+">"+t.date);
        //})
        let t:Txn;
        while(this.sharesToSettle>0){
            t = this.openTxns.pop();
            //console.log(this.name+ '>pop>'+t.date+'shares>'+t.shares+'price>'+t.price);
            if(!t){
                console.log('Unbalanced transactions for '+this.code);
                throw new Error('Unbalanced transactions for '+this.code);
            }
            if(this.sharesToSettle < t.shares){
                let ratioOfSplit = this.sharesToSettle/t.shares;
                //clone
                let tnew = Object.assign(new Txn(),t);
                

                tnew.shares=tnew.shares-this.sharesToSettle;
                t.shares=this.sharesToSettle;

                t.value=t.value*ratioOfSplit;
                tnew.value=tnew.value-t.value;                                
                this.openTxns.push(tnew);
                
            }
            this.sharesToSettle=this.sharesToSettle-t.shares;
            this.settledTxns.push(t);
        }
        

        //calculate open
        this.openTxns.forEach(t => this.consolidateOpenTxn(t));
        //calculate settled
        this.settledTxns.forEach(t => this.consolidateSettledTxn(t));

        //this.diagnostics();
    }
    diagnostics(){
        console.log('-------START----------<'+this.name+'>---------------------------');

        console.log('-------OPEN TXN----------<'+this.name+'>---------------------------');
        this.openTxns.forEach(t => console.log(TxnType[t.type]+'|'+t.date +' | '+t.shares+'|'+t.price+'|val>'+t.value));

        console.log('-------OPEN TXN END----------<'+this.name+'>---------------------------');

        console.log('-------SETTLED TXN----------<'+this.name+'>---------------------------');
        this.settledTxns.forEach(t => console.log(TxnType[t.type]+'|'+t.date +' | '+t.shares+'|'+t.price+'|val>'+t.value))
        console.log('-------SETTLED TXN END----------<'+this.name+'>---------------------------');

        console.log('--------END---------<'+this.name+'>---------------------------');
    }
    consolidateSettledTxn(t:Txn){
        if(t.type as TxnType === TxnType.BUY){
            //console.log(this.name+'consolidateSettledTxn>>BUY>>'+t.value);
            this.realised-=t.value;
        }else{
            //console.log(this.name+'consolidateSettledTxn>>SELL>>'+t.value);
            this.realised+=t.value;
        }  
        //console.log(this.name+'consolidateSettledTxn>>total>>'+this.realised);       
    }
    consolidateOpenTxn(t:Txn){
        if(t.type as TxnType === TxnType.BUY){
            this.shares+=t.shares;
            this.costValue+=t.value;
            //console.log(this.name+'consolidateOpenTxn>>shares>>'+this.shares +'|costValue>'+this.costValue);
        }else{
            console.error(this.name+'Open transactions are BUY only');
        }
        //console.log(this.name+'consolidateOpenTxn>>total>>'+this.realised);
        this._avgPrice=this.costValue/this.shares;
        
        
    }
    /*
    constructor(t:Txn){
        this.code=t.code;
        this.name=t.name;
        if(t.type as TxnType === TxnType.BUY){
            this.shares=0+t.shares;
            this.costValue=0+t.value;
        }else{
            this.shares=0-t.shares;
            this.costValue=0-t.value;
        }
        this._avgPrice=t.value/t.shares;
        this.txns=[];
        this.txns.push(t);
        this.currentPrice=0;
        this.currentValue=0;
        this.change=0;
        this.changePercent=0;
        this.gain=0;
        this.gainPercent=0;
        //this.blank=Observable.of('');
        
        
    }
   
    addTransaction(t:Txn){
        if(t.type as TxnType === TxnType.BUY){
            this.shares+=t.shares;
            this.costValue+=t.value;
        }else{
            this.shares-=t.shares;
            this.costValue-=t.value;
        }
        
        this._avgPrice=this.costValue/this.shares;
        this.txns.push(t);
        
    }
     */
}
