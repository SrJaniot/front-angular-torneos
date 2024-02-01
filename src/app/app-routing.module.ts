import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';

const routes: Routes = [
  {
    path:'inicio',
    component :InicioComponent
  },
  {
    path:'',
    redirectTo:'/inicio',
    pathMatch:'full'
  },

  {
    path:'perfil',
    loadChildren: () => import('./modulos/perfil/perfil.module').then(m => m.PerfilModule)
  },
  {
    path:'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },


  // RUTA NO ENCONTRADA TIENE QUE SER EL ULTIMO
  {
    path:'**',
    component: RutaNoEncontradaComponent
  }







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
