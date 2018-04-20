import { Injectable } from '@angular/core';
import { BatchLog } from './batch-log';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class BatchLogService {
  private collection = 'BATCHLOG';

  constructor(private _fireStore: AngularFirestore) { }

  getAll(): Observable<BatchLog[]> {
    return this._fireStore.collection<BatchLog>(this.collection,
                ref =>{
                  return ref.orderBy('date','desc').limit(5);
                })
                .valueChanges();
  }

}
