import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.services';
import { globalUrl } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  
  public sesion: boolean;
  public identity: object;
  public url: string;

  constructor(private _userService:UserService){
    this.sesion = false;
    this.checkSession();
    this.url = globalUrl.url;
  }

  ngOnInit(): void {
    this.checkSession();
  }

  ngDoCheck(){
    this.checkSession();
  }

  checkSession(){
    this.identity = this._userService.getIdentity();
    
    if (this.identity){
      this.sesion = true;
    }else{
      this.sesion = false;
    }
  }

}
