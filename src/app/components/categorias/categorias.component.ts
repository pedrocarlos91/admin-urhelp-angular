import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CategoriaService } from '../../services/categoria.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MomentService } from '../../services/moment.services';
import { UserService } from '../../services/user.services';
import {Categoria} from '../../models/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [
    CategoriaService,
    MomentService,
    UserService
  ]
})
export class CategoriasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  closeResult: any;
  dtTrigger = new Subject();
  public categorias: object;
  public status: any;
  public message: any;
  public errores: any;
  public cate: Categoria;

  constructor(
    public _categoriaService: CategoriaService,
    public _moment: MomentService,
    private modalService: NgbModal,
    private _userService: UserService
  ) {
      this.cate = new Categoria(1,'');
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

    this.getCategorias();
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getCategorias(){
    this._categoriaService.getCategorias().subscribe(
      response => {
        this.categorias = response.categorias;

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
        console.log(error);
      }
    )
  }

  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f);
  }

  openModal(cateModal){
    this.modalService.open(cateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      this._categoriaService.newCategoria(this.cate,this._userService.gettoken()).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getCategorias();
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
