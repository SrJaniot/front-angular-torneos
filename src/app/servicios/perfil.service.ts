import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;



  constructor(
    private http: HttpClient,

  ) { }

  /**
   * metodo para obtener el perfil del usuario
   * @param id
   * @returns
   */
  ObtenerPerfil(id: number){
    return this.http.get(this.url_ms_negocio + 'ObtenerJugador/' + id);
  }



}
