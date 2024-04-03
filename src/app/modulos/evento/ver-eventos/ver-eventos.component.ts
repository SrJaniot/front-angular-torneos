import { Component } from '@angular/core';
import { ObtenerEventos } from '../../../Modelos/ObtenerEventos.model';
import { EventoService } from '../../../servicios/evento.service';
import { RespuestaServerObtenerEventos } from '../../../Modelos/RespuestaServerObtenerEventos.model';
declare var $: any;



@Component({
  selector: 'app-ver-eventos',
  templateUrl: './ver-eventos.component.html',
  styleUrl: './ver-eventos.component.css'
})
export class VerEventosComponent {
  Lista_Eventos_Activos: ObtenerEventos[] = [];
  Lista_Eventos_EnCurso: ObtenerEventos[] = [];
  Lista_Eventos_Finalizados: ObtenerEventos[] = [];

  constructor(
    private servicioEvento: EventoService,

  ) { }

  ngOnInit(): void {
    this.servicioEvento.ObtenerEventosActivos().subscribe(
      (respuesta: RespuestaServerObtenerEventos ) => {
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          this.Lista_Eventos_Activos = respuesta.DATOS!;
          this.inicializarCarouselDespuesDeObtenerDatosEventosDisponibles(); // Llama a la función aquí
        } else {
          // Opcional: manejo de errores o redirección
        }
      }
    );
    this.servicioEvento.ObtenerEventosEnCurso().subscribe(
      (respuesta: RespuestaServerObtenerEventos) => {
        if (respuesta.CODIGO == 200) {
          this.Lista_Eventos_EnCurso = respuesta.DATOS!;
          this.inicializarCarouselDespuesDeObtenerDatosEventosEnCurso(); // Llama a la función aquí
        } else {
          // Opcional: manejo de errores o redirección
        }
      }
    );
    this.servicioEvento.ObtenerEventosFinalizados().subscribe(
      (respuesta: RespuestaServerObtenerEventos) => {
        if (respuesta.CODIGO == 200) {
          this.Lista_Eventos_Finalizados = respuesta.DATOS!;
          this.inicializarCarouselDespuesDeObtenerDatosEventosFinalizados(); // Llama a la función aquí
        } else {
          // Opcional: manejo de errores o redirección
        }
      }
    );


  }



  inicializarCarouselDespuesDeObtenerDatosEventosDisponibles() {
    setTimeout(() => { // Utiliza setTimeout para asegurarte de que se ejecute en la siguiente pasada del event loop
      $('.owl-one-activos').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        nav: false,
        navText: ["<",">"],
        autoplay: true,
        autoplayTimeout: 9000,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          768: {
            items: 2,
            nav: false,
            loop: true,
            margin: 10
          },
          1024: {
            items: 2,
            nav: false,
            loop: true,
            margin: 30
          },
          1200: {
            items: 3,
            nav: false,
            loop: true
          }
        }
      });
    });

  }
  inicializarCarouselDespuesDeObtenerDatosEventosEnCurso() {
    setTimeout(() => { // Utiliza setTimeout para asegurarte de que se ejecute en la siguiente pasada del event loop
      $('.owl-one-encurso').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        nav: false,
        navText: ["<",">"],
        autoplay: true,
        autoplayTimeout: 9000,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          768: {
            items: 2,
            nav: false,
            loop: true,
            margin: 10
          },
          1024: {
            items: 2,
            nav: false,
            loop: true,
            margin: 30
          },
          1200: {
            items: 3,
            nav: false,
            loop: true
          }
        }
      });
    });


  }
  inicializarCarouselDespuesDeObtenerDatosEventosFinalizados() {
    setTimeout(() => { // Utiliza setTimeout para asegurarte de que se ejecute en la siguiente pasada del event loop
      $('.owl-one-finalizado').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        nav: false,
        navText: ["<",">"],
        autoplay: true,
        autoplayTimeout: 9000,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          768: {
            items: 2,
            nav: false,
            loop: true,
            margin: 10
          },
          1024: {
            items: 2,
            nav: false,
            loop: true,
            margin: 30
          },
          1200: {
            items: 3,
            nav: false,
            loop: true
          }
        }
      });
    });

  }







}
