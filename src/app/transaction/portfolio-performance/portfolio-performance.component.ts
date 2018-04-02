import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Txn } from '../txn';
import { PortfolioPerf } from '../portfolio-perf';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-portfolio-performance',
  templateUrl: './portfolio-performance.component.html',
  styleUrls: ['./portfolio-performance.component.css']
})
export class PortfolioPerformanceComponent implements OnInit {
  title:string;

  private _folio:Map<string,PortfolioPerf>;
  folios:Observable<PortfolioPerf[]>;
  folioId:string;

  ngOnInit() {
    this.title="Portfolio Performance";
    
    this.folioId = this.route.snapshot.parent.params['folioId'];
    //this.folio=new Map<string,PortfolioPerf>();
    this.loadTransactions();
  }
  constructor(private _txnService:TransactionService,private route: ActivatedRoute) { 
    this._folio=new Map<string,PortfolioPerf>();

  }
  
  loadTransactions():void{
    console.log('Retrieving txns for folioId>'+this.folioId);
    let txns:Observable<Txn[]> = this._txnService.getPorfolioTransactions(this.folioId)
                          .map(result => {
                              return result.map(txn =>{
                                  this._txnService.compute(txn);                                 
                                  return txn;
                              });
                          });
    this.folios = txns.map(txns =>{
                            this.pushTransactions(txns);
                            
                            return Array.from(this._folio.values());
                          });
                         
  }
  pushTransactions(txns:Txn[]){
    
    txns.forEach(
      t =>{
        let c = t.code.toLowerCase();
        console.log('adding txn for '+c);
        if(this._folio.has(c)){
          console.log('Folio entry exists for '+c);
          this._folio.get(c).addTransaction(t);
        }else{
          console.log('New Folio entry for '+c);
          this._folio.set(c,new PortfolioPerf(t));          
        }
      }
    );
  }
}
