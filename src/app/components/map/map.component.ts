import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public lat: number;
  public lng: number;
  constructor(private _map: MapService) { }

  ngOnInit(): void {
    this._map.buildMap();
  }

}
