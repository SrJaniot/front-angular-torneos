import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-idenificar-codigo-towfa',
  templateUrl: './idenificar-codigo-towfa.component.html',
  styleUrl: './idenificar-codigo-towfa.component.css'
})
export class IdenificarCodigoTowfaComponent {


  // variables
  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 5,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  usuarioId: string = '';

  // constructor que me permite inicializar las variables
  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
   ){ }

  ngOnInit() {
    let datos =this.servicioSeguridad.ObteberDatosLocalStorage_USUARIO();
    let datosSesion =this.servicioSeguridad.ObtenerDatosUsuarioIdentificadoSESION();
    console.log(datos);
    console.log(datosSesion);
    if(datos != null && datosSesion === null){
      this.usuarioId = datos._id!;
    }else{
      localStorage.removeItem('datosUsuario');
      localStorage.removeItem('datosSesion');
      this.router.navigateByUrl('/seguridad/login');
    }

  }

  onOtpChange(event: any) {
    this.otp = event;
    console.log(this.otp);
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if(this.otp.length == this.configOptions.length) {
      //console.log(this.usuarioId);
      //console.log(this.otp);
       this.servicioSeguridad.IdentificarUsuarioCODIGO2fa(this.usuarioId, this.otp).subscribe((response) => {
        if(response.CODIGO == 200){
          //console.log('Usuario identificado');
          console.log(response);
          //alert('Usuario identificado');
          this.servicioSeguridad.AlmacenarDatosUsuarioIdentificadoSESION(response);
          window.location.href = '/noticias/home';


          //console.log(response.DATOS);
          //this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(response);
          //this.router.navigateByUrl('/dashboard');
        }else{
          console.log(response);
          alert('Error al identificar el usuario');
          //console.log('Error al identificar el usuario');
        }
      });

    }
  }


  volver(){
    // eliminar el usuario identificado del localstorage
    localStorage.removeItem('datosUsuario');
    this.router.navigateByUrl('/seguridad/login');
  }






}
