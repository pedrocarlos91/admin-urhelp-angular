import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Estado } from '../../models/estado';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { EstadosService } from '../../services/estado.services';
import { UserService } from '../../services/user.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MomentService } from '../../services/moment.services';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  providers: [
    EstadosService,
    MomentService,
    UserService
  ]
})
export class EstadosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  closeResult: any;
  dtTrigger = new Subject();

  public estados: object;
  public status: any;
  public message: any;
  public errores: any;
  public est: Estado;

  constructor(
    public _moment: MomentService,
    private modalService: NgbModal,
    private _estadoService: EstadosService,
    private _userService: UserService
  ) { 
    this.est = new Estado(1, '');
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
    this.getEstados();
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getEstados(){
    this._estadoService.getEstados().subscribe(
      response =>{
        this.estados = response.estados;
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
      error =>{
        console.log(error);
      }
    );
  }

  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f);
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

  openModal(estadoModal){
    this.modalService.open(estadoModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      this._estadoService.newEstado(this.est, this._userService.gettoken()).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getEstados();
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
