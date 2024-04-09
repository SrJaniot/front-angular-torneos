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

  EnviarCorreoTiket_ingreso_evento_qr(id_evento: string,nom_evento:string,fecha_evento: string,hora_inicio: string,hora_fin: string,
    hash_validacion: string): Observable<any> {
    let id_usuario= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    let nombre_destino= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.nombre;
    let correo_destino= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.correo;
    return this.http.post(this.url_notificaciones_correo+'correo-tiketIngresoEvento_qr', {
      asuntoCorreo: 'Tiket de ingreso al evento',
      correoDestino: correo_destino,
      nombreDestino: nombre_destino,
      contenidoCorreo:"<h1>Tiket de ingreso al evento</h1>",
      id_evento: id_evento,
      id_datos_personales: id_usuario,
      hash_validacion: hash_validacion,
      nom_evento: nom_evento,
      fecha_evento: fecha_evento,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,

    },{ responseType: 'text' });
  }

  EnviarCorreoTiket_ingreso_evento_barras(id_evento: string,nom_evento:string,fecha_evento: string,hora_inicio: string,hora_fin: string,
                                          hash_validacion: string): Observable<any> {
    let id_usuario= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    let nombre_destino= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.nombre;
    let correo_destino= this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.correo;
    return this.http.post(this.url_notificaciones_correo+'correo-tiketIngresoEvento_barras', {
      asuntoCorreo: 'Tiket de ingreso al evento',
      correoDestino: correo_destino,
      nombreDestino: nombre_destino,
      contenidoCorreo:"<h1>Tiket de ingreso al evento</h1>",
      id_evento: id_evento,
      id_datos_personales: id_usuario,
      hash_validacion: hash_validacion,
      nom_evento: nom_evento,
      fecha_evento: fecha_evento,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,

    },{ responseType: 'text' });
  }






}
