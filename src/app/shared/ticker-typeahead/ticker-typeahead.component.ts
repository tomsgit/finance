import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { Ticker } from 'app/ticker/ticker';
import { TickerService } from 'app/ticker/ticker.service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ticker-typeahead',
  templateUrl: './ticker-typeahead.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ticker-typeahead.component.css']
})
export class TickerTypeaheadComponent implements OnInit {

  private _query:String;
  private tickers:Ticker[];
  private _selection:Ticker;
  @Input() label:String;
  @Output() selection:EventEmitter<Ticker>;

  constructor(private _tickerService:TickerService) {
    this._query=''; 
    this.tickers=[];
    this.selection=new EventEmitter<Ticker>();
    this._selection=new Ticker();
  }

  ngOnInit() {
    this.getTickerData();
  }
  getTickerData():void{
    this._tickerService.getAllTickers().subscribe(
      (tickers:Ticker[]) =>{
        console.log('Tickers fetched');
        this.tickers=tickers;
      },
      (error)=>{
        console.error('error in ticker'+error);
      },
      ()=>{
        console.log('Completed the ticker service');
      }
    );
  }
  get query(){
    console.log('q>'+this._query)
    return this._query;
  }
  set query(q:any){
    console.log('setq');
    let c=q;
    if(q.code){
      c=q.code;
    }
    this._query=c;
    if(! (c===this._selection.code || c.code===this._selection.code)){
      this.setTicker(new Ticker());
    }
    
  }
  setTicker(item:Ticker){
    console.log('selected'+item);
    this._selection=item;
    this.selection.emit(item);
  }
  formatter = (t:Ticker) =>{return t.code}
  search = (text$: Observable<string>) => {  
   
    return text$
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        if(term.length < 3){
          return [];
        }
        let q = term.toUpperCase();
        console.log('ticker search>'+q);
        return this.tickers
                    .filter(t =>                     
                        (t.code.toUpperCase().indexOf(q) > -1) 
                        || 
                        (t.name.toUpperCase().indexOf(q) > -1)
                    )
                    .slice(0, 10);
                    //.map(t => t.code);
      })
    );
  }
}
