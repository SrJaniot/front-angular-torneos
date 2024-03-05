import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { PerfilEquipoComponent } from './perfil-equipo/perfil-equipo.component';

const routes: Routes = [
  {
    path:'perfil/:id',
    component :VerPerfilComponent
  },
  {
    path:'perfil-equipo/:idEquipo',
    component :PerfilEquipoComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
