import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from '../portfolio';
import { Observable } from 'rxjs';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'portfolio-container-child',
  templateUrl: './portfolio-container-child.component.html',
  styleUrls: ['./portfolio-container-child.component.css']
})
export class PortfolioContainerChildComponent implements OnInit {
  
  
  folio$: Observable<Portfolio>;
  folioId:string;
  constructor(private route: ActivatedRoute,private _portfolioService:PortfolioService) { }
 
  ngOnInit() {   
    this.folioId = this.route.snapshot.params['folioId'];
    this.folio$ = this._portfolioService.getPortfolio(this.folioId);
    
  } 

}
