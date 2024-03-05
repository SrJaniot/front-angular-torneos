import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from '../../../servicios/equipo.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { NotificacionWhatsappService } from '../../../servicios/notificacion-whatsapp.service';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilUsuario } from '../../../Modelos/RespuestaServer.PerfilUsuario.model';

@Component({
  selector: 'app-validar-invitacion-equipo',
  templateUrl: './validar-invitacion-equipo.component.html',
  styleUrl: './validar-invitacion-equipo.component.css'
})
export class ValidarInvitacionEquipoComponent {
  validado = false;

  idEquipo: string = '';
  hashEquipo: string = '';
  id_jugador: string = '';
  nickname_jugador: string = '';
  nom_equipo: string = '';

  idEquipoParseado: number = 0;
  id_jugadorParseado: number = 0;

  id_equipo?: number;



  constructor(
    private route: ActivatedRoute,
    private servicioEquipo: EquipoService,
    private SeguridadService: SeguridadService,
    private ServicioNotificacionWhatsapp: NotificacionWhatsappService,
    private perfilService: PerfilService,
    private router: Router,



  ) {
  }
  ngOnInit( ) {




    this.idEquipo = this.route.snapshot.params["idEquipo"];
    this.hashEquipo = this.route.snapshot.params["hashEquipo"];
    //captura el id del jugador a partir del token
    this.id_jugador =  this.SeguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres!;
    //parcear el id del jugador a number
    this.id_jugadorParseado = parseInt(this.id_jugador);
    //parcear el id del equipo a number
    this.idEquipoParseado = parseInt(this.idEquipo);


    //console.log(this.idEquipo);
    //console.log(this.hashEquipo);
    //console.log(this.id_jugador);

    //console.log(this.idEquipoParseado);
    //console.log(this.id_jugadorParseado);
    this.ValidarSiYaTieneEquipo();

    this.ValidarHash();
  }




  ValidarHash(){
    this.servicioEquipo.ValidarHashLinkInvitacionEquipo(this.idEquipoParseado,this.hashEquipo,this.id_jugadorParseado).subscribe({
      next: (response:RespuestaServer) => {
        //console.log(response);
        if(response.CODIGO == 200){
          this.validado = true;
          //PREPARA EL MENSAJE DE BIENVENIDA AL EQUIPO
          let datos=this.perfilService.ObtenerPerfil(this.id_jugadorParseado).subscribe(
            (respuesta:RespuestaServerPerfilUsuario)=>{
              //console.log(respuesta);
              //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.liga_jugador);
              if(respuesta.CODIGO==200){
                //console.log("entre care monda ")
                //console.log(respuesta.DATOS)
                //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil)
                //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nickname_jugador);
                //console.log(this.nom_equipo);
                //console.log(this.nickname_jugador);
                this.nom_equipo = respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nom_equipo!;
                this.nickname_jugador = respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nickname_jugador!;
                //console.log(this.nom_equipo);
                //console.log(this.nickname_jugador);

                //console.log(this.nom_equipo);
                //console.log(this.nickname_jugador);
                let mensaje = `¡Hola! ${this.nickname_jugador}
Te informamos que has sido vinculado satisfactoriamente al equipo ${this.nom_equipo} . ¡Bienvenido/a! Estamos emocionados de contar contigo. 😊🎉 Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. ¡Vamos juntos hacia el éxito!`
                let perfillocals = this.SeguridadService.ObtenerDatosUsuarioIdentificadoSESION();
                let celular = perfillocals?.usuario?.celular;
                let celulaular57 ='57'+ celular;
                //console.log(celulaular57);
                //ENVIA EL MENSAJE DE BIENVENIDA AL EQUIPO
                this.ServicioNotificacionWhatsapp.EnviarMensajeWhatsapp(celulaular57,mensaje).subscribe({
                next: (response:RespuestaServer) => {
                  console.log(response);
                 }
                });

              }
            }
          );

        }
        error: (error:RespuestaServer) => {
          console.log(error);
        }
      }
    })
  }




  async ValidarSiYaTieneEquipo() {
    //console.log("hola")
    try {
      console.log("hola desde try")
      console.log(this.id_jugadorParseado);


      let respuesta: RespuestaServerPerfilUsuario = await this.perfilService.ObtenerPerfil(this.id_jugadorParseado).toPromise() as RespuestaServerPerfilUsuario;
      console.log(respuesta);
      if (respuesta.CODIGO == 200) {
        console.log(respuesta);
        this.id_equipo = respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo;
        console.log(this.id_equipo);

        if (this.id_equipo != null) {
          this.router.navigate(['/noticias/home']);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }





}
