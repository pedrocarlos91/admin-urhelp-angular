import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalUrl } from '../../services/global';
import { AnuncioService } from '../../services/anuncio.service';
import { MapService } from '../../services/map.services';
import { UserService } from '../../services/user.services';
import { MunicipioService } from '../../services/municipio.services';
import { EstadosService } from '../../services/estado.services';
import { GaleriaService } from '../../services/galerias.service';

import { Anuncio } from '../../models/anuncio';

@Component({
  selector: 'app-anuncio-edit',
  templateUrl: './anuncio-edit.component.html',
  styleUrls: ['./anuncio-edit.component.css'],
  providers: [
    AnuncioService,
    GaleriaService,
    UserService,
    MunicipioService,
    EstadosService,
    MapService
  ]
})
export class AnuncioEditComponent implements OnInit {
  public anuncio: Anuncio;
  public url: string;
  public imagenesGaleria: any;
  public imagenesGaleriaStatus: boolean;
  public ubicacion: boolean;
  public est: number;
  public estados: any;
  public municipios: any;
  public status_estado: string;
  public status_municipio: string;
  public anuncioId: number;
  public files: File[] = [];
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, jpeg",
    maxSize: "2",
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
    attachPinText: 'Cambiar imágen principal del anuncio',
  };

  constructor(
    private _route: ActivatedRoute,
    private _anuncioService: AnuncioService,
    private _galeriaService: GaleriaService,
    private _mapService: MapService,
    private _userService:UserService,
    private _municipioService: MunicipioService,
    private _estadoService: EstadosService,
    private _router: Router
  ) 
  { 
    this.url = globalUrl.url;
    this.imagenesGaleriaStatus = true;
    this.ubicacion = false;    
  }

  ngOnInit(): void {
    this.getAnuncio();
    this.getEstados();
  }

  getAnuncio(){
    this._route.params.subscribe(params => {
      this.anuncioId = +params['id'];
      this._anuncioService.getDetail(this.anuncioId).subscribe(
        response =>{
          let data = response.anuncio;
          this.anuncio = new Anuncio(
            data.id, 
            data.user.id, 
            data.titulo, 
            data.nombre_contacto, 
            data.descripcion, 
            data.subcategoria.id,
            data.municipio.id,
            data.lng,
            data.lat,
            data.telefono,
            data.whatsapp,
            data.email,
            data.tipo_cobro,
            data.tipo_servicio,
            data.status,
            data.fecha_expiracion,
            data.imagen,
            data.lunes,
            data.martes,
            data.miercoles,
            data.jueves,
            data.viernes,
            data.sabado,
            data.domingo,
            data.lunes_inicio,
            data.lunes_fin,
            data.martes_inicio,
            data.martes_fin,
            data.miercoles_inicio,
            data.miercoles_fin,
            data.jueves_inicio,
            data.jueves_fin,
            data.viernes_inicio,
            data.viernes_fin,
            data.sabado_inicio,
            data.sabado_fin,
            data.domingo_inicio,
            data.domingo_fin,
          );
          if(this.anuncio.lat && this.anuncio.lng){
            this.ubicacion = true; 
          }

          this.est = data.municipio.estado.id;
          this.getMunicipiosEstado(this.est);
          this._mapService.setUbicacion(this.anuncio.lat, this.anuncio.lng, true);
        },
        error => {
          console.log(error);
        }
      );

      this.getImagesAnuncio(this.anuncioId);
    });
  }

  getImagesAnuncio(id){
    this._galeriaService.getImagesForAnuncio(id).subscribe(
      response =>{
        if(response.status = 'success'){
          this.imagenesGaleriaStatus = true;
          this.imagenesGaleria = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getEstados(){
    this._estadoService.getEstados().subscribe(
      response => {
        if(response.status == 'success'){
          this.status_estado = 'success';
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
    this.getMunicipiosEstado(this.est);
  }

  getMunicipiosEstado(estado){
    this._municipioService.getMunicipio(estado).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_municipio = 'success';
          this.municipios = response.municipios;
        }else{
          this.status_municipio = 'error';
          console.log(response);
        }
      },
      error => {
        this.status_municipio = 'error';
        console.log(<any>error);
      }
    )
  }

  public modifForm(form){
    //Al enviar formulario
    if(this.ubicacion){
      var newCoord = this._mapService.obtenerLugar();
      this.anuncio.lat = newCoord.lat;
      this.anuncio.lng = newCoord.lng;
    }

    console.log(this.anuncio);
    this._anuncioService.update(this.anuncio.id, this.anuncio, this._userService.gettoken()).subscribe(
      response => {
        if(response.status == 'success'){
          this._router.navigate(['anuncio/' + this.anuncioId]);
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.anuncio.imagen = data.image;
  }

  clickDia(dia: string){
    switch(dia){
      case 'lunes': 
        if(this.anuncio.lunes){
          this.anuncio.lunes_inicio = null;
          this.anuncio.lunes_fin = null;
        }
        break;

      case 'martes':
        if(this.anuncio.martes){
          this.anuncio.martes_inicio = null;
          this.anuncio.martes_fin = null;
        }
        break;

      case 'miercoles':
        if(this.anuncio.miercoles){
          this.anuncio.miercoles_inicio = null;
          this.anuncio.miercoles_fin = null;
        }
        break;

      case 'jueves':
        if(this.anuncio.jueves){
          this.anuncio.jueves_inicio = null;
          this.anuncio.jueves_fin = null;
        }
        break;

      case 'viernes':
        if(this.anuncio.viernes){
          this.anuncio.viernes_inicio = null;
          this.anuncio.viernes_fin = null;
        }
        break;

      case 'sabado':
        if(this.anuncio.sabado){
          this.anuncio.sabado_inicio = null;
          this.anuncio.sabado_fin = null;
        }
        break;

      case 'domingo': 
        if(this.anuncio.domingo){
          this.anuncio.domingo_inicio = null;
          this.anuncio.domingo_fin = null;
        }
        break;

    }
  }

  onSelect(e){
    var imageNames: any = new Array();
   
    this.files.push(...e.addedFiles);

    this.files.forEach((value, index)=>{
      this.readFile(this.files[index]).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        this._galeriaService.uploadImages(fileContents, this._userService.gettoken()).subscribe(
          response => {
            if(response.status == 'success'){
              this._galeriaService.storeImage(response.image, this.anuncioId, this._userService.gettoken()).subscribe(
                response => {
                  if(response.status == 'success'){
                    this.getImagesAnuncioEdit();
                  }else{  
                    console.log(response);
                  }
                },
                error => {
                  console.log(error);
                }
              )
            }else{

            }
           // imageNames.push(response.image);
            this.onRemove(index);
          },
          error => {
            console.log(error);
          }
        );
        
      });
      
    });

  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

  getImagesAnuncioEdit(){
    this._galeriaService.getImagesForAnuncio(this.anuncioId).subscribe(
      response =>{
        if(response.status = 'success'){
          this.imagenesGaleriaStatus = true;
          this.imagenesGaleria = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  eliminarImagen(id){
    this._galeriaService.eliminarImagen(id, this._userService.gettoken()).subscribe(
      response => {
        if(response.status == 'success'){
          this.getImagesAnuncioEdit();
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  habilitarUbicacion(){
    this.ubicacion = !this.ubicacion;
    if(this.ubicacion == false){
      this.anuncio.lat = null;
      this.anuncio.lng = null;
    }
  }

  onRemove(e){
    this.files.splice(this.files.indexOf(e), 1);
  }
}
