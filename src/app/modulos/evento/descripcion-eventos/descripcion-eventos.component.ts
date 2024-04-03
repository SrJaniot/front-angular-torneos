import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerDatosTorneo } from '../../../Modelos/RespuestaServer.ObtenerDatosTorneo.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventoService } from '../../../servicios/evento.service';
import { RespuestaServerObtenerDatosEvento } from '../../../Modelos/RespuestaServerObtenerDatosEvento.model';
import { ListTorneos } from '../../../Modelos/ListTorneos.model';
import { NotificacionCorreoService } from '../../../servicios/notificacion-correo.service';

declare var $: any;


@Component({
  selector: 'app-descripcion-eventos',
  templateUrl: './descripcion-eventos.component.html',
  styleUrl: './descripcion-eventos.component.css'
})
export class DescripcionEventosComponent {
  //variables parte 1 general
  foto_evento: string = "";
  nombre_evento: string = "";
  resumen_evento: string = "";
  video_evento?: SafeResourceUrl ;
  //variables parte 2 informacion
  informacion_general_evento: string = "";
  informacion_reglas_evento: string = "";
  //variables premios
  descripcion_premio_1: string = "";
  foto_premio_1: string = "";
  descripcion_premio_2: string = "";
  foto_premio_2: string = "";
  descripcion_premio_3: string = "";
  foto_premio_3: string = "";

  id_evento: number = 0;

  ListadeActividades:ListTorneos[] = []






  constructor(
    private route: ActivatedRoute,
    private EventoService: EventoService,
    private TorneoService: TorneoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private NotificacionCorreoService: NotificacionCorreoService,


  ){}

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['id_evento'];
    //console.log(id);


    let datos = this.EventoService.ObtenerDatosEventos_Id(id).subscribe(
      (respuesta: RespuestaServerObtenerDatosEvento) => {
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          this.CapturarParametrosHtml(respuesta);
          console.log(this.id_evento);
          this.inicializarCarouselDespuesDeObtenerDatosEventosDisponibles();
        }else{
          //console.log(respuesta);
          this.router.navigate(['/noticias/error404']);
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



  CapturarParametrosHtml(respuesta: RespuestaServerObtenerDatosEvento) {
    //parte 1
    this.id_evento= respuesta.DATOS?.fun_get_evento2?.id_evento!;
    this.foto_evento= respuesta.DATOS?.fun_get_evento2?.foto_evento!;
    this.nombre_evento= respuesta.DATOS?.fun_get_evento2?.nom_evento!;
    this.resumen_evento= respuesta.DATOS?.fun_get_evento2?.desc_evento!;
    this.video_evento= this.sanitizer.bypassSecurityTrustResourceUrl(respuesta.DATOS?.fun_get_evento2?.video_explica_evento!);
    //parte 2
    this.informacion_general_evento= respuesta.DATOS?.fun_get_evento2?.informacion_general!;
    this.informacion_reglas_evento= respuesta.DATOS?.fun_get_evento2?.informacion_reglas!;
    //parte 3
    this.descripcion_premio_1= respuesta.DATOS?.fun_get_evento2?.premio_evento_1!;
    this.foto_premio_1= respuesta.DATOS?.fun_get_evento2?.foto_premio_evento_1!;
    this.descripcion_premio_2= respuesta.DATOS?.fun_get_evento2?.premio_evento_2!;
    this.foto_premio_2= respuesta.DATOS?.fun_get_evento2?.foto_premio_evento_2!;
    this.descripcion_premio_3= respuesta.DATOS?.fun_get_evento2?.premio_evento_3!;
    this.foto_premio_3= respuesta.DATOS?.fun_get_evento2?.foto_premio_evento_3!;
    //lista de actividades
    this.ListadeActividades = respuesta.DATOS?.fun_get_evento2?.torneos!;
  }

  //funcion para el boton registrate
  RegistrarseEvento(){
    //console.log(this.id_evento);
    this.TorneoService.RegistrarAsistenciaEvento(this.id_evento).subscribe(
      (respuesta:any) => {
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          alert('Te has registrado correctamente');
          console.log(respuesta.DATOS);
          let hash_validacion = respuesta.DATOS!;
          //convierte el id del evento a string
          let id_evento_String = this.id_evento.toString();
          //enviar correo codigo de barras
          this.NotificacionCorreoService.EnviarCorreoTiket_ingreso_evento_barras(id_evento_String,hash_validacion).subscribe({
            next: (respuesta:any) => {
              console.log(respuesta);
              console.log('correo enviado');
            }
          });
          this.NotificacionCorreoService.EnviarCorreoTiket_ingreso_evento_qr(id_evento_String,hash_validacion).subscribe({
            next: (respuesta:any) => {
              console.log(respuesta);
              console.log('correo enviado');
            }
          });

        } else {
          alert('No se pudo registrar');
        }
      }
    );
  }




















  // variable para el cambio de tabs
  activeTab: string = 'info';
  changeTab(tab: string) {
      this.activeTab = tab;
      console.log(this.activeTab);
  }

}

