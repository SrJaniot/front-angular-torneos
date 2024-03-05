import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class NotificacionWhatsappService {

  private url_notificaciones_whatsapp : string = ConfiguracionRutasBackend.urlms_notificaciones_whatsapp;

  constructor(
    private http: HttpClient,

  ) { }




  EnviarMensajeWhatsapp(numeroDestino: string, mensaje: string): any {
    return this.http.post(this.url_notificaciones_whatsapp+'lead', {
      message: mensaje,
      phone: numeroDestino
    });
  }

  
}
