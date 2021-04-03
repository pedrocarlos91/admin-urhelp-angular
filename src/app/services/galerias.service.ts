import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';

@Injectable()
export class GaleriaService{
    public url: string;


    constructor(
        public _http: HttpClient
    ){
        this.url = globalUrl.url;
    }

    storeImage(name: string, anuncio: number, token: string): Observable<any>{
        let json = {
            name: name,
            anuncio_id: anuncio
        }
        let params = 'json=' + JSON.stringify(json);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'galerias', params, {headers: headers});                                       
    }
    
    uploadImages(image: any, token: string): Observable<any>{
        let params = 'file=' + image;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'galerias/upload', params, { headers: headers });
    }

    getImagesForAnuncio(id: number): Observable<any>{
        return this._http.get(this.url + 'galerias/' + id);
    }

    eliminarImagen(id: number, token: string): Observable <any>{
        let params = {id: id};
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'galerias/' + id, { headers: headers });
    }
}