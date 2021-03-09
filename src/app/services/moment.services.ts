import { Injectable } from '@angular/core';
import * as Moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class MomentService{
    moment = (Moment as typeof Moment);
    constructor(){
        this.moment.locale('es');
    }
    
    //Obtener la fecha actual. Domingo, Agosto 2, 2020 12:05 
    getNow(){
        var now = this.moment().format('LLLL');
        return now;
    }

    //Obtener la fecha actual. 01/01/2020 13:20
    getNowTimeStamp(){
        var now = this.moment().format('YYYY/MM/DD HH:mm');
        return now;
    }
    
    //Fecha relativa. En 8 días, hace 2 semanas
    getTimeFromNow(fecha){
        return this.moment(fecha, "YYYY-MM-DD").fromNow();
    }
    
    //Saber si la fecha dada es anterior a la actual
    getIsBefore(vencimiento){
        return this.moment().isBefore(vencimiento);
    }

    //Convierte la fecha dada en formato 14 de jul. de 2020
    getDate(date){
        return this.moment(date).format('ll');
    }

    //Saber si la fecha dada es igual o anterior a la actual
    getIsSameBefore(date){
        return this.moment(date).isSameOrBefore(this.moment());
    }

    //obtener la hora ampm
    getHour(hour){
        return this.moment(hour, "hh:mm:ss").format('hh:mm a');
    }
}