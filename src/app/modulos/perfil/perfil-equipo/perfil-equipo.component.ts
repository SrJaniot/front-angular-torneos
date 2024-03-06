import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilEquipo } from '../../../Modelos/RespuestaServer.PerfilEquipo.model';
import { ListaJugadores } from '../../../Modelos/ListaJugadores.model';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.component.html',
  styleUrl: './perfil-equipo.component.css'
})
export class PerfilEquipoComponent {
  //variables
  nombr_equipo: string = "";
  foto_equipo: string = "";
  descripcion_equipo: string = "";
  lider_equipo_id: number = 0;
  numero_torneos_ganados: number = 0;
  //lista de jugadores
  ListaJugadores: ListaJugadores []= [];
  jugador: ListaJugadores = new ListaJugadores();
  jugadoresMostrados: (ListaJugadores | { foto_perfil_jugador: string; nickname_jugador: string; })[] = [];



  jugadoresEstandar = [
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK' },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK' },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK' },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK' },
    { foto_perfil_jugador: 'sinfoto.png', nickname_jugador: 'AFK' },
  ];


  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private PerfilService: PerfilService,


  ) { }

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['idEquipo'];
    //console.log(idEquipo);
    let datos = this.PerfilService.ObtenerPerfilEquipo(id).subscribe(
    (respuesta : RespuestaServerPerfilEquipo)=> {
      if (respuesta.CODIGO == 200) {
        this.CapturarParametrosHtml(respuesta);
        this.actualizarJugadoresMostrados();
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
    this.nombr_equipo = datos?.DATOS?.fun_get_equipofull?.nom_equipo!;
    this.foto_equipo = datos?.DATOS?.fun_get_equipofull?.foto_equipo!;
    this.descripcion_equipo = datos?.DATOS?.fun_get_equipofull?.desc_equipo!;
    this.lider_equipo_id = datos?.DATOS?.fun_get_equipofull?.lider_equipo!;
    this.numero_torneos_ganados = datos?.DATOS?.fun_get_equipofull?.numero_torneos_ganados!;
    //capturar los jugadores
    this.ListaJugadores = datos?.DATOS?.fun_get_equipofull?.jugadores!;

  }
  actualizarJugadoresMostrados() {
    this.jugadoresMostrados = [...this.ListaJugadores, ...this.jugadoresEstandar].slice(0, 5);
  }


}
