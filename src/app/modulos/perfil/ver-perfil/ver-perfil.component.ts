import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilUsuario } from '../../../Modelos/RespuestaServer.PerfilUsuario.model';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent {
  //variables
  //parametros del perfil html
  estado_jugador?: boolean;
  foto_equipo?: string;
  foto_perfil?: string;
  id_datos?: number;
  id_game?: number;
  id_jugador?: number;
  liga_jugador?: string;
  link_cuenta_jugador?: string;
  nickname_jugador?: string;
  nom_equipo?: string;
  id_equipo?: number;



  constructor(
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el ID de los parámetros de la ruta y realiza una llamada al servicio de perfil para obtener los datos del perfil correspondiente.
   */
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    //console.log(id);
    let datos=this.perfilService.ObtenerPerfil(id).subscribe(
      (respuesta:RespuestaServerPerfilUsuario)=>{
        console.log(respuesta);
        //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.liga_jugador);

        if(respuesta.CODIGO==200){
          this.CapturarParametrosHtml(respuesta);
          //console.log(this.estado_jugador);
        }
        else{
          this.router.navigate(['/error404']);
        }

        }
    );
  }

  CapturarParametrosHtml(datos: RespuestaServerPerfilUsuario) {
    //capturar los parametros del html
    this.estado_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.estado_jugador;
    this.foto_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.foto_equipo;
    this.foto_perfil = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.foto_perfil;
    this.id_datos = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_datos;
    this.id_game = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_game;
    this.id_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_jugador;
    this.liga_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.liga_jugador;
    this.link_cuenta_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.link_cuenta_jugador;
    this.nickname_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nickname_jugador;
    this.nom_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nom_equipo;
    this.id_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo;
  }


}
