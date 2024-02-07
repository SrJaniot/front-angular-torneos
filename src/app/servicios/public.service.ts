import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private url_ms_logica: string = ConfiguracionRutasBackend.urlbackend_mc_logica;

  constructor(
    private http: HttpClient,
  ) { }

  // FUNCION QUE ME PERMITE TRAER LAS CIUDADES
  TraerCiudades():Observable <RespuestaServer>{
    return this.http.get(this.url_ms_logica+ 'obtenerCiudades');
  }


}
