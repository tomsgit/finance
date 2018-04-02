import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Portfolio } from './portfolio';
import { Observable } from 'rxjs/Observable';
import { CollectionReference, QuerySnapshot } from '@firebase/firestore-types';

@Injectable()
export class PortfolioService {

  private readonly collection_portfolio: string;

  constructor(private _fireStore: AngularFirestore) {
    this.collection_portfolio = 'portfolio'
  }


  getPortfolioList(): Observable<Portfolio[]> {

    return this._fireStore.collection<Portfolio>(this.collection_portfolio, (query) => {
      return query.orderBy('priority', 'desc');
    }).snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let p = action.payload.doc.data() as Portfolio;
          p.id = action.payload.doc.id;
          return p;
        })
      });

  }

  /* getPortfolioRef(portfolioName:string):AngularFirestoreDocument<Portfolio>{
     this._fireStore.collection<Portfolio>(this.collection_portfolio,(query) =>{
      return query.where('name','==',portfolioName);
    }).valueChanges();
    return null;
  } */
  getPortfolio(portfolioId: string): Observable<Portfolio> {
     return this._fireStore.collection<Portfolio>(this.collection_portfolio)
            .doc<Portfolio>(portfolioId)
            .valueChanges();
  }
  getPortfolioRef(portfolioId: string): AngularFirestoreDocument<Portfolio> {
    return this._fireStore.collection<Portfolio>(this.collection_portfolio).doc(portfolioId);

  }

}
