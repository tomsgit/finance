import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'portfolio-container-root',
  templateUrl: './portfolio-container-root.component.html',
  styleUrls: ['./portfolio-container-root.component.css']
})
export class PortfolioContainerRootComponent implements OnInit {
  

  
  constructor(private route: ActivatedRoute) { }
 
  ngOnInit() {   
    
  } 

}
