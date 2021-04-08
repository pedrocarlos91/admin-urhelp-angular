import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { Router, ActivatedRoute } from '@angular/router';
import { globalUrl } from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    UserService
  ]
})
export class UserEditComponent implements OnInit {
  public url: string;
  public user: User;
  public status ='';
  public message ='';
  public errores: any;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "3",
    uploadAPI:  {
      url: globalUrl.url + 'upload/avatar',
      method:"POST",
      headers: {
        "Authorization" : this._userService.gettoken()
      },
      params: {
        'page': '1'
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: 'Selecciona tu foto',
};

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = globalUrl.url;
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._userService.getUser(id).subscribe(
        response =>{
          if(response.status == 'success'){
            let data = response.data;
            this.user = new User(data.id,data.name,data.lastname,data.email,data.rfc,'',data.role,data.image);
          }
        },
        error =>{
          console.log(error);
        }
      );
    });
  }

  onSubmit(form){
    this._userService.update(this.user, this._userService.gettoken()).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.message = response.message;
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      }, 
      error => {
        this.status = 'error';
        this.message = error.error.message;
        let err = error.error.errors;
        var array = new Array();
        var er;
        var e;

        for(er in err){
          for(e in err[er]){
            array.push(err[er][e]);
          }
        }
        this.errores = array;

      }

    );
  }

  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }
}
