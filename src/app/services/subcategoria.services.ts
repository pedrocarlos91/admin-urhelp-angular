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
}
