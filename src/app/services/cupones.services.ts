import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';

@Injectable()
export class CuponService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = globalUrl.url;
    }

    getCupones(token): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url + 'cupon', { headers: headers });
    }

    storeCupon(cupon: any, token:string): Observable<any>{
        let json = JSON.stringify(cupon);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'cupon', params, { headers:headers });

    }

    getCupon(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url + 'cupon/' + id, { headers: headers });
    }

    updateCupon(cupon: any, token: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        let id = cupon.id;
        let params = 'json=' + JSON.stringify(cupon);
        return this._http.put(this.url + 'cupon/' + id, params, { headers:headers });
    }

    deleteCupon(id: number, token):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.url + 'cupon/' + id, {headers:headers})
    }
}