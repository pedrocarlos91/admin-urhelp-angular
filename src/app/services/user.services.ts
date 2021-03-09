import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;
  constructor(
    public _http: HttpClient
  ){
    this.url = globalUrl.url;
  }

  register(user): Observable<any>{
    let json = JSON.stringify(user);    //convertir en JSON el objeto de tipo usuario
    let params = 'json=' + json;        //Asignarle el nombre 'json' a la cadena JSON creada
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  //Agregando cabecera estándar de envío de formulario por post
    return this._http.post(this.url + 'users/nuevo', params, { headers:headers });
  } 

  signup(user, getToken = null): Observable<any>{
    if(getToken != null){
      user.getToken = 'true';
    }
    let json = JSON.stringify(user);    //convertir en JSON el objeto de tipo usuario
    let params = 'json=' + json;        //Asignarle el nombre 'json' a la cadena JSON creada
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  //Agregando cabecera estándar de envío de formulario por post
    return this._http.post(this.url + 'loginAdmin', params, { headers:headers });
  }

  getIdentity(){
    let identity = JSON.parse(sessionStorage.getItem('dataUser'));
    if(identity && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getUser(id:number): Observable<any>{
    return this._http.get(this.url + 'users/' + id);
  }
 
  update(user, token): Observable<any>{
    let json = JSON.stringify(user);    //convertir en JSON el objeto de tipo usuario
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
                                   
    return this._http.put(this.url + 'update', params, { headers: headers });
  }

  changePassAdmin(user, token): Observable<any>{

    let json = JSON.stringify(user);    //convertir en JSON el objeto de tipo usuario
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
                                   
    return this._http.put(this.url + 'user/changePassAdmin', params, { headers: headers });
  }

  gettoken(){
    let token = sessionStorage.getItem('token');
    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getUsers(): Observable<any>{
    return this._http.get(this.url + 'users');
  }
}
