import { Txn } from "./txn";
import { TxnType } from "./txn-type.enum";
import { Ticker } from "./ticker";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Quote } from "./quote";


export class PortfolioPerf {
    code:string;
    name:string;

    shares:number;
    costValue:number;
    
    currentPrice:number;
    currentValue:number
    gainPercent:number;
    gain:number;
    realisedGain:number;
    change:number;
    changePercent:number;
    txns:Txn[];
    private _avgPrice:number;
    _quote:Quote;
    
    
    set quote(q:Quote){
        //console.log('set quote'+q);
        this._quote=q;
        if(q){
            if(q.close){
                //console.log('set quote close'+q.close);
                this.currentPrice=q.close;
                this.currentValue=this.currentPrice*this.shares;
                this.change=q.close-q.prevclose;
                this.changePercent=this.change*100/q.last;
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
}
