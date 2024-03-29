import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidarInvitacionEquipoComponent } from './validar-invitacion-equipo/validar-invitacion-equipo.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CrearEquipoComponent,
    ValidarInvitacionEquipoComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class EquipoModule { }
