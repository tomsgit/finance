import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Portfolio } from '../portfolio';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Txn } from '../txn';
import { PortfolioPerf } from '../portfolio-perf';
import { Observable } from 'rxjs/Observable';
import { TickerService } from '../ticker.service';
import { Ticker } from '../ticker';
import { Quote } from "../quote";
import { PortfolioService } from '../portfolio.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-performance',
  templateUrl: './portfolio-performance.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./portfolio-performance.component.css']
})
export class PortfolioPerformanceComponent implements OnInit {
  
  title:string;
  private folios:Observable<PortfolioPerf[]>;
  private _tickerCache:Map<string,Ticker>;
  private _quotes:Map<string,Quote>
  folioId:string;
 
  
  constructor(private _portfolioService:PortfolioService,private route: ActivatedRoute, private _tickerService: TickerService,private cdr: ChangeDetectorRef) { 
    this._tickerCache=new Map<string,Ticker>();
    this._quotes=new Map<string,Quote>();
    
    
  }
  ngOnInit() {
    this.title="Portfolio Performance";
    
    this.folioId = this.route.snapshot.parent.params['folioId'];  
    this.getPortfolioData();
    this.getTickerData();    
  }
  getPortfolioData():void{
    this.folios = this._portfolioService
                      .calculatePortfolio(this.folioId)
                      .pipe(
                        tap(folioList =>{
                          folioList.forEach(
                            folio =>{
                              this.getQuote(folio);
                            }
                          );
                        })
                      );
    
      
  }
  getTickerData():void{
    this._tickerService.getAllTickers().subscribe(
      (next:Ticker[]) =>{
        console.log('Tickers fetched');
        next.forEach(t =>{

          this._tickerCache.set(t.code,t);
        });
      },
      (error)=>{
        console.error('error in ticker'+error);
      },
      ()=>{
        console.log('Completed the ticker service');
      }
    );
  }
  getQuote(p:PortfolioPerf){
    console.log('setting quote$');
    let q$=this._tickerService.getLatestQuote(p.code);
    q$.subscribe(
        q =>{
            console.log('quote obtained');
            p.quote=q;
            this.doTotals(p)
            this.cdr.markForCheck();
            
        },
        (error)=>{
            console.error('error in quote>'+error.code +' : '+ error.message);
        },
        ()=>{
        console.log('Completed the quote service');
        }
    );
  }
  /*
  <td>{{tcost | number:'1.0-2'}}</td>
      <td>{{tvalue | number:'1.0-2'}}</td>
      <td>{{tgain | number:'1.0-2'}}</td>
      <td>{{tgainpercent | number:'1.0-2'}}</td>
      <td>{{tchange | number:'1.0-2'}}</td>
      <td>{{tchangePercent | number:'1.0-2'}}</td>
  */
  tcost:number=0;
  tvalue:number=0;
  tgain:number=0;
  tgainpercent:number=0;
  tchange:number=0;
  tchangePercent:number=0;
  doTotals(p:PortfolioPerf){
    this.tcost+=p.costValue;
    this.tvalue+=p.currentValue;

    this.tgain+=p.gain;
    this.tgainpercent=this.tgain*100/this.tcost;

    this.tchange+=(p.change*p.shares);
    this.tchangePercent=this.tchange*100/this.tcost;
  }

}
