import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorneoRoutingModule } from './torneo-routing.module';
import { VerTorenosComponent } from './ver-torenos/ver-torenos.component';
import { DescripcionTorneoComponent } from './descripcion-torneo/descripcion-torneo.component';


@NgModule({
  declarations: [
    VerTorenosComponent,
    DescripcionTorneoComponent
  ],
  imports: [
    CommonModule,
    TorneoRoutingModule
  ]
})
export class TorneoModule { }
