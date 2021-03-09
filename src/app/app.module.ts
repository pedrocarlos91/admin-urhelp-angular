import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { SpinnerService } from './services/spinner.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UserService } from './services/user.services';
import { IdentityGuard } from './services/identitity.guard';
import { DataTablesModule } from 'angular-datatables';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    NgxSpinnerModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    AngularFileUploaderModule
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
