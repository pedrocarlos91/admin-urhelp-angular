import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { SpinnerService } from './services/spinner.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UserService } from './services/user.services';
import { IdentityGuard } from './services/identitity.guard';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { EstadosComponent } from './components/estados/estados.component';
import { MuniciposComponent } from './components/municipos/municipos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
import { LoginGuard } from './services/login.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AnuncioDetailsComponent } from './components/anuncio-details/anuncio-details.component';
import { NuevoAnuncioComponent } from './components/nuevo-anuncio/nuevo-anuncio.component';
import {IvyGalleryModule} from 'angular-gallery';
import { MapComponent } from './components/map/map.component';
import { AnuncioEditComponent } from './components/anuncio-edit/anuncio-edit.component';
import { CuponesComponent } from './components/cupones/cupones.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    AnunciosComponent,
    AdministradoresComponent,
    EstadosComponent,
    MuniciposComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    UserEditComponent,
    AnuncioDetailsComponent,
    NuevoAnuncioComponent,
    MapComponent,
    AnuncioEditComponent,
    CuponesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    NgxSpinnerModule,
    HttpClientModule,
    DataTablesModule,
    FroalaEditorModule,
    FroalaViewModule,
    NgbModule,
    AngularFileUploaderModule,
    IvyGalleryModule,
    BrowserAnimationsModule,
    NgxDropzoneModule
  ],
  providers: [
    appRoutingProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerService,
      multi: true,
    },
    IdentityGuard,
    LoginGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
