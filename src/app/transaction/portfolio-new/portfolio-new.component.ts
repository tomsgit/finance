import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-new',
  templateUrl: './portfolio-new.component.html',
  styleUrls: ['./portfolio-new.component.css']
})
export class NewPortfolioComponent implements OnInit {

  constructor(private _portfoilioService:PortfolioService,private _router:Router) { }
  title:string;
  saving:boolean;
  folio:Portfolio;
  error:string;
  ngOnInit() {
    this.title="New Portfolio";
    this.saving=false;
    this.folio=new Portfolio();

  }

  addPortfolio(){
    console.log('saving');
    this.saving=true;
    this._portfoilioService.addFolio(this.folio)
          .then(
            (result) =>{
              console.log('Saved document'+result);
              this.saving=false;
              
              this._router.navigate(['portfolio']);
            },
            (error) =>{
              console.log('error saving : '+error.message);
              this.error=error.message;
              this.saving=false;
            }

          )
  }

}
