import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';

@Injectable()

export class MunicipioService {
    public url: string;

    constructor(public _http: HttpClient){
        this.url = globalUrl.url;
    }

    getMunicipio(est:number): Observable<any>{
        return this._http.get(this.url + 'servicios/municipios/' + est);
    }

    newMunicipio(municipio, token): Observable<any>{
        let json = JSON.stringify(municipio);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'servicios/municipios', params, { headers:headers });
    }

    delete(id: number, token): Observable<any>{
        let headers= new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.url + 'servicios/municipios/' + id, {headers: headers});
    }
}