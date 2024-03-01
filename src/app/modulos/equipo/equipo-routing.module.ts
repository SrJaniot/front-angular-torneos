import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { ValidarInvitacionEquipoComponent } from './validar-invitacion-equipo/validar-invitacion-equipo.component';

const routes: Routes = [
  {
    path: 'crear-equipo',
    component: CrearEquipoComponent
  },
  {
    //aca tendra que mandar en el encabezado de la url el id del equipo y el hash
    path: 'validar-invitacion-equipo/:idEquipo/:hashEquipo',
    component: ValidarInvitacionEquipoComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
