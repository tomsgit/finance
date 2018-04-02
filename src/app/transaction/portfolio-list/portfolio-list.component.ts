import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { Portfolio } from '../portfolio';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  portfolioList$:Observable<Portfolio[]>;
  title:string;
  constructor(private _portfolioService:PortfolioService) { }

  ngOnInit() {
    this.title='Your portfolios';
    this.portfolioList$ = this._portfolioService.getPortfolioList();
    
  }

}
