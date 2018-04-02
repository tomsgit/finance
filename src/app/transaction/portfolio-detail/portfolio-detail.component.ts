import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from '../portfolio';
import { Observable } from 'rxjs/Observable';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {
  
  
  folio$: Observable<Portfolio>;
  folioId:string;
  constructor(private route: ActivatedRoute,private _portfolioService:PortfolioService) { }
 
  ngOnInit() {   
    this.folioId = this.route.snapshot.params['folioId'];
    this.folio$ = this._portfolioService.getPortfolio(this.folioId);
    
  } 

}
