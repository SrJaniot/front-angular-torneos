import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilEquipoComponent } from './perfil-equipo/perfil-equipo.component';




@NgModule({
  declarations: [
    VerPerfilComponent,
    PerfilEquipoComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PerfilModule { }
