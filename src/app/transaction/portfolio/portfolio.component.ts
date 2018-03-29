import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  
  portfolioName: string | '';
  
  constructor(private route: ActivatedRoute) { }
 
  ngOnInit() {   
    this.portfolioName = this.route.snapshot.params['folioName'];
    //to do get portfolio details
  } 

}
