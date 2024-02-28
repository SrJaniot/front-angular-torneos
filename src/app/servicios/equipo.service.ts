import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { SeguridadService } from './seguridad.service';
import { RespuestaServerCrearEquipo } from '../Modelos/RespuestaServer.CrearEquipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;


  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,

  ) { }



  CargarArchivoFotoEquipo(formData: FormData): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-fotoEquipo`, formData);
  }

  CrearEquipo(NombreEquipo: string, descripcionEquipo: string, foto_Equipo: string, idLiderEquipo: Number): Observable<RespuestaServerCrearEquipo> {
    return this.http.post(`${this.url_ms_negocio}crearEquipo`, {
      nomEquipo: NombreEquipo,
      descEquipo: descripcionEquipo,
      fotoEquipo:foto_Equipo,
      liderEquipo:idLiderEquipo,
      // id game  en 1 por defecto ya que solo se maneja un juego (league of legends)
      idGame: 1

    });
  }





}
