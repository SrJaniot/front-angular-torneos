import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerDatosTorneo } from '../../../Modelos/RespuestaServer.ObtenerDatosTorneo.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerPerfilUsuario } from '../../../Modelos/RespuestaServer.PerfilUsuario.model';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilEquipo } from '../../../Modelos/RespuestaServer.PerfilEquipo.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-descripcion-torneo',
  templateUrl: './descripcion-torneo.component.html',
  styleUrl: './descripcion-torneo.component.css'
})
export class DescripcionTorneoComponent {
  //variables parte 1 general
  foto_torneo: string = "";
  nombre_torneo: string = "";
  resumen_torneo: string = "";
  video_torneo?: SafeResourceUrl ;
  //variables parte 2 informacion
  informacion_general_torneo: string = "";
  informacion_reglas_torneo: string = "";
  //variables premios
  descripcion_premio_1: string = "";
  foto_premio_1: string = "";
  descripcion_premio_2: string = "";
  foto_premio_2: string = "";
  descripcion_premio_3: string = "";
  foto_premio_3: string = "";

  id_evento: number = 0;

  numero_integrantes_equipo_torneo: number = 0;

  id_equipo: string = '0';

  lider_equipo_id: number = 0;
  id_usuario:number = 0;








  constructor(
    private route: ActivatedRoute,
    private TorneoService: TorneoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private seguridadService: SeguridadService,
    private perfilService: PerfilService,
    private toast: NgToastService,


  ){}

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['id_torneo'];
    console.log(id);
    let datos = this.TorneoService.ObtenerDatosTorneo_Id(id).subscribe(
      (respuesta: RespuestaServerObtenerDatosTorneo) => {
        //console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          this.CapturarParametrosHtml(respuesta);
          //console.log(this.id_evento);
          let datos2 = this.TorneoService.ObtenerNumeroIntegrantesEquipoTorneo(id).subscribe(
            (respuesta2: any) => {
              //console.log(respuesta2);
              if (respuesta2.CODIGO == 200) {
                this.numero_integrantes_equipo_torneo= respuesta2.DATOS;
              }else{
                //console.log(respuesta2);
              }
            }
          );
          let id_usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
          this.id_usuario = parseInt(id_usuario!);

          (async () => {
            await this.obtenerIdEquipo(this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres!);
            await this.obtenerIdLiderEquipo(this.id_equipo);
            console.log(this.id_equipo);
            console.log(this.lider_equipo_id);
          })();


        }else{
          //console.log(respuesta);
          this.router.navigate(['/noticias/error404']);
        }
      }
    );

  }

  CapturarParametrosHtml(respuesta: RespuestaServerObtenerDatosTorneo) {
    //parte 1
    this.foto_torneo= respuesta.DATOS?.foto_torneo!;
    this.nombre_torneo= respuesta.DATOS?.nom_torneo!;
    this.resumen_torneo= respuesta.DATOS?.desc_torneo!;
    this.video_torneo= this.sanitizer.bypassSecurityTrustResourceUrl(respuesta.DATOS?.video_explica_torneo!);
    //parte 2
    this.informacion_general_torneo= respuesta.DATOS?.informacion_general!;
    this.informacion_reglas_torneo= respuesta.DATOS?.informacion_reglas!;
    //parte 3
    this.descripcion_premio_1= respuesta.DATOS?.premio_torneo_1!;
    this.foto_premio_1= respuesta.DATOS?.foto_premio_torneo_1!;
    this.descripcion_premio_2= respuesta.DATOS?.premio_torneo_2!;
    this.foto_premio_2= respuesta.DATOS?.foto_premio_torneo_2!;
    this.descripcion_premio_3= respuesta.DATOS?.premio_torneo_3!;
    this.foto_premio_3= respuesta.DATOS?.foto_premio_torneo_3!;
    //id evento
    this.id_evento= respuesta.DATOS?.id_evento!;
  }

  //funcion para el boton registrate
  RegistrarseEventoIndividual(){
    //console.log(this.id_evento);
    //capturamos el id del usuario
    let id_usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    let id_usuario_entero = parseInt(id_usuario!);
    //capturamos el id del torneo
    let id_torneo = this.route.snapshot.params['id_torneo'];
    let id_torneo_entero = parseInt(id_torneo);

    this.TorneoService.vincularUsuarioTorneo(id_usuario_entero,id_torneo_entero).subscribe(
      (respuesta:any) => {
        //console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          //alert('Te has registrado correctamente');
          this.toast.success({detail:"EXITO",summary:"Te has registrado correctamente",duration:5000, position:'topCenter'});
        } else {
          //alert('No se pudo registrar');
          this.toast.error({detail:"ERROR",summary:"No se pudo registrar",duration:5000, position:'topCenter'});
        }
      }
    );

  }

    //funcion para el boton registrate
    async RegistrarseEventoEquipo(){
      //console.log(this.id_evento);
       //capturamos el id del usuario
      let id_usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
      let id_usuario_entero = parseInt(id_usuario!);
      //capturamos el id del torneo
      let id_torneo = this.route.snapshot.params['id_torneo'];
      let id_torneo_entero = parseInt(id_torneo);
      //capturamos el id del equipo
      let id_equipo_entero = parseInt(this.id_equipo);
      //alert(id_equipo_entero);


      this.TorneoService.VincularEquipoTorneo(id_equipo_entero,id_torneo_entero,id_usuario_entero).subscribe(
        (respuesta:any) => {
          console.log(respuesta);
          if (respuesta.CODIGO == 200) {
            //alert('Te has registrado correctamente');
            this.toast.success({detail:"EXITO",summary:"Te has registrado correctamente",duration:5000, position:'topCenter'});
          } else {
            //alert('No se pudo registrar');
            this.toast.error({detail:"ERROR",summary:"No se pudo registrar",duration:5000, position:'topCenter'});
          }
        }
      );

    }



    async obtenerIdEquipo(idJugador: string){
      let idJugadorNumber = parseInt(idJugador);
      let respuesta: RespuestaServerPerfilUsuario = await this.perfilService.ObtenerPerfil(idJugadorNumber).toPromise() as RespuestaServerPerfilUsuario;
      if (respuesta.CODIGO == 200) {
        //console.log(respuesta);
        //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo!);
        if (respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo! == null ) {
          console.log("no tiene equipo");
          this.id_equipo = "0";
        }else{
        this.id_equipo = "" + respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo!;
        }
      } else {
        this.id_equipo = "0";
      }
    }

    async obtenerIdLiderEquipo(idEquipo: string){
      let idEquipoNumber = parseInt(idEquipo);
      let respuesta: RespuestaServerPerfilEquipo = await this.perfilService.ObtenerPerfilEquipo(idEquipoNumber).toPromise() as RespuestaServerPerfilEquipo;
      if (respuesta.CODIGO == 200) {
        //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo!);
        if (respuesta?.DATOS?.fun_get_equipofull?.lider_equipo == null) {
          this.lider_equipo_id = 0;
        }else{
        this.lider_equipo_id = respuesta?.DATOS?.fun_get_equipofull?.lider_equipo;
        }
      } else {
        this.lider_equipo_id = 0;
      }
    }




















  // variable para el cambio de tabs
  activeTab: string = 'info';
  changeTab(tab: string) {
      this.activeTab = tab;
      console.log(this.activeTab);
  }

}
