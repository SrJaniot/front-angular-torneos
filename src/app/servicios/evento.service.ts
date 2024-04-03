import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerEventos } from '../Modelos/RespuestaServerObtenerEventos.model';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServerObtenerDatosEvento } from '../Modelos/RespuestaServerObtenerDatosEvento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;

  constructor(
    private http: HttpClient,


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













}
