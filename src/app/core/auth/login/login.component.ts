import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from './login';
import { Router } from '@angular/router';
import { User } from '../user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError:string; 
  loginForm:Login;
  
  constructor(private _authService: AuthService, private _router:Router) { 
    
  }

  ngOnInit() {
    this._authService.authState()
      .pipe(
        map(
          (user:User) => {
              if(user && user.uid){
                this._router.navigate(['/portfolio']);
              }
        })
      );
    
    this.loginForm=new Login('','');
   
    
  }
  login() {
  
      this._authService.login(this.loginForm.loginId,this.loginForm.password)
      .then((result:any)=>{
        console.log('login success. Redirecting');
        this._router.navigate(['/portfolio']);
      })  
      .catch((error) =>{
        console.log('error during login'+error);
        this.authError=error.name+ ' : '+error.message;
      });
      
  }
  

}
