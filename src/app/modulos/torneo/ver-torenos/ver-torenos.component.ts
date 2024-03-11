import { Component, AfterViewInit } from '@angular/core';
// Importa AfterViewInit si decides usar ngAfterViewInit
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerTorneos } from '../../../Modelos/RespuestaServer.ObtenerTorneos.model';
import { Router } from '@angular/router';
import { ObtenerTorneos } from '../../../Modelos/ObtenerTorneos.model';
declare var $: any;

@Component({
  selector: 'app-ver-torenos',
  templateUrl: './ver-torenos.component.html',
  styleUrls: ['./ver-torenos.component.css'] // Corrige "styleUrl" por "styleUrls" y debe ser un array
})
export class VerTorenosComponent {

  Lista_Torneos_Activos: ObtenerTorneos[] = [];

  constructor(
    private servicioTorneo: TorneoService,
    private Router: Router,
  ) { }

  ngOnInit(): void {
    this.servicioTorneo.ObtenerTorneosActivos().subscribe(
      (respuesta : RespuestaServerObtenerTorneos) => {
        if (respuesta.CODIGO == 200) {
          this.Lista_Torneos_Activos = respuesta.DATOS!;
          this.iniciaCarouselDespuesDeObtenerDatos(); // Llama a la función aquí
        } else {
          // Opcional: manejo de errores o redirección
        }
      }
    );
  }

  iniciaCarouselDespuesDeObtenerDatos() {
    setTimeout(() => { // Utiliza setTimeout para asegurarte de que se ejecute en la siguiente pasada del event loop
      $('.owl-one').owlCarousel({
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
