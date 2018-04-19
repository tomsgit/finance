import { Component, OnInit } from '@angular/core';
import { TickerService } from 'app/ticker/ticker.service';

import { Ticker } from 'app/ticker/ticker';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ticker-list',
  templateUrl: './ticker-list.component.html',
  styleUrls: ['./ticker-list.component.css']
})
export class TickerListComponent implements OnInit {

  tickers$:Observable<Ticker[]>;
  constructor(private _tickerService: TickerService) { }

  ngOnInit() {

    this.tickers$ = this._tickerService.getAllTickers();
  }

}
