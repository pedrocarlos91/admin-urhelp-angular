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
    { path:'admin', component: AdministradoresComponent, canActivate: [IdentityGuard] },
    { path:'estados', component: EstadosComponent, canActivate: [IdentityGuard] },
    { path:'municipios', component: MuniciposComponent, canActivate: [IdentityGuard] },
    { path:'categorias', component: CategoriasComponent, canActivate: [IdentityGuard] },
    { path:'categoria/subcat/:id', component: SubcategoriasComponent, canActivate: [IdentityGuard] }
  ];

  //Exportar la confuguración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);