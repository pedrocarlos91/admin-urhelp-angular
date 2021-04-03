import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../services/categoria.services';
import { Subcategoria } from '../../models/subcategoria';
import {SubcategoriaService} from '../../services/subcategoria.services';
import { MomentService } from '../../services/moment.services';
import { UserService } from '../../services/user.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Categoria } from '../../models/categoria';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
  providers: [
    SubcategoriaService,
    CategoriaService,
    MomentService,
    UserService
  ]
})
export class SubcategoriasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;

  public subcategorias: object;
  public categoria: Categoria;
  public n_subcat: Subcategoria;
  public status: string;
  public message: string;
  public subcategoria: SubcategoriaService;
  public errores: any;
  dtTrigger = new Subject();
  closeResult: any;

  constructor(
    private _subcategoriaService: SubcategoriaService,
    private _route: ActivatedRoute,
    public _categoriaService: CategoriaService,
    private _moment: MomentService,
    private _userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCate();
    this.getSubcat();
    this.dtOptions = {
      destroy:true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
      }
    };
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getCate(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._categoriaService.getCategoria(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.categoria = new Categoria(response.categoria.id,response.categoria.nombre_categoria);
            this. n_subcat = new Subcategoria(1, '', this.categoria.id);
          }
        },
        error =>{
          console.log(error);
        }
      );
    });
  }

  getSubcat(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._subcategoriaService.getSubCat(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.subcategorias = response.subcategorias;
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
        error =>{
          console.log(error);
        }
      );
    });
  }

  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f)
  }

  openModal(subcateModal){
    this.modalService.open(subcateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      this._subcategoriaService.newSubcategoria(this.n_subcat, this._userService.gettoken()).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getSubcat();
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

      this._subcategoriaService.delete(id,this._userService.gettoken()).subscribe(
        response =>{
          if(response.status == 'success'){
            this.status = 'success';
            this.message = response.message;
            this.getSubcat();
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
