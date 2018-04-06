import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FBUser } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  constructor(private _firebaseAuth:AngularFireAuth) { }
 
  authState():Observable<User>{
   return this._firebaseAuth.authState.map((fbUser:FBUser,index:number)=>{
    console.log('fbuser'+fbUser);
    return new User(fbUser);
   });
  }
  isLoggedIn():boolean{
    let loggedIn=false;
    if(this._firebaseAuth.authState){
      loggedIn=true;
      this._firebaseAuth.authState.subscribe(
        (user:FBUser) =>{
          if(user){
            console.log('Logged in'+user.displayName);
          }
        },
        (error) => {
          console.log('Auth error' + error);
        }
      );
    }
    return loggedIn;
  }
  login(email:string, password:string):Promise<any>{
    console.log('calling firebase:'+email+'||'+password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword (email,password)
        .then((result)=>{
          console.log('Processed' + result);
         
        })
        .catch((error:Error)=> {
          console.log('error' + error.name);
          throw error;
        });
  }
  logout() {
    this._firebaseAuth.auth.signOut();
  }
}
