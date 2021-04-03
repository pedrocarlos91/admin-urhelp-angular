import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Gallery } from 'angular-gallery';
import { globalUrl } from '../../services/global';
import { GaleriaService } from '../../services/galerias.service';
import { MomentService } from '../../services/moment.services';
import { MapService } from '../../services/map.services';
import { UserService } from 'src/app/services/user.services';
import { MunicipioService } from 'src/app/services/municipio.services';
import { EstadosService } from 'src/app/services/estado.services';

@Component({
  selector: 'app-anuncio-details',
  templateUrl: './anuncio-details.component.html',
  styleUrls: ['./anuncio-details.component.css'],
  providers: [
    AnuncioService,
    GaleriaService,
    UserService,
    MunicipioService,
    EstadosService,
    MapService
  ]
})
export class AnuncioDetailsComponent implements OnInit {
  public anuncio: any;
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
  

  constructor(
    private _route: ActivatedRoute,
    private _anuncioService: AnuncioService,
    private _galeriaService: GaleriaService,
    private _momentService: MomentService,
    private _mapService: MapService,
    private _userService:UserService,
    private _municipioService: MunicipioService,
    private _estadoService: EstadosService,
    private gallery: Gallery
  ) 
  {
    this.url = globalUrl.url;
    this.imagenesGaleriaStatus = true;
    this.ubicacion = false;
  }

  ngOnInit(): void {
    this.getAnuncio();
  }

  getAnuncio(){
    this._route.params.subscribe(params => {
      this.anuncioId = +params['id'];
      this._anuncioService.getDetail(this.anuncioId).subscribe(
        response =>{
          this.anuncio = response.anuncio;
          if(this.anuncio.lat && this.anuncio.lng){
            this._mapService.setUbicacion(this.anuncio.lat, this.anuncio.lng, false); 
            this.ubicacion = true; 
          }
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

  showGallery(index: number) {
    let prop = {
      images: [{path: this.url + 'anuncios/image/' + this.anuncio.imagen}],
      index
    };
    for(let imagen of this.imagenesGaleria){
      prop.images.push({path: this.url + 'galerias/image/' + imagen.name});
    }
    this.gallery.load(prop);
  }

  getHourFormat(hour){
    return this._momentService.getHour(hour);
  }  
  

  habilitarUbicacion(){
    this.ubicacion = !this.ubicacion;
    if(this.ubicacion == false){
      this.anuncio.lat = null;
      this.anuncio.lng = null;
    }
  }

  
}
