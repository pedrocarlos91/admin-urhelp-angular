import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


@Injectable({
  providedIn: 'root'
})

export class MapService {
  mapbox = (Mapboxgl as typeof Mapboxgl);
  public mapa: Mapboxgl.Map;
  public latDeseada: number;
  public lngDeseada: number;
  public marker: any; 
  style = 'mapbox://styles/mapbox/outdoors-v11';
  // Coordenadas de la localización inicial donde se centrará el mapa
  public lat: number; 
  public lng: number;
  zoom = 6;
  public lugar = 'Tlalnepantla, Mexico';
  public movible: any;

  constructor() {
      // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapboxKey;
    this.movible = {draggable: true};
    this.marker = new Mapboxgl.Marker(this.movible);
  }

      //Mapa sin ubicacion definida
  buildMap() {
    //Se genera el mapa
    if(!this.lat && !this.lng){
      this.lat = 19.3910038;
      this.lng = -99.2836969;
    }

    this.mapa = new Mapboxgl.Map({
      container: 'mapaUbicacion',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    // Agregando Geocoder con marcador
      var geocoder = new MapboxGeocoder({
        accessToken: this.mapbox.accessToken,
        mapboxgl: this.mapbox,
        marker: false,
        placeholder: 'Escriba para buscar'
      });
      
      this.mapa.addControl(geocoder);

      

        //Agregando botones de navegación
    this.mapa.addControl(new Mapboxgl.NavigationControl());
        //Agregando botón de mi ubicación
    this.mapa.addControl(
      new Mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
        }
      )
    );

    if(this.lat && this.lng){
      this.crearMarcador(this.lng, this.lat); 
    
    }else{
      if ("geolocation" in navigator) { 
        navigator.geolocation.getCurrentPosition(position => { 
            this.crearMarcador(position.coords.longitude, position.coords.latitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        }); 
      }
    }

    
    
    geocoder.on('result', (e:any) => {
      this.crearMarcador(e.result.geometry.coordinates[0], e.result.geometry.coordinates[1]);
      this.lat = e.result.geometry.coordinates[1];
      this.lng = e.result.geometry.coordinates[0];
    });


  }  
  
  

  crearMarcador(lng:number, lat:number) {
    this.marker 
    .setLngLat([lng, lat])
    .addTo(this.mapa);

    this.marker.on('dragend', () =>{
        this.latDeseada = this.marker.getLngLat().lat;
        this.lngDeseada = this.marker.getLngLat().lng;
    });
  }

  obtenerLugar(){
    if(this.latDeseada && this.lngDeseada){
      var lngLat = {
        lat: this.latDeseada,
        lng: this.lngDeseada
      };
    }else{
      var lngLat = {
        lat: this.lat,
        lng: this.lng
      };
    }
    return lngLat;
  }
  
  
  setUbicacion(lat:number, lng:number, drag: boolean){
    this.lat = lat;
    this.lng = lng;
    if(drag){
      this.marker.setDraggable(true);
    }else{
      this.marker.setDraggable(false);
    }
    
  }
  
  


}
