import { User as FBUser} from '@firebase/auth-types';

export class User {

    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    isLoggedIn:boolean|false;
  

  constructor(private _firebaseUser?:FBUser){
      if(_firebaseUser){
        this.isLoggedIn=true;
        this.email=_firebaseUser.email;
        this.displayName=_firebaseUser.displayName;
        this.phoneNumber=_firebaseUser.phoneNumber;
        this.providerId=_firebaseUser.providerId;
        this.uid=_firebaseUser.uid;
      }
  }
}
