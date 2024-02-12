import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';
import { IdenificarCodigoTowfaComponent } from './idenificar-codigo-towfa/idenificar-codigo-towfa.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ValidarCorreoComponent } from './validar-correo/validar-correo.component';


@NgModule({
  declarations: [
    LoginComponent,
    IdenificarCodigoTowfaComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,

    CrearCuentaComponent,
      CerrarSesionComponent,
      ValidarCorreoComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SeguridadModule { }
