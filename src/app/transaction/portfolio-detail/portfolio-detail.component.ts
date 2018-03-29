import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {
  
  
  portfolioName: string | '';

  constructor(private route: ActivatedRoute) { }
 
  ngOnInit() {   
    this.portfolioName = this.route.snapshot.params['folioName'];
    //to do get portfolio details
  } 

}
