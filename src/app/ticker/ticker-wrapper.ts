import { DocumentReference } from "@firebase/firestore-types";
import { Ticker } from "./ticker";

export class TickerWrapper {
    ticker:Ticker;
    docRef:DocumentReference;
}
