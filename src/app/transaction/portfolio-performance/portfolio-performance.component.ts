import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-performance',
  templateUrl: './portfolio-performance.component.html',
  styleUrls: ['./portfolio-performance.component.css']
})
export class PortfolioPerformanceComponent implements OnInit {
  title:string;
  constructor() { 
    this.title='Performance';
  }

  ngOnInit() {
  }

}
