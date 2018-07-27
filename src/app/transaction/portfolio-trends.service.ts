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
                trend.date=new Date(ts.toDate());   
              }else{
                trend.date=new Date(trend.date);
              }
                    
              return trend;
            })
          })
        );
  }
  saveTrend(trend:Trend,porfolioId:string ):void{
    
    let pref = this._portfolioService.getPortfolioRef(porfolioId);
    
    
    let today:Date=new Date();
    today.setHours(0,0,0,0);
    console.log(today);

    //is trend already saved for the day?
    pref.collection<Trend>(this.collection_trends, ref=>ref.where("date",">=",today))
      .valueChanges()
      .subscribe(
        data => {
          console.log('trend for today'+data.length)
          data.forEach(t=>{
            console.log(t.date);
          });
          if(data && data.length > 0){
            //do nothing
            console.log("trend already exists");
            
          }else{
            console.log("saving trend");
            
            return pref
            .collection<Trend>(this.collection_trends)
            .add(Trend.toObject(trend))
            .then(
              (value) =>{
                console.log('saved trend'+value.id) ;
              },
              (reason) =>{
                console.log('save trend failed'+reason) ;
              }
          );
          }
        }
      );

    
     
  }
}
