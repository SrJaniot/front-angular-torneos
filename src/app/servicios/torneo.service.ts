import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';
import { RespuestaServerObtenerTorneos } from '../Modelos/RespuestaServer.ObtenerTorneos.model';


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
    return this.http.get(`${this.url_ms_negocio}obtenerTorneosFinalizados`);
  }









}
