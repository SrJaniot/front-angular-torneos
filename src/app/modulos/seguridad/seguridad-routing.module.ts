import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { IdenificarCodigoTowfaComponent } from './idenificar-codigo-towfa/idenificar-codigo-towfa.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';

const routes: Routes = [
  {
    path:'login',
    component : LoginComponent
  },
  {
    path:'crear-cuenta',
    component : CrearCuentaComponent
  },
  {
    path:'codigo-2fa',
    component: IdenificarCodigoTowfaComponent
  },
  {
    path:'cerrar-sesion',
    component: CerrarSesionComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
