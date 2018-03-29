import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  portfolioList:string[];
  constructor() { }

  ngOnInit() {
    this.portfolioList=['equity','watchlist','2018','2017'];
    //todo fetch from db
  }

}
