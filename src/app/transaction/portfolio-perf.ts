import { Txn } from "./txn";
import { TxnType } from "./txn-type.enum";

export class PortfolioPerf {
    code:string;
    name:string;
    shares:number;
    costValue:number;
    
    currentPrice:number;
    currentValue:number
    gainPercet:number;
    gain:number;
    realisedGain:number;
    change:number;
    changePercent:number;
    txns:Txn[];
    get avgPrice():number{
        return this.costValue/this.shares;
    }
    
    constructor(t:Txn){
        this.code=t.code;
        this.shares=t.shares;
        this.costValue=t.value;
        this.txns=[];
        this.txns.push(t);
        
    }
    addTransaction(t:Txn){
        if(t.type as TxnType === TxnType.BUY){
            this.shares+=t.shares;
            this.costValue+=t.value;
        }else{
            this.shares-=t.shares;
            this.costValue-=t.value;
        }
        this.txns.push(t);
        
    }
}
