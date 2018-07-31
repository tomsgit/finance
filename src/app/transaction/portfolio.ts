import { DocumentReference } from "@firebase/firestore-types";

export class Portfolio {

    id: string;
    description: string;
    name: string;
    uid: string;
    date:Date;
    priority:number;
    txncount:number;

    static toObject(folio:Portfolio):any{
        let obj:any=JSON.parse(JSON.stringify(folio));
        obj.date=new Date();
        return obj;
    }
}
