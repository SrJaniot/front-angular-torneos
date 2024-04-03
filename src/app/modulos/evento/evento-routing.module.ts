import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerEventosComponent } from './ver-eventos/ver-eventos.component';
import { DescripcionEventosComponent } from './descripcion-eventos/descripcion-eventos.component';

const routes: Routes = [
  {
    path:'ver-eventos',
    component: VerEventosComponent
  },
  {
    path:'descripcion-evento/:id_evento',
    component: DescripcionEventosComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
