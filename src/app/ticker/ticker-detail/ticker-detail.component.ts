import { Component, OnInit } from '@angular/core';
import { TickerService } from 'app/ticker/ticker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TickerWrapper } from '../ticker-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticker-detail',
  templateUrl: './ticker-detail.component.html',
  styleUrls: ['./ticker-detail.component.css']
})
export class TickerDetailComponent implements OnInit {
  
  tickerCode:string;
  wrpr:TickerWrapper;
  saving:boolean;
  notFound:boolean;
  constructor(private _tickerService: TickerService, private _router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.tickerCode = this.route.snapshot.params['tickercode'];
    this.saving=false;
    this.notFound=false;
    this._tickerService.getForUpdate(this.tickerCode)
                      .pipe(map(wrprs => wrprs[0]))
                      .subscribe(
                        w =>{
                          this.wrpr=w;
                          if(!w){
                            this.notFound=true;
                          }                         
                        },
                        err =>{
                          this.notFound=true;
                          console.error('error>'+err.message);
                        }
                      );
  }
  saveTicker(f:NgForm){
    this.saving =true;
    this._tickerService.saveTicker(this.wrpr).then(
      () =>{
        console.log('save completed');
        this.saving =false;
      },
      (err) =>{
        console.error('save failed'+err.message);
        this.saving =false;
      }
    );
  }
  deleteTicker(){
    console.log('deleting <'+this.wrpr.ticker.code+'>'+this.wrpr.docRef.id);
    this.saving=true;
    this._tickerService.deleteTicker(this.wrpr).then(
      ok => {
        this.saving=false;
        this._router.navigate(['ticker','list']);
      },
      err =>{
        this.saving=false;        
      }
    );
  }
}
