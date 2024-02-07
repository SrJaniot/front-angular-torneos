import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private url_ms_seguridad: string = ConfiguracionRutasBackend.urlbackend_mc_seguridad;

  constructor(
    private http: HttpClient,


  ) {

   }



   /**
    * metodo para identificar el usuario en el sistema el cual recibe el usuario y la clave genera un code2fa
    * @param usuario
    * @param clave
    * @returns
    */
  IdentificarUsuario(usuario: string, clave: string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'identificar-usuario',{
      correo: usuario,
      clave: clave
    });
  }

  /**
   * metodo para registrar un usuario en el sistema
   * @param nombre
   * @param edad
   * @param celular
   * @param correo
   * @param id_ciudad
   * @param nickname_jugador
   * @param clave
   * @returns
   */
  RegistrarUsuario(nombre: string, edad: number, celular: string, correo: string, id_ciudad: number, nickname_jugador: string, clave:string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'funcion-inserta-usuario-jugador-datos-personales',{
      nombre: nombre,
      edad: edad,
      celular: celular,
      correo: correo,
      foto_perfil_jugador: "sinfoto.jpg",
      id_ciudad: id_ciudad,
      nickname_jugador: nickname_jugador,
      liga_jugador: "SIN LIGA",
      link_cuenta_jugador: "NO VERIFICADO",
      id_game: 1, //ESTE VALOR DEBE SER DINAMICO POR EL MOMENTO SE DEJA FIJO EN 1 = LEAGUE OF LEGENDS
      clave: clave
    });

  }







}
