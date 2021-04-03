import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { UserService } from 'src/app/services/user.services';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MomentService } from 'src/app/services/moment.services';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
  providers: [
    AnuncioService,
    UserService,
    MomentService
  ]
})
export class AnunciosComponent implements OnInit, OnDestroy{
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger = new Subject();

  public anuncios: object;
  public status: string;
  public message: string;

  constructor(
    private _anuncioService: AnuncioService,
    private _userService: UserService,
    private _moment: MomentService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      destroy:true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
      }
    };

    this.getAnuncios()
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

  getAnuncios(){
    this._anuncioService.getAllAnuncios(this._userService.gettoken()).subscribe(
      response => {
        this.anuncios = response.anuncios;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getDateFormat(fecha){
    return this._moment.getDate(fecha);
  }
  getRelativeTime(f: any){
    return this._moment.getTimeFromNow(f)
  }

  changeCarrusel(id, carrusel){
    let data = {
      carrusel: !carrusel
    };

    this._anuncioService.update(id, data, this._userService.gettoken()).subscribe(
      response => {
        if(response.status == "success"){
          this.status = 'success';
          this.message = response.message;
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }

}
