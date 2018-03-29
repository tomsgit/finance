import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


import { Observable } from 'rxjs/Observable';
import { User } from '../user';


@Component({
  selector: 'app-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

  constructor(private _authService: AuthService) { 
    
  }
  private user$:Observable<User>;
  ngOnInit() {
    //this.subscribeToAuthState();
    this.user$=this._authService.authState();
  }
  
  
  logout():void{
    this._authService.logout();
  }

}
