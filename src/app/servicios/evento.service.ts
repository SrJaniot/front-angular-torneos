import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerEventos } from '../Modelos/RespuestaServerObtenerEventos.model';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServerObtenerDatosEvento } from '../Modelos/RespuestaServerObtenerDatosEvento.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,


  ) { }

  ObtenerEventosActivos(): Observable<RespuestaServerObtenerEventos> {
    return this.http.get(this.url_ms_negocio + 'obtenerEventosActivos');
  }
  ObtenerEventosEnCurso(): Observable<RespuestaServerObtenerEventos> {
    return this.http.get(this.url_ms_negocio + 'obtenerEventoEnCurso');
  }
  ObtenerEventosFinalizados(): Observable<RespuestaServerObtenerEventos> {
    return this.http.get(this.url_ms_negocio + 'obtenerEventosfinalizados');
  }
  ObtenerDatosEventos_Id(id_torneo: number): Observable<RespuestaServerObtenerDatosEvento> {
    return this.http.get(`${this.url_ms_negocio}obtenerEventoPorId/${id_torneo}`);
  }

  RegistrarAsistenciaEvento(id_evento: number): any {
    const id_postgrest = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    //convierte el id_postgrest a entero
    let id_postgrest_entero = parseInt(id_postgrest!);
    return this.http.post(this.url_ms_negocio+'registrarAsistenciaEvento', {
      id_evento: id_evento,
      id_usuario: id_postgrest_entero
    });
  }

  ValidarAforoEvento(id_torneo: number): Observable<RespuestaServerObtenerDatosEvento> {
    return this.http.get(`${this.url_ms_negocio}validarAforoEvento/${id_torneo}`);
  }














}
