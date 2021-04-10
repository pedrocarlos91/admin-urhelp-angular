import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';

@Injectable()

export class AnuncioService{
    public url:string;
    public identity; 
    public token: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = globalUrl.url;
    }

    register(anuncio, token): Observable<any>{
        let json = JSON.stringify(anuncio);
        let params = 'json=' +json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);                            
        return this._http.post(this.url + 'anuncios', params, { headers:headers });
    }

    update(id, anuncio, token): Observable<any>{
        let json = JSON.stringify(anuncio);
        let params = 'json=' +json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        console.log(params);
        return this._http.put(this.url + 'anuncios/' + id, params, { headers:headers });
    }

    changeDisponibility(id, disponibilidad, token): Observable <any>{
        let json = JSON.stringify({id: id, disponibilidad: disponibilidad});
        let params = 'json=' +json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.put(this.url + 'anuncios/disponibility/' + id, params, { headers:headers });
    }

    getForUser(userId:number, token:string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
                                
        return this._http.get(this.url + 'anuncios/usuario/' + userId, {headers:headers});                                
    }

    getDetail(id): Observable<any>{
        return this._http.get(this.url + 'anuncios/' + id );
    }

    renovar(id, vigencia, token, anterior): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        let json = {
            id: id,
            vigencia: vigencia,
            vencimiento_anterior: anterior
        };
        let params = 'json=' + JSON.stringify(json);
        return this._http.post(this.url + 'anuncios/renovar', params, { headers:headers });                            
    }

    getCarrusel(): Observable <any>{
        return this._http.get(this.url + 'anuncios/get/carrusel');
    }

    getCatEst(data): Observable <any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let params = 'json=' + JSON.stringify(data);
        return this._http.post(this.url + 'anuncios/subcat/estado', params, { headers:headers }); 
    }

    getAllAnuncios(token): Observable <any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url + 'anuncios', { headers:headers });
    }

}