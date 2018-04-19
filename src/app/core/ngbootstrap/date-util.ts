import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class DateUtil {

    public toNgbDateStruct(date: Date): NgbDateStruct {
        return { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() }

    }
    public fromNgbDateStruct(dt: NgbDateStruct) {
       
        let date = new Date();
        date.setDate(dt.day);
        date.setMonth(dt.month-1)
        date.setFullYear(dt.year);
        return date;
    }
}
