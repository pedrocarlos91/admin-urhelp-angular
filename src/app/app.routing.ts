  //Imports necesarios para la creacion de las rutas
  import { ModuleWithProviders } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';

  //Importación de componentes para rutas
  import { LoginComponent } from './components/login/login.component';
  import { DashboardComponent } from './components/dashboard/dashboard.component';
  import { UsuariosComponent } from './components/usuarios/usuarios.component';
  import { AnunciosComponent } from './components/anuncios/anuncios.component';
  import { AdministradoresComponent } from './components/administradores/administradores.component';
  import { EstadosComponent } from './components/estados/estados.component';
  import { MuniciposComponent } from './components/municipos/municipos.component';
  import { CategoriasComponent } from './components/categorias/categorias.component';
  import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
  import { UserEditComponent } from './components/user-edit/user-edit.component';
  import { AnuncioDetailsComponent } from './components/anuncio-details/anuncio-details.component';
  import { NuevoAnuncioComponent } from './components/nuevo-anuncio/nuevo-anuncio.component';
  import { AnuncioEditComponent } from './components/anuncio-edit/anuncio-edit.component';
  import { CuponesComponent } from './components/cupones/cupones.component';
  import { IdentityGuard } from './services/identitity.guard';
  import { LoginGuard } from './services/login.guard';
  
  //Crear una constante con un array de objetos json con las rutas y los componentes a los que apuntan

  const appRoutes: Routes = [
    { path:'', component: DashboardComponent, canActivate: [IdentityGuard] },
    { path:'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'logout/:sure', component: LoginComponent},
    { path:'usuarios', component: UsuariosComponent, canActivate: [IdentityGuard] },
    { path: 'usuario/edit/:id', component: UserEditComponent, canActivate: [IdentityGuard] },
    { path:'anuncios', component: AnunciosComponent, canActivate: [IdentityGuard] },
    { path:'anuncio/:id', component: AnuncioDetailsComponent, canActivate: [IdentityGuard] },
    { path:'anuncio/edit/:id', component: AnuncioEditComponent, canActivate: [IdentityGuard] },
    { path:'nuevo-anuncio', component: NuevoAnuncioComponent, canActivate: [IdentityGuard] },
    { path:'admin', component: AdministradoresComponent, canActivate: [IdentityGuard] },
    { path:'estados', component: EstadosComponent, canActivate: [IdentityGuard] },
    { path:'estado/municipio/:id', component: MuniciposComponent, canActivate: [IdentityGuard]},
    { path:'municipios', component: MuniciposComponent, canActivate: [IdentityGuard] },
    { path:'categorias', component: CategoriasComponent, canActivate: [IdentityGuard] },
    { path:'categoria/subcat/:id', component: SubcategoriasComponent, canActivate: [IdentityGuard] },
    { path:'cupones', component:CuponesComponent, canActivate: [IdentityGuard] }
  ];

  //Exportar la confuguración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);