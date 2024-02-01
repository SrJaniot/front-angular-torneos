import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';

const routes: Routes = [
  {
    path:'perfil',
    component :VerPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
