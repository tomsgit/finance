import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PortfolioService } from 'app/transaction/portfolio.service';
import { Observable } from 'rxjs';
import { Trend } from 'app/transaction/trend';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PortfolioTrendsService {

  constructor(private _fireStore:AngularFirestore, private _portfolioService:PortfolioService ) { 
    this.collection_trends="trends";
  }

  private readonly collection_trends: string;
  
  
  getTrends(porfolioId:string):Observable<Trend[]>{
    return this._portfolioService
        .getPortfolioRef(porfolioId)
        .collection(this.collection_trends,ref=>{
          return ref.orderBy('date','desc');
        })
        .snapshotChanges()
        .pipe(
          map(actions => {

            return actions.map(action => {
              
              let trend:Trend = new Trend();
             
              trend=action.payload.doc.data() as Trend;
              if(trend.date instanceof firestore.Timestamp){
                let ts:firestore.Timestamp=trend.date;
                trend.date=ts.toDate();   
              }
                    
              return trend;
            })
          })
        );
  }
  saveTrend(trend:Trend,porfolioId:string ):Promise<any>{
    
    return this._portfolioService.getPortfolioRef(porfolioId)
        .collection<Trend>(this.collection_trends)
        .add(JSON.parse(JSON.stringify(trend)))
        .then(
          (value) =>{
            return value.id;
          },
          (reason) =>{
            return reason;
          }
        );
  }
}
