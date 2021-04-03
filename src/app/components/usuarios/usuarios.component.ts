import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.services';
import { MomentService } from '../../services/moment.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [
    UserService,
    MomentService,
  ]
})

export class UsuariosComponent implements OnInit, OnDestroy{
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger = new Subject();
  
  public users: any;
  public tiempo:any;
  public user:User;
  public status='';
  public message = '';
  public errores:any;
  closeResult: any;
  
  constructor(
    private _userService: UserService,
    private _moment: MomentService,
    private modalService: NgbModal
  ) 
  { 
    this.user = new User(1, '', '', '', '', '', 'ROLE_anunciante', ''); //Dar valores al objeto
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy:true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
      }
    };

    this.getUsuarios();
    
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getUsuarios(){
    this._userService.getUsers().subscribe(
      response => {
        this.users = response.data;

        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      },
      error => {
        
      }
    )
  }

  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f)
  }

  openModal(userModal){
    this.modalService.open(userModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      this._userService.register(this.user).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getUsuarios();
        },
        error =>{
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
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //botones de cierre Cancel y cross
      console.log(this.closeResult);
    });

  }

  open(suprimModal, id:number){
    this.modalService.open(suprimModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //Cerrando OK.
      let userDelet = {
        id: id,
        disponibilidad: 0
      }

      this._userService.update(userDelet,this._userService.gettoken()).subscribe(
        response =>{
          if(response.status == 'success'){
            this.status = 'success';
            this.message = 'El usuario ha sido eliminado satisfactoriamente';
            this.getUsuarios();
          }else{
            this.status = 'error';
            this.message = response.message;
          }
        },
        error =>{
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
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //botones de cierre Cancel y cross
      console.log(this.closeResult);
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
