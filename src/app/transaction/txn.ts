import { Exchange } from "./exchange.enum";
import { Broker } from "./broker.enum";
import { TxnType } from "./txn-type.enum";

export class Txn {

    code:string;
    
    name:string;
    shares:number;
    price:number;
    commission:number;
    date:Date;
    value:number;
   
    type:TxnType;
    exchange:Exchange;
    broker:Broker;
    
    id;
}
