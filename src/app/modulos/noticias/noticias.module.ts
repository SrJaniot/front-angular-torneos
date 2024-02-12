import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule
  ]
})
export class NoticiasModule { }
