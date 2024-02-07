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
   

  IdentificarUsuario(usuario: string, clave: string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'identificar-usuario',{
      correo: usuario,
      clave: clave
    });
  }



}
