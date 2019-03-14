export class Trend {
    
    cost:number;
    value:number;

    gain:number;
    gainpercent:number;

    delta:number;
    deltapercent:number;

    date:Date;
    realised:number;
    
    static toObject(from:Trend):any{
        let obj:any = JSON.parse(JSON.stringify(from));
        obj.date=from.date;
        return obj;
    }

}


