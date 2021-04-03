import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { UserService } from 'src/app/services/user.services';
import { CategoriaService } from '../../services/categoria.services';
import { SubcategoriaService} from '../../services/subcategoria.services';
import { globalUrl } from '../../services/global';
import { Anuncio } from 'src/app/models/anuncio';
import { EstadosService } from 'src/app/services/estado.services';
import { MunicipioService } from 'src/app/services/municipio.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-anuncio',
  templateUrl: './nuevo-anuncio.component.html',
  styleUrls: ['./nuevo-anuncio.component.css'],
  providers: [
    AnuncioService,
    UserService,
    CategoriaService,
    SubcategoriaService,
    EstadosService,
    MunicipioService
  ]
})
export class NuevoAnuncioComponent implements OnInit {
  public anuncio: Anuncio;
  public categorias: string[];
  public subcategorias: string[];
  public usuarios:object;
  public cat: number;
  public estados: string[];
  public municipios: string[];
  public est = 0;
  public ubicacion: boolean;
  public message: string;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, jpeg",
    maxSize: "3",
    uploadAPI:  {
      url: globalUrl.url + 'anuncios/image',
      method:"POST",
      headers: {
        "Authorization" : this._userService.gettoken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: 'Selecciona la imágen del anuncio',
    replaceTexts:{
      afterUploadMsg_success: 'Subida correctamente',
      afterUploadMsg_error: 'Error al subir imágen',
    }
  };

  constructor(
    private _userService: UserService,
    private _anuncioService: AnuncioService,
    private _categoriaService: CategoriaService,
    private _subcategoriaService: SubcategoriaService,
    private _estadoService: EstadosService,
    private _municipioService: MunicipioService,
    private _router:Router
  ) 
  {
    this.cat = 0;
    this.ubicacion = false;
    this.anuncio = new Anuncio(
      1, 
      0, 
      '', 
      '', 
      '', 
      0, 
      0, 
      null, 
      null, 
      '', 
      '', 
      '', 
      'Efectivo', 
      'Establecimiento', 
      0,
      null, 
      '', 
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getUsers();
    this.getEstados();
  }

  getCategorias(){
    this._categoriaService.getCategorias().subscribe(
      response => {
        if(response.status == 'success'){
          this.categorias = response.categorias;
        }else{
          console.log(response);
        }
        
      },
      error => {
        console.log(error);
      }
    )
  }

  onChangeCategoria(){
    this._subcategoriaService.getSubCat(this.cat).subscribe(
      response => {
        if(response.status == 'success'){
          this.subcategorias = response.subcategorias;
        }else{
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  getUsers(){
    this._userService.getAnunciantes(this._userService.gettoken()).subscribe(
      response =>{
        this.usuarios = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEstados(){
    this._estadoService.getEstados().subscribe(
      response => {
        if(response.status == 'success'){
          this.estados = response.estados;
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onChangeEstado(){
    this._municipioService.getMunicipio(this.est).subscribe(
      response => {
        if(response.status == 'success'){
          this.municipios = response.municipios;
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.anuncio.imagen = data.image;
  }

  guardarAnuncio(){
    this._anuncioService.register(this.anuncio, this._userService.gettoken()).subscribe(
      response => {
        if(response.status == 'success'){
          this._router.navigate(['anuncios']);
        }else{

        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
