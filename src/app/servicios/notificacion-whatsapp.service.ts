import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class NotificacionWhatsappService {

  private url_notificaciones_whatsapp : string = ConfiguracionRutasBackend.urlbackend_mc_logica;

  constructor(
    private http: HttpClient,

  ) { }




  EnviarMensajeWhatsapp(numeroDestino: string, mensaje: string): any {
    return this.http.post(this.url_notificaciones_whatsapp+'lead', {
      mensaje: mensaje,
      phone: numeroDestino
    });
  }

  EnviarMensajeWhatsappArchivo(numeroDestino: string, mensaje: string, mediaUrl: string): any {
    return this.http.post(this.url_notificaciones_whatsapp+'mensaje-con-archivo', {
      mensaje: mensaje,
      phone: numeroDestino,
      mediaUrl: mediaUrl
    });
  }



}
