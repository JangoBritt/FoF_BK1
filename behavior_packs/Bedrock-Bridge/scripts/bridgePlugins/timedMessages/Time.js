export class Time {
    constructor(h, m, s){
        if (h<0||m<0||s<0||h>23||m>59||2>59){
            throw new Error("Time: wrong time out of bounds.");
        }
        this.h=h;
        this.m=m;
        this.s=s;
    }
    after(time){
        if (this.h===time.h)
            if (this.m===time.m)
                return this.s>time.m;
            else return this.m>time.m;
        else return this.h>time.h;
    }
    equals(time){
        return this.h===time.h && this.m===time.m && this.s===time.s;
    }
    afterNow(){
        const now = new Date();
        return this.afterDate(now);
        // return this.after({h:now.getHours(), m:now.getMinutes(), s:now.getSeconds()});
    }
    afterDate(date){
        return this.after({h:date.getHours(), m:date.getMinutes(), s:date.getSeconds()});
    }
    /**@param {Date} date*/
    setOnDate(date){
        return date.setHours(this.h, this.m, this.s, 0);
    }
    toArray(){
        return [this.h, this.m, this.s];
    }
    toNumber(){
        return 1.E3*this.s+6.E4*this.m+3.6E6*this.h;
    }
    static from(h, m, s){
        return new Time(h, m, s)
    }
    static fromString(text){
        return new Time(...text.split(":").map(m=>Number.parseInt(m)));
    }
}
