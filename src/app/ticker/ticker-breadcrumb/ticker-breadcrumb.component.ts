import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ticker-breadcrumb',
  templateUrl: './ticker-breadcrumb.component.html',
  styleUrls: ['./ticker-breadcrumb.component.css']
})
export class TickerBreadcrumbComponent implements OnInit {

  @Input() label:string;
  @Input() route:string;
  
  constructor() { }

  ngOnInit() {
  }

}
