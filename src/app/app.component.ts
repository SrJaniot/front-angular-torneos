import { Component } from '@angular/core';
import { SeguridadService } from './servicios/seguridad.service';
import { UsuarioValidadoModel } from './Modelos/UsuarioValidado.model';
import { PerfilService } from './servicios/perfil.service';
import { RespuestaServerPerfilUsuario } from './Modelos/RespuestaServer.PerfilUsuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // variables
  title = 'Torneos';
  status = true;
  sesionActiva= false;
  id_postgres: string = "";
  id_equipo: string = '';

  constructor(
    private servicioSeguridad: SeguridadService,
    private perfilService: PerfilService,


  ){

  }

  async ngOnInit() {
    this.ValidarSesionActiva();
    await this.obtenerIdEquipo(this.id_postgres);

    //console.log(this.sesionActiva)
    //console.log(this.id_equipo);
    //console.log(this.id_postgres);
  }

  ValidarSesionActiva() {
    this.servicioSeguridad.ObteberDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel) => {
        if (datos.token!= "") {
          this.sesionActiva = true;
          this.id_postgres = datos.usuario?.idPostgres!;


        }else{
          this.sesionActiva = false;

        }
        //console.log(datos);

      },
      error: (error:any) => {
        //console.log(error);
        this.sesionActiva = false;
      }
    });


  }

  async obtenerIdEquipo(idJugador: string){
    let idJugadorNumber = parseInt(idJugador);
    let respuesta: RespuestaServerPerfilUsuario = await this.perfilService.ObtenerPerfil(idJugadorNumber).toPromise() as RespuestaServerPerfilUsuario;
    if (respuesta.CODIGO == 200) {
      //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo!);
      if (respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo == null) {
        this.id_equipo = "NA";
      }else{
      this.id_equipo = "" + respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo!;
      }
    } else {
      this.id_equipo = "NA";
    }
  }













  addToggle(){
   this.status = !this.status;
  }




}
