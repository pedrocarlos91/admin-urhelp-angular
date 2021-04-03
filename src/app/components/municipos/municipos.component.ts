import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstadosService } from '../../services/estado.services';
import { MunicipioService } from '../../services/municipio.services';
import { MomentService } from '../../services/moment.services';
import { UserService } from '../../services/user.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Estado } from '../../models/estado';
import { Municipio } from '../../models/municipio';


@Component({
  selector: 'app-municipos',
  templateUrl: './municipos.component.html',
  styleUrls: ['./municipos.component.css'],
  providers: [
    EstadosService,
    MunicipioService,
    MomentService,
    UserService
  ]
})
export class MuniciposComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;

  public municipio: object;
  public n_municipio: Municipio;
  public estado: Estado;
  public status: string;
  public message: string;
  public errores: any;
  dtTrigger = new Subject();
  closeResult: any;


  constructor(
    private _estadoService: EstadosService,
    private _municipioService: MunicipioService,
    private _moment: MomentService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      destroy:true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
      }
    };

    this.getEstado();
    this.getMunicipio();
  }
  
  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getEstado(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._estadoService.getEstado(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.estado = new Estado(response.estado.id, response.estado.nombre_estado);
            this.n_municipio = new Municipio(1,'',id);
          }
        },
        error => {
          console.log(error)
        }
      );
    });
  }

  getMunicipio(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._municipioService.getMunicipio(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.municipio = response.municipios;
            if (this.isDtInitialized) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            } else {
              this.isDtInitialized = true
              this.dtTrigger.next();
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    }); 
  }

  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f)
  }

  openModal(municipioModal){
    this.modalService.open(municipioModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      console.log(this.n_municipio);
      this._municipioService.newMunicipio(this.n_municipio, this._userService.gettoken()).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getMunicipio();
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

  open(suprimModal, id:number){
    this.modalService.open(suprimModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //Cerrando OK.

      this._municipioService.delete(id,this._userService.gettoken()).subscribe(
        response =>{
          if(response.status == 'success'){
            this.status = 'success';
            this.message = response.message;
            this.getMunicipio();
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


}
