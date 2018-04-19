import { Component, OnInit } from '@angular/core';
import { Ticker } from 'app/ticker/ticker';
import { TickerService } from 'app/ticker/ticker.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-ticker',
  templateUrl: './new-ticker.component.html',
  styleUrls: ['./new-ticker.component.css']
})
export class NewTickerComponent implements OnInit {

  ticker:Ticker;
  saving:boolean;
  error:string;

  constructor(private _tickerService: TickerService, private _router:Router) { 
    this.saving =false;
    this.ticker=new Ticker();
  }

  ngOnInit() {
  }

  addTicker(form:NgForm){
    console.log('saving');
    this.saving=true;
    this._tickerService.addTicker(this.ticker)
          .then(
            (result) =>{
              console.log('Saved ticker'+result);
              this.saving=false;              
              this._router.navigate(['ticker']);
            },
            (error) =>{
              console.log('error saving : '+error.message);
              this.error=error.message;
              this.saving=false;
            }

          );

         
  }

}
