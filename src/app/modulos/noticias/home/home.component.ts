import {Component } from '@angular/core';
declare var $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {




  ngOnInit() {

  }




  ngAfterViewInit() {
    // carousel de noticias
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
    // carousel del parche
    $('.owl-two').owlCarousel({
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
                loop:true
            }
        }
    });
    //carousel bienvenido jugador
    $('.owl-four').owlCarousel({
      loop:true,
      responsiveClass:true,
      nav: false,
      dots: false,
      navContainer: '#owl-four-nav',
      navText: ["<",">"],
      autoplay: true, // Añade esta línea
      autoplayTimeout: 3000, // Añade esta línea si quieres controlar el tiempo entre transiciones (3000ms = 3s)
      responsive:{
          0:{
              items:1,
              nav:false,
              loop:true
          },
          600:{
              items:1,
              nav:false,
              loop:true
          },
          1000:{
              items:1,
              nav:false,
              loop:true
          }
      }
    });
    //carousel patrocinadores
    $('.three').owlCarousel({
      loop:true,
      responsiveClass:true,
      nav: false,
      dots: false,
      navText: ["<",">"],
      autoplay: true, // Añade esta línea
      autoplayTimeout: 3000, // Añade esta línea si quieres controlar el tiempo entre transiciones (3000ms = 3s)
      responsive:{
          0:{
              items:1,
              nav: false,
              dots: true
          },
          768:{
              items:1,
              nav:false,
              loop:true,
              margin:10
          },
          1024:{
              items:1,
              nav:false,
              loop:true,
              margin:30
          },
          1200:{
              items:1,
              nav:false,
              loop:true
          }
      }
    });
    // fin de la funcion ngAfterViewInit
  }




}





