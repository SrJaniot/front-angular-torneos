import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerDatosTorneo } from '../../../Modelos/RespuestaServer.ObtenerDatosTorneo.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventoService } from '../../../servicios/evento.service';
import { RespuestaServerObtenerDatosEvento } from '../../../Modelos/RespuestaServerObtenerDatosEvento.model';
import { ListTorneos } from '../../../Modelos/ListTorneos.model';
import { NotificacionCorreoService } from '../../../servicios/notificacion-correo.service';
import { NotificacionWhatsappService } from '../../../servicios/notificacion-whatsapp.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { NgToastService } from 'ng-angular-popup';

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

  Boton_Registrarse:boolean = false;

  //fechas
  fecha_inicio: Date
  fecha_fin: Date





  constructor(
    private route: ActivatedRoute,
    private EventoService: EventoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private NotificacionCorreoService: NotificacionCorreoService,
    private NotificacionWhatsappService: NotificacionWhatsappService,
    private seguridadService: SeguridadService,
    private toast : NgToastService


  ){
    this.fecha_inicio = new Date();
    this.fecha_fin = new Date();


  }

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['id_evento'];
    //console.log(id);


    let datos = this.EventoService.ObtenerDatosEventos_Id(id).subscribe(
      (respuesta: RespuestaServerObtenerDatosEvento) => {
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          this.CapturarParametrosHtml(respuesta);
          //console.log(this.id_evento);
          //console.log(this.fecha_inicio)

          this.inicializarCarouselDespuesDeObtenerDatosEventosDisponibles();
          let datos2 = this.EventoService.ValidarAforoEvento(this.id_evento).subscribe(
            (respuesta: RespuestaServerObtenerDatosEvento) => {
              console.log(respuesta);
              if (respuesta.CODIGO == 200) {
                console.log(respuesta.DATOS);
                if(respuesta.DATOS){
                  this.Boton_Registrarse = true;
                }
              }
            }
          );
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
    //fechas
    this.fecha_inicio=new Date( respuesta.DATOS?.fun_get_evento2?.fecha_inicio_evento!);
    this.fecha_fin= new Date ( respuesta.DATOS?.fun_get_evento2?.fecha_fin_evento!);
  }

  //funcion para el boton registrate
  RegistrarseEvento(){
    //console.log(this.id_evento);
    this.EventoService.RegistrarAsistenciaEvento(this.id_evento).subscribe(
      (respuesta:any) => {
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          //alert('Te has registrado correctamente');
          this.toast.success({detail:"EXITO",summary:"Te has registrado correctamente",duration:5000, position:'topCenter'});
          console.log(respuesta.DATOS);
          let hash_validacion = respuesta.DATOS!;
          //convierte el id del evento a string
          let id_evento_String = this.id_evento.toString();
          //capturar parametros de la fecha independiente
          let fecha_inicio = this.fecha_inicio;
          let fecha_inicio_anio_mes_dia = fecha_inicio.getFullYear() + '-' + (fecha_inicio.getMonth() + 1) + '-' + fecha_inicio.getDate();
          let fecha_inicio_hora_minuto = fecha_inicio.getHours() + ':' + fecha_inicio.getMinutes();
          let fecha_fin = this.fecha_fin;
          let fecha_fin_anio_mes_dia = fecha_fin.getFullYear() + '-' + (fecha_fin.getMonth() + 1) + '-' + fecha_fin.getDate();
          let fecha_fin_hora_minuto = fecha_fin.getHours() + ':' + fecha_fin.getMinutes();

          //enviar correo codigo de barras

          this.NotificacionCorreoService.EnviarCorreoTiket_ingreso_evento_barras(id_evento_String,this.nombre_evento,fecha_inicio_anio_mes_dia,fecha_inicio_hora_minuto,fecha_fin_hora_minuto,hash_validacion).subscribe({
            next: (respuesta:any) => {
              console.log(respuesta);
              console.log('correo enviado');
            }
          });
          this.NotificacionCorreoService.EnviarCorreoTiket_ingreso_evento_qr(id_evento_String,this.nombre_evento,fecha_inicio_anio_mes_dia,fecha_inicio_hora_minuto,fecha_fin_hora_minuto,hash_validacion).subscribe({
            next: (respuesta:any) => {
              console.log(respuesta);
              console.log('correo enviado');
            }
          });
          //enviar mensaje whatsapp
          //preparar el nombre del usuario para mandarlo por url, es decir cuando encuetre un espacio lo cambia por %20
          let nombre_usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.nombre;
          let nombre_usuario_con_espacios = nombre_usuario?.split(" ").join("%20");
          let nombre_evento_con_espacios = this.nombre_evento.split(" ").join("%20");

          let url_code_barras = "http://127.0.0.1:3001/generateBarcodedownloadPDF_GET?id_evento="+id_evento_String+"&id_datos_personales="+this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres+"&hash_validacion="+hash_validacion+"&nombreDestino="+nombre_usuario_con_espacios+"&nom_evento="+nombre_evento_con_espacios+"&fecha_evento="+fecha_inicio_anio_mes_dia+"&hora_inicio="+fecha_inicio_hora_minuto+"&hora_fin="+fecha_fin_hora_minuto;
          let url_qr = "http://127.0.0.1:3001/generateQRCodePDF_GET?id_evento="+id_evento_String+"&id_datos_personales="+this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres+"&hash_validacion="+hash_validacion+"&nombreDestino="+nombre_usuario_con_espacios+"&nom_evento="+nombre_evento_con_espacios+"&fecha_evento="+fecha_inicio_anio_mes_dia+"&hora_inicio="+fecha_inicio_hora_minuto+"&hora_fin="+fecha_fin_hora_minuto;
          let celular ="57"+ this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.celular;
          console.log(url_code_barras);
          console.log(url_qr);
          console.log(celular);




          this.NotificacionWhatsappService.EnviarMensajeWhatsappArchivo(celular,'tiket',url_code_barras ).subscribe({
           next: (respuesta:any) => {
              console.log(respuesta);
              console.log('mensaje enviado');
            }
          });
          this.NotificacionWhatsappService.EnviarMensajeWhatsappArchivo(celular,'tiket',url_qr ).subscribe({
            next:(respuesta:any) => {
              console.log(respuesta);
              console.log('mensaje enviado');
            }
          });



        } else {
          //alert('No se pudo registrar');
          this.toast.error({detail:"ERROR",summary:"No se pudo registrar",duration:5000, position:'topCenter'});
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

