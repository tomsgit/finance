import { Exchange } from "./exchange.enum";
import { Broker } from "./broker.enum";
import { TxnType } from "./txn-type.enum";
import { DocumentReference } from "@firebase/firestore-types";

export class Txn {

    code:string;
    
    name:string;
    shares:number;
    price:number;
    commission:number;
    date:Date;
    
   
    type:TxnType;
    exchange:Exchange;
    broker:Broker;
    value:number;

    
    
}
