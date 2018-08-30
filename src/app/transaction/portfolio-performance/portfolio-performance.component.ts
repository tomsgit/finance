import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Portfolio } from '../portfolio';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Txn } from '../txn';
import { PortfolioPerf } from '../portfolio-perf';
import { Observable } from 'rxjs';
import { TickerService } from 'app/ticker/ticker.service';
import { Ticker } from 'app/ticker/ticker';
import { Quote } from "app/ticker/quote/quote";
import { PortfolioService } from '../portfolio.service';
import { tap, map } from 'rxjs/operators';
import { Trend } from '../trend';
import { PortfolioTrendsService } from '../portfolio-trends.service';

@Component({
  selector: 'app-portfolio-performance',
  templateUrl: './portfolio-performance.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./portfolio-performance.component.css']
})
export class PortfolioPerformanceComponent implements OnInit {
  
  
  title:string;
  //private folios$:Observable<PortfolioPerf[]>;
  folios:PortfolioPerf[];
  private _tickerCache:Map<string,Ticker>;
  private _quotes:Map<string,Quote>
  folioId:string;
  sortField:string;
  sortOrder:number;
  _nameWidth:number;
  _nameWidthMax:number;
  _nameWidthMin:number;
  isExpanded:boolean;
  copyTarget:string;
  snapshotError:string;
  targetList:Portfolio[];


  
  @ViewChild('chart') chart: ElementRef;
  @ViewChild('grid') grid: ElementRef;

  showChart(){
    let el:HTMLElement = <HTMLElement>this.chart.nativeElement;
    el.scrollIntoView({behavior:"smooth"});
  }
  showGrid(){
    let el:HTMLElement = <HTMLElement>this.grid.nativeElement;
    el.scrollIntoView({behavior:"smooth"});
  }
  constructor( private _trendService:PortfolioTrendsService,private _portfolioService:PortfolioService,private route: ActivatedRoute, private _tickerService: TickerService,private cdr: ChangeDetectorRef) { 
    this._tickerCache=new Map<string,Ticker>();
    this._quotes=new Map<string,Quote>();
    this.folios=[];
    this._nameWidthMin=10;
    this._nameWidthMax=20;
    this._nameWidth=this._nameWidthMin;
    this.isExpanded=false;
    this.copyTarget="";       
  }
  
  ngOnInit() {
    this.title="Portfolio Performance";
    this.sortOrder=1;
    this.folioId = this.route.snapshot.parent.params['folioId'];  
    this.getPortfolioData();
    //this.getTickerData();
    this.loadSnapshotTargets();
    this.waitAndLogTotals();
    
  
  }
  
  async waitAndLogTotals(){
    
    let a:number = await this.delay(5000);
    let trend:Trend = new Trend();
    trend.date=new Date();
    trend.cost=this.tcost;
    trend.value=this.tvalue;

    trend.delta=this.tchange;
    trend.deltapercent=this.tchangePercent;

    trend.gain=this.tgain;
    trend.gainpercent=this.tgainpercent;
    let isTrendValid:boolean =false;
    let logTrendForToday:boolean =false;
    if(trend.cost >0 && trend.value>0){
      isTrendValid=true;
    }else{
      console.log("totals not done. skipping trend setting");
    }
    console.log("Hours > "+trend.date.getHours());
    console.log("Minutes > "+trend.date.getMinutes());
    if(trend.date.getHours() >18){
      logTrendForToday=true;
      console.log("after 7 PM");
    }else if((trend.date.getHours() ==18) && (trend.date.getMinutes()>30)){
      logTrendForToday=true;
      console.log("after 6:30 PM");
    }
    
    if(logTrendForToday && isTrendValid){
      this._trendService.saveTrend(trend,this.folioId);
    }
      
    
    
  }
  
  delay(ms:number):Promise<number>{
    let a:Promise<number> = new Promise((value)=>setTimeout(value,ms));
    
    return a;
  }
  get nameWidth(){
   // console.log('name width');
    return this._nameWidth+'%';
  }
  incrNameWidth(){
    this._nameWidth=this._nameWidthMax;
    this.isExpanded=true;
  }
  decrNameWidth(){
    this._nameWidth=this._nameWidthMin;
    this.isExpanded=false;
  }
  getPortfolioData():void{
   this._portfolioService
                      .calculatePortfolio(this.folioId)
                      .pipe(
                        tap(folioList =>{
                          folioList.forEach(
                            folio =>{
                              this.getQuote(folio);
                              //console.log('folio processed'+folio.code);
                            }
                          );
                        })
                      ).subscribe(
                        data => {
                          this.folios=data;
                          this.sort('value');
                          
                        },
                        err => console.error('error doing portfolio'+err.message),
                        () => console.log('calc portfolio complete')
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
    //console.log('setting quote$'+p.code);
    let q$=this._tickerService.getLatestQuote(p.code);
    q$.subscribe(
        q =>{
           
            p.quote=q;
            this.doTotals(p)
            this.cdr.markForCheck();
            //console.log('quote obtained'+p.code);
            
        },
        (error)=>{
            console.error('error in quote>'+error.code +' : '+ error.message);
        },
        ()=>{
          console.log('Completed the quote service');
        }
    );
  }
  
  tcost:number=0;
  tvalue:number=0;
  tgain:number=0;
  tgainpercent:number=0;
  tchange:number=0;
  tchangePercent:number=0;
  doTotals(p:PortfolioPerf){
    if(p.shares ==0){
      //console.log('0 shares> skipping totalling for '+p.code)
      return;
    }
    if(!p.quote){
      console.log('no quote> skipping totalling for '+p.code)
      return;
    }
    this.tcost+=p.costValue;
    this.tvalue+=p.currentValue;

    this.tgain+=p.gain;
    this.tgainpercent=this.tgain*100/this.tcost;

    this.tchange+=(p.change);
    this.tchangePercent=this.tchange*100/this.tcost;
    //console.log('tcost'+this.tcost+'|tvalue'+this.tvalue+'|tgain'+this.tgain+'|tgainpercent'+this.tgainpercent+'|tchange'+this.tchange+'|tchangePercent'+this.tchangePercent);
  }


  sort(field:string){
    this.sortOrder=this.sortOrder*-1;
    let comparator:any;
    switch (field){
      case'value':{
        comparator=this.valueSorter;
        break;
      }
      case'delta':{
        comparator=this.deltaSorter;
        break;
      }
      case'deltapercent':{
        comparator=this.deltaPercentSorter;
        break;
      }
      case'gain':{
        comparator=this.gainSorter;
        break;
      }
      case'gainpercent':{
        comparator=this.gainPercentSorter;
        break;
      }
      
      
      case'code':{
        comparator=this.codeSorter;
        break;
      }
      default:{
        console.log('default sort');
        comparator=this.valueSorter;
        break;
      }
    }
    this.folios.sort(comparator)
    
  }
  costSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.costValue>r.costValue?1:-1);
  }
  codeSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.code.localeCompare(r.code));
  }
  valueSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.currentValue>r.currentValue?1:-1);
  }
  gainSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.gain>r.gain?1:-1);
  }
  gainPercentSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.gainPercent>r.gainPercent?1:-1);
  }
  deltaSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.change>r.change?1:-1);
    //console.log(this.sortOrder+' LEFT>'+l.changePercent+' RIGHT>'+l.changePercent+'o/p>'+o);
    //return o;
  }
  deltaPercentSorter=(l:PortfolioPerf,r:PortfolioPerf)=>{
    
    return this.sortOrder*(l.changePercent>r.changePercent?1:-1);
    //console.log(this.sortOrder+' LEFT>'+l.changePercent+' RIGHT>'+l.changePercent+'o/p>'+o);
    //return o;
  }
  loadSnapshotTargets(): any {
    this._portfolioService.getPortfolioList()
        .pipe(map(folioList => folioList.filter(folio => folio.id !== this.folioId)) )   
        .subscribe(
          folioList => {
            console.log('targetList>>>'+folioList.length);
            this.targetList=folioList;
          },
          err => console.error('err getting portfoliolist'+err.message),
          () => console.log('completed getting portfoliolist')
        );
  }
  createSnapShot():void{
    this.snapshotError='';
    if(this.copyTarget==''){
      this.snapshotError="Select the target portfolio"
      return;
    }
    console.log(this.copyTarget);
    this._portfolioService.createPortfolioSnapshot(this.copyTarget,this.folios);
  }
}
