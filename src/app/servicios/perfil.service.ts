import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private url_ms_negocio: string = ConfiguracionRutasBackend.urlbackend_mc_logica;




  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,

  ) { }

  /**
   * metodo para obtener el perfil del usuario
   * @param id
   * @returns
   */
  ObtenerPerfil(id: number){
    return this.http.get(this.url_ms_negocio + 'ObtenerJugador/' + id);
  }

  /**
   * metodo para guardar la foto de perfil del usuario en la carpeta Archivos/fotosPerfil
   * @param formData
   * @returns
   */
  CargarArchivoFotoUsuario(formData: FormData): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-fotoUsuario`, formData);
  }

  /**
   * Funcion para actualizar la foto de perfil del usuario
   * @param id_jugador
   * @param url_Foto
   * @returns
   */
  ActualizarFotoPerfilUsuario(id_jugador: number, url_Foto: String, token: String): Observable<RespuestaServer> {
    const tokenSesion = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenSesion}`);
    return this.http.post(`${this.url_ms_negocio}ActualizarFotoJugador`, {
      id_jugador : id_jugador,
      url_Foto: url_Foto,
      token: token
    }, { headers: headers});
  }




}
