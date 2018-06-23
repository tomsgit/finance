import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Injectable()
export class LoginRouteGuardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._authService.authState()
      .pipe(
        map(
          (user:User) => {
              if(user && user.uid){
                this.router.navigate(['/portfolio']);
                return false;
              }else{
                
                return true;
              }
          })
      );    
  }
  constructor(private _authService: AuthService,private router: Router) { }

}
