import { Quote } from "./quote";
import { Observable } from "rxjs/Observable";

export interface IQuoteService {

    getLatesQuote(code:string):Observable<Quote>;
}
