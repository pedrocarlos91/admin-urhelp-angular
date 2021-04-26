import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {CuponService} from '../../services/cupones.services';
import { Cupon } from '../../models/cupon';
import { UserService } from '../../services/user.services';
import { MomentService } from '../../services/moment.services';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css'],
  providers: [
    CuponService, 
    UserService,
    MomentService
  ]
})
export class CuponesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger = new Subject();

  public status='';
  public message = '';
  public errores:any;
  public cupon_nuevo: Cupon;
  public cupones: any;
  public cuponEdit: Cupon;
  closeResult: any;

  constructor(
    private modalService: NgbModal,
    private _cuponService: CuponService,
    private _userService: UserService,
    private _moment: MomentService
  ) { 
    this.cupon_nuevo = new Cupon('', 0, 1, 0);
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

    this.getCupones();
  }

  getCupones(){
    this._cuponService.getCupones(this._userService.gettoken()).subscribe(
      response => {
        this.cupones = response.cupones;
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
    );
  }

  openModal(modal){
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //bEnviar formulario
      this._cuponService.storeCupon(this.cupon_nuevo,this._userService.gettoken()).subscribe(
        response =>{
          this.status = response.status;
          this.message = response.message;
          this.getCupones();
        }, 
        error => {
          console.log(error);
        }
      );
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //botones de cierre Cancel y cross
      console.log(this.closeResult);
    });
  }

  openEditModal(modal, id){
    this._cuponService.getCupon(id, this._userService.gettoken()).subscribe(
      response =>{
        if(response.status == 'success'){
          this.cuponEdit = response.cupon;
          this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            //bEnviar formulario
            this._cuponService.updateCupon(this.cuponEdit, this._userService.gettoken()).subscribe(
              response => {
                this.status = response.status;
                this.message = response.message;
                this.getCupones();
              },
              error =>{
                console.log(error);
              }
            );
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //botones de cierre Cancel y cross
            console.log(this.closeResult);
          });

        }else{
          console.log(response);
        }
      }, 
      error => {
        console.log(error);
      }
    );

  }

  open(suprimModal, id:number){
    this.modalService.open(suprimModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //Cerrando OK.
      this._cuponService.deleteCupon(id, this._userService.gettoken()).subscribe(
        response => {
          this.status = response.status;
          this.message = response.message;
          this.getCupones();
        },
        error => {
          console.log(error);
        }
      );
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //botones de cierre Cancel y cross
      
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

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getFormatDate(date){
    return this._moment.getFormatDate(date);
  }

}
