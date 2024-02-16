import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { HomeComponent } from './home/home.component';

//importar carrusel
// npm install ngx-owl-carousel-o y  npm install owl.carousel







@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,

  ]
})
export class NoticiasModule { }
