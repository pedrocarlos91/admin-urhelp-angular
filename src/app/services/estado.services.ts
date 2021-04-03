import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';


@Injectable()

export class EstadosService{
    public url:string;

    constructor( public _http: HttpClient ){
        this.url = globalUrl.url;
    }

    getEstados(): Observable<any>{
        return this._http.get(this.url + 'servicios/estados');
    }

    getEstado(id: number): Observable <any>{
        return this._http.get(this.url + 'servicios/estados/' + id);
    }

    newEstado(estado, token): Observable<any>{
        let json = JSON.stringify(estado);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'servicios/estados', params, { headers:headers });
    }
}