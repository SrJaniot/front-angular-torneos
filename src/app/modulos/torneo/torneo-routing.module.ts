import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerTorenosComponent } from './ver-torenos/ver-torenos.component';
import { DescripcionTorneoComponent } from './descripcion-torneo/descripcion-torneo.component';

const routes: Routes = [
  {
    path:'ver-torneos',
    component: VerTorenosComponent

  },
  {
    path:'descripcion-torneo/:id_torneo',
    component: DescripcionTorneoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TorneoRoutingModule { }
