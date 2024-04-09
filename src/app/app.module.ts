import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { PiePaginaComponent } from './publico/pagina-maestra/pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponentComponent } from './publico/spinner-component/spinner-component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogDataExampleDialogComponent } from './publico/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
//import { HttpClientModule } from '@angular/common/http'; importar este modulo que me permite hacer peticiones http


//import { NgToastModule } from 'ng-angular-popup'; este es el modulo de popup  npm install ng-angular-popup  https://letsprogram.in/blog/647990c15960050b58aca375




@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    InicioComponent,
    RutaNoEncontradaComponent,
    SpinnerComponentComponent,
    DialogDataExampleDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgToastModule

  ],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
