import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Injectable()
export class LoginRouteGuardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._authService.authState().map(
      (user:User) => {
          if(user && user.uid){
            this.router.navigate(['/portfolio']);
            return false;
          }else{
            
            return true;
          }
      });    
  }
  constructor(private _authService: AuthService,private router: Router) { }

}
