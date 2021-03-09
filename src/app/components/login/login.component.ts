import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public token: string;
  public message: string;
  public dataUser;

  constructor(
    private _userService:UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.user = new User(1, '', '', '', '', '', 'ROLE_admin', ''); //Dar valores al objeto
  }

  ngOnInit(): void {
    //Se ejecuta siempre y se cierra la sesion cuando recibe un parámetro por url
    this.logout();
  }


  onSubmit(form){
    this._userService.signup(this.user).subscribe(    //Con esta llamada al método se obtiene el token
      response =>{
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;
        
          this._userService.signup(this.user, true).subscribe( //Se vuelve a llamar con segundo parámetro y devuelve el array con datos de usuario
            response =>{
              this.dataUser = new User(
                response.sub,
                response.name,
                response.lastname,
                response.email,
                response.rfc,
                '',
                response.role,
                response.image
              );
              
              sessionStorage.setItem('token', this.token);       //Se guarda en entorno local la informacion de token
              sessionStorage.setItem('dataUser', JSON.stringify(this.dataUser)); //Se guarda en entorno local la informacion de usuario
              form.reset();
              this._router.navigate(['/']);
              window.location.reload();
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }

    );

  }


  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];
      if(logout == 1){
        sessionStorage.removeItem('dataUser');
        sessionStorage.removeItem('token');

        this.dataUser = null;
        this.token = null;

        this._router.navigate(['/login']);
      }
    });
  }

}
