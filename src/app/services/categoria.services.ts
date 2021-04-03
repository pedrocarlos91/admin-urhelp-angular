import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';




@Injectable()

export class CategoriaService{
    public url: string;

    constructor( 
        public _http: HttpClient
    ) {
        this.url = globalUrl.url;

    }

    getCategorias(): Observable<any>{
        return this._http.get(this.url + 'servicios/categorias');
    }

    newCategoria(categoria, token):Observable<any>{
        let json = JSON.stringify(categoria);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'servicios/categorias', params, { headers:headers });
    }

    getCategoria(id): Observable<any> {
        return this._http.get(this.url + 'servicios/categorias/'+ id);
    }
}
