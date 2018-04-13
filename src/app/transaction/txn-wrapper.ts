import { DocumentReference } from "@firebase/firestore-types";
import { Txn } from "./txn";

export class TxnWrapper {

    txn:Txn;
    docRef:DocumentReference;
}
