import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilEquipo } from '../../../Modelos/RespuestaServer.PerfilEquipo.model';
import { ListaJugadores } from '../../../Modelos/ListaJugadores.model';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.component.html',
  styleUrl: './perfil-equipo.component.css'
})
export class PerfilEquipoComponent {
  //variables
  id_equipo: number = 0;
  nombr_equipo: string = "";
  foto_equipo: string = "";
  descripcion_equipo: string = "";
  lider_equipo_id: number = 0;
  id_sesion: number = 0;
  numero_torneos_ganados: number = 0;
  hash_equipo: string = "";
  //lista de jugadores
  ListaJugadores: ListaJugadores []= [];
  jugador: ListaJugadores = new ListaJugadores();
  jugadoresMostrados: (ListaJugadores | { foto_perfil_jugador: string; nickname_jugador: string; id_jugador: number; })[] = [];



  jugadoresEstandar = [
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK', id_jugador: 0},
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK', id_jugador: 0 },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK', id_jugador: 0 },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK', id_jugador: 0 },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK', id_jugador: 0 },
  ];


  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private PerfilService: PerfilService,
    private SeguridadService: SeguridadService,


  ) { }

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['idEquipo'];
    //captura el idpostgres del usuario que esta en sesion localsotrage
    this.id_sesion = parseInt(this.SeguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres!);
    //console.log(this.id_sesion);
    //console.log(idEquipo);
    let datos = this.PerfilService.ObtenerPerfilEquipo(id).subscribe(
    (respuesta : RespuestaServerPerfilEquipo)=> {
      if (respuesta.CODIGO == 200) {
        this.CapturarParametrosHtml(respuesta);
        this.actualizarJugadoresMostrados();
        console.log(respuesta)
        //console.log(this.nombr_equipo);
        //console.log(this.ListaJugadores);
        //console.log(respuesta);
        //console.log(respuesta.DATOS);
        //console.log(respuesta.DATOS?.fun_get_equipofull?.jugadores![0]);
      }
      else {
        this.Router.navigate(['/error404']);
      }
    });


  }




  CapturarParametrosHtml(datos: RespuestaServerPerfilEquipo) {
    //capturar los parametros del html
    this.id_equipo = datos?.DATOS?.fun_get_equipofull?.id_equipo!;
    this.nombr_equipo = datos?.DATOS?.fun_get_equipofull?.nom_equipo!;
    this.foto_equipo = datos?.DATOS?.fun_get_equipofull?.foto_equipo!;
    this.descripcion_equipo = datos?.DATOS?.fun_get_equipofull?.desc_equipo!;
    this.lider_equipo_id = datos?.DATOS?.fun_get_equipofull?.lider_equipo!;
    this.numero_torneos_ganados = datos?.DATOS?.fun_get_equipofull?.numero_torneos_ganados!;
    //capturar los jugadores
    this.ListaJugadores = datos?.DATOS?.fun_get_equipofull?.jugadores!;
    this.hash_equipo = datos?.DATOS?.fun_get_equipofull?.hash_equipo!;

  }
  actualizarJugadoresMostrados() {
    this.jugadoresMostrados = [...this.ListaJugadores, ...this.jugadoresEstandar].slice(0, 5);
  }

  copyToClipboard() {
    const linkDeInvitacion = 'http://localhost:4200/equipo/validar-invitacion-equipo/'+this.id_equipo+'/'+this.hash_equipo; // Reemplaza esto con tu link de invitación
    navigator.clipboard.writeText(linkDeInvitacion).then(() => {
      alert('Link de invitación copiado al portapapeles');
    }, (error) => {
      alert('Error al copiar el link de invitación: ' + error);
    });
  }


}
