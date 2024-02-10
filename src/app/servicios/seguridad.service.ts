import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { UsuarioLogin } from '../Modelos/UsuarioLogin.model';
import { UsuarioValidadoModel } from '../Modelos/UsuarioValidado.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private url_ms_seguridad: string = ConfiguracionRutasBackend.urlbackend_mc_seguridad;

  constructor(
    private http: HttpClient,


  ) {
    this.validacionDeSesion();

   }



   /**
    * metodo para identificar el usuario en el sistema el cual recibe el usuario y la clave genera un code2fa
    * @param usuario
    * @param clave
    * @returns
    */
  IdentificarUsuario(usuario: string, clave: string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'identificar-usuario',{
      correo: usuario,
      clave: clave
    });
  }

  /**
   * metodo para registrar un usuario en el sistema
   * @param nombre
   * @param edad
   * @param celular
   * @param correo
   * @param id_ciudad
   * @param nickname_jugador
   * @param clave
   * @returns
   */
  RegistrarUsuario(nombre: string, edad: number, celular: string, correo: string, id_ciudad: number, nickname_jugador: string, clave:string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'funcion-inserta-usuario-jugador-datos-personales',{
      nombre: nombre,
      edad: edad,
      celular: celular,
      correo: correo,
      foto_perfil_jugador: "sinfoto.jpg",
      id_ciudad: id_ciudad,
      nickname_jugador: nickname_jugador,
      liga_jugador: "SIN LIGA",
      link_cuenta_jugador: "NO VERIFICADO",
      id_game: 1, //ESTE VALOR DEBE SER DINAMICO POR EL MOMENTO SE DEJA FIJO EN 1 = LEAGUE OF LEGENDS
      clave: clave
    });

  }
  /**
   * metodo para almacenar los datos del usuario identificado en el localstorage
   * @param datosUsuario
   * @returns
   */
  AlmacenarDatosUsuarioIdentificado(datosUsuario: RespuestaServer):boolean {
    let cadena =JSON.stringify(datosUsuario.DATOS);
    let datosLS= localStorage.getItem('datosUsuario');
    if (datosLS){
      console.log('Ya existe un usuario identificado');

      return false;

    }else{
      localStorage.setItem('datosUsuario', cadena);
      console.log('Usuario identificado almacenado');
      //this.validacionDeSesion(); //actualiza el comportamiento del usuario es decir actualiza el observable "la barra de navegacion"
      //alert("Usuario identificado");
      return true;
    }
  }

  ObteberDatosLocalStorage_USUARIO(): UsuarioLogin | null{
    let datosLS = localStorage.getItem('datosUsuario');
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }




  /**
   * metodo para identificar el usuario en el sistema el cual recibe el usuario y la clave genera un code2fa
   * @param _id
   * @param codigo2fa
   * @returns
   */
  IdentificarUsuarioCODIGO2fa(_id: string, codigo2fa: string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'verificar-2fa',{
      usuarioId: _id,
      codigo2fa: codigo2fa
    });
  }

  /**
   * metodo para almacenar los datos del usuario identificado en el localstorage
   * @param datosUsuario
   * @returns
   */
  AlmacenarDatosUsuarioIdentificadoSESION(datosUsuario: RespuestaServer):boolean {
    let cadena =JSON.stringify(datosUsuario.DATOS);
    let datosLS= localStorage.getItem('datosSesion');
    if (datosLS){
      console.log('Ya existe un usuario identificado');

      return false;

    }else{
      localStorage.setItem('datosSesion', cadena);
      console.log('Usuario identificado almacenado');
      this.validacionDeSesion(); //actualiza el comportamiento del usuario es decir actualiza el observable "la barra de navegacion"
      //alert("Usuario identificado");
      return true;
    }
  }
  /**
   *  metodo para obtener los datos del usuario identificado en el sistema
   * @returns UsuarioValidadoModel | null
   */
  ObtenerDatosUsuarioIdentificadoSESION(): UsuarioValidadoModel | null{
    let datosLS = localStorage.getItem('datosSesion');
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }

  /**
   * metodo para remover los datos del usuario identificado en el sistema y cie
   */
  RemoverDatosUsuarioValidado(){
    let datosLS = localStorage.getItem('datosSesion');
    let datosLS2 = localStorage.getItem('datosUsuario');
    if (datosLS && datosLS2) {
      let sesion=this.ObtenerDatosUsuarioIdentificadoSESION();
      this.SerrarSesion(sesion?.usuario?._id!,sesion?.token!).subscribe((respuesta:RespuestaServer)=>{
        if (respuesta.CODIGO == 200) {
          console.log('Sesion cerrada en angular y en el backend');
          localStorage.removeItem('datosSesion');
          localStorage.removeItem('datosUsuario');
          this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
        }else{
          console.log('Error al cerrar la sesion');
        }
      });
    }
  }

  SerrarSesion(id_usuario: string ,token: string):Observable <RespuestaServer> {
    return this.http.post(this.url_ms_seguridad + 'cerrar-sesion',{
      id_usuario: id_usuario,
      token: token
    });
  }




  /**
   * Obtiene los datos de la sesion del usuario
   * @returns datos de la sesion del usuario
   */
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  ObteberDatosSesion(): Observable<UsuarioValidadoModel> {

    return this.datosUsuarioValidado.asObservable();


}

validacionDeSesion(){
  let datosLS = localStorage.getItem('datosSesion');
  if (datosLS) {
    let objUsuario= JSON.parse(datosLS);
    this.ActualizarComportamientoUsuario(objUsuario);
    return true;
  } else {
    return false;
  }
}

ActualizarComportamientoUsuario(datos:UsuarioValidadoModel){
  //console.log(this.datosUsuarioValidado);
  return this.datosUsuarioValidado.next(datos);
}











}
