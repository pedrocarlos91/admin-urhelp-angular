import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { globalUrl } from '../../services/global';
import {SubcategoriaService} from '../../services/subcategoria.services';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
  providers: [
    SubcategoriaService
  ]
})
export class SubcategoriasComponent implements OnInit {
  public subcategorias: object;

  constructor(
    private _subcategoriaService: SubcategoriaService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSubcat();
  }

  getSubcat(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._subcategoriaService.getSubCat(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.subcategorias = response.subcategorias;
            console.log(this.subcategorias);
          }
        },
        error =>{
          console.log(error);
        }
      );
    });
  }
}
