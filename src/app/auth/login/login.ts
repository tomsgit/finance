export class Login {
    constructor(public _loginId:string,public password:string){

    }
    get loginId(){
        return this._loginId;
    }
    set loginId(lid:string){
        console.log('set'+lid);
        
        this._loginId=lid;
    }
}
