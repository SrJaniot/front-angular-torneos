import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';
import { RespuestaServerObtenerTorneos } from '../Modelos/RespuestaServer.ObtenerTorneos.model';
import { RespuestaServerObtenerDatosTorneo } from '../Modelos/RespuestaServer.ObtenerDatosTorneo.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServer2 } from '../Modelos/RespuestaServer2.model';


@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;


  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,

  ) { }

  ObtenerTorneosActivos(): Observable<RespuestaServerObtenerTorneos> {
    return this.http.get(`${this.url_ms_negocio}obtenerTorneosActivos`);
  }
  ObtenerTorneosEnCurso(): Observable<RespuestaServerObtenerTorneos> {
    return this.http.get(`${this.url_ms_negocio}obtenerTorneosEnJuego`);
  }
  ObtenerTorneosFinalizados(): Observable<RespuestaServerObtenerTorneos> {
    return this.http.get(`${this.url_ms_negocio}obtenerTorneosfinalizados`);
  }
  ObtenerDatosTorneo_Id(id_torneo: number): Observable<RespuestaServerObtenerDatosTorneo> {
    return this.http.get(`${this.url_ms_negocio}obtenerTorneoPorId/${id_torneo}`);
  }
  RegistrarEquipoTorneo(id_torneo: number, id_equipo: number): Observable<any> {
    const tokenSesion = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.token;
    const id_postgrest = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenSesion}`);
    return this.http.post(`${this.url_ms_negocio}registrarEquipoEnTorneo`, {
      id_equipo,
      id_torneo,
      id_postgrest
    }, { headers: headers });
  }
  ObtenerNumeroIntegrantesEquipoTorneo(id_torneo: number): Observable<RespuestaServer2> {
    return this.http.get(`${this.url_ms_negocio}validarNumeroIntegrantesEquipoTorneo/${id_torneo}`);
  }
  VincularEquipoTorneo(id_equipo: number, id_torneo: number, id_liderEquipo:number): Observable<RespuestaServer2> {
    return this.http.post(`${this.url_ms_negocio}vincularEquipoTorneo`, {
      id_equipo: id_equipo,
      id_torneo: id_torneo,
      id_liderEquipo: id_liderEquipo
    });
  }

  vincularUsuarioTorneo(id_usuario: number, id_torneo: number): Observable<RespuestaServer2> {
    return this.http.post(`${this.url_ms_negocio}vincularUsuarioTorneo`, {
      id_usuario: id_usuario,
      id_torneo: id_torneo
    });
  }

















}
