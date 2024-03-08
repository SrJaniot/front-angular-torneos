import { Component } from '@angular/core';
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerTorneos } from '../../../Modelos/RespuestaServer.ObtenerTorneos.model';
import { Router } from '@angular/router';
import { ObtenerTorneos } from '../../../Modelos/ObtenerTorneos.model';
declare var $: any;


@Component({
  selector: 'app-ver-torenos',
  templateUrl: './ver-torenos.component.html',
  styleUrl: './ver-torenos.component.css'
})
export class VerTorenosComponent {

  //variables
  Lista_Torneos_Activos: ObtenerTorneos[] = [];

  constructor(
    private servicioTorneo: TorneoService,
    private Router: Router,
  ) { }

  //ngoninit
  ngOnInit(): void {

    let datos = this.servicioTorneo.ObtenerTorneosActivos().subscribe(
      (respuesta : RespuestaServerObtenerTorneos)=> {
        if (respuesta.CODIGO == 200) {
          console.log(respuesta);
          console.log(this.Lista_Torneos_Activos);
          this.CapturarParametrosTorneosActivos(respuesta);
          console.log(this.Lista_Torneos_Activos);

          //console.log(this.nombr_equipo);
          //console.log(this.ListaJugadores);
          //console.log(respuesta);
          //console.log(respuesta.DATOS);
          //console.log(respuesta.DATOS?.fun_get_equipofull?.jugadores![0]);
        }
        else {
          //this.Router.navigate(['/error404']);
        }
      });





  }



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

  //funcion que captura los datos de torneo activo
  CapturarParametrosTorneosActivos(datos: RespuestaServerObtenerTorneos) {
    this.Lista_Torneos_Activos = datos.DATOS!;

  }



  //funcion que captura los datos de torneo en curso

  //funcion que captura los datos de torneo finalizado




}
