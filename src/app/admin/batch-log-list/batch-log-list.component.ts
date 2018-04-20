import { Component, OnInit } from '@angular/core';
import { BatchLogService } from '../batch-log.service';
import { BatchLog } from '../batch-log';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-batch-log-list',
  templateUrl: './batch-log-list.component.html',
  styleUrls: ['./batch-log-list.component.css']
})
export class BatchLogListComponent implements OnInit {

  logs$:Observable<BatchLog[]>;
  title:string;
  constructor(private _batchLogSvc:BatchLogService) { }

  ngOnInit() {
    this.title="Batch Log";
    this.logs$ = this._batchLogSvc.getAll();
  }

}
