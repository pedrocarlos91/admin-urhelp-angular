import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';


@Injectable()

export class SubcategoriaService{
    public url: string;

    constructor( public _http: HttpClient ) {
        this.url = globalUrl.url;

    }

    getSubCat(cat:number): Observable<any>{
       return this._http.get(this.url + 'servicios/subcategorias/' + cat);
    }

    getSubAllSubCat(): Observable <any> {
        return this._http.get(this.url + 'servicios/subcategorias');
    }

    newSubcategoria(subcat, token): Observable<any>{
        let json = JSON.stringify(subcat);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'servicios/subcategorias', params, { headers:headers });
    }

    delete(id: number, token): Observable<any>{
        let headers= new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.url + 'servicios/subcategorias/' + id, {headers: headers});
    }
}
