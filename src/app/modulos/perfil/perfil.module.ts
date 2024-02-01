import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';


@NgModule({
  declarations: [
    VerPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
