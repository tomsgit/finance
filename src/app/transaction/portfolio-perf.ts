import { Txn } from "./txn";
import { TxnType } from "./txn-type.enum";
import { Ticker } from "./ticker";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Quote } from "./quote";


export class PortfolioPerf {
    code:string;
    
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
        console.log('set quote'+q);
        if(q){
            if(q.close){
                console.log('set quote close'+q.close);
                this.currentPrice=q.close;
                this.currentValue=this.currentPrice*this.shares;
                this.change=q.close-q.last;
                this.changePercent=this.change*100/q.last;
                this.gain=(this.currentPrice*this.shares)-this.costValue;
                this.gainPercent=this.gain*100/this.costValue;

            }

        }
    }

    get avgPrice():number{
        console.log('avg price');        
        return this._avgPrice;
    }
    
    constructor(t:Txn){
        this.code=t.code;
        this.shares=t.shares;
        this.costValue=t.value;
        this._avgPrice=t.value/t.shares;
        this.txns=[];
        this.txns.push(t);
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
