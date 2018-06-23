import { Quote } from "./quote";
import { Observable } from "rxjs";

export interface IQuoteService {

    getLatesQuote(code:string):Observable<Quote>;
}
