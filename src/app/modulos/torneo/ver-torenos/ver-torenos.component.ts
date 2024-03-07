import { Component } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-ver-torenos',
  templateUrl: './ver-torenos.component.html',
  styleUrl: './ver-torenos.component.css'
})
export class VerTorenosComponent {


  ngAfterViewInit() {
    // carousel de torneos disponibles encurso y finalizados
    $('.owl-one').owlCarousel({
          loop:true,
          margin:30,
          responsiveClass:true,
          nav: false,
          navText: ["<",">"],
          autoplay: true, // Añade esta línea
          autoplayTimeout: 9000, // Añade esta línea si quieres controlar el tiempo entre transiciones (3000ms = 3s)
          responsive:{
              0:{
                  items:1,
                  nav:false
              },
              768:{
                  items:2,
                  nav:false,
                  loop:true,
                  margin:10
              },
              1024:{
                  items:2,
                  nav:false,
                  loop:true,
                  margin:30
              },
              1200:{
                items:3,
                  nav:false,
                  loop:true
              }
          }
    });

    // fin de la funcion ngAfterViewInit
  }

  


}
