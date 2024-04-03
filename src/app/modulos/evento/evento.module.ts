import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoRoutingModule } from './evento-routing.module';
import { VerEventosComponent } from './ver-eventos/ver-eventos.component';
import { DescripcionEventosComponent } from './descripcion-eventos/descripcion-eventos.component';


@NgModule({
  declarations: [
    VerEventosComponent,
    DescripcionEventosComponent
  ],
  imports: [
    CommonModule,
    EventoRoutingModule
  ]
})
export class EventoModule { }
