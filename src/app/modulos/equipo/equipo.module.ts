import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';


@NgModule({
  declarations: [
    CrearEquipoComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule
  ]
})
export class EquipoModule { }
