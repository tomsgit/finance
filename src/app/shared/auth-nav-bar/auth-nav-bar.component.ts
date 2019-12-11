import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';


import { Observable } from 'rxjs';
import { User } from 'app/core/auth/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  //changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {
  
  user$:Observable<User>;
  
  constructor(private _authService: AuthService,private _router:Router) { 
  }

  ngOnInit() {
    
    this.user$ = this._authService.authState();
  }
    
  logout():void{
    
    this._authService.logout();
    this.user$=this._authService.authState();
    this._router.navigate(['/login']);
  }

}
