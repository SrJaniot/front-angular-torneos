import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class NotificacionCorreoService {

  private url_notificaciones_correo : string = ConfiguracionRutasBackend.urlms_notificaciones_correo;


  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,

  ) { }


  /**
   * Metodo para enviar correo electronico invitando a un jugador a unirse a un equipo
   * @param correoDestino
   * @param nombreDestino
   * @param id_equipo
   * @param hash
   * @param nombreEquipo
   * @param nombreLiderEquipo
   * @returns
   */
  EnviarCorreoInvitacionJugador(correoDestino: string, nombreDestino : string ,id_equipo: string,
                                 hash: string, nombreEquipo:string, nombreLiderEquipo: String): Observable<any> {
    return this.http.post(this.url_notificaciones_correo+'correo-invitacionEquipo', {
      asuntoCorreo: 'Invitacion a unirte a un equipo',
      correoDestino: correoDestino,
      nombreDestino: nombreDestino,
      contenidoCorreo:"<h1>Invitacion a unirte a un equipo</h1>",
      idEquipo: id_equipo,
      hash: hash,
      nombreEquipo:nombreEquipo,
      nombreLiderEquipo:nombreLiderEquipo
    },{ responseType: 'text' });
  }





}
