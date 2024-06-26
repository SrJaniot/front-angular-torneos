import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { PublicService } from '../../../servicios/public.service';
import e, { response } from 'express';

// libreria para mandar la clave encriptada "npm install crypto-js" y "npm i --save-dev @types/crypto-js"
import {MD5} from 'crypto-js';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // variables
  fGroup: FormGroup= new FormGroup({});
  fGroup2: FormGroup= new FormGroup({});
  ciudades: any[] = [];
  tipos_Documentos: any[] = [];



  // constructor que me permite inicializar las variables
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicioPublic: PublicService,
    private router: Router,
    private toast: NgToastService,

   ){ }
  // funcion que se ejecuta cuando se inicializa el componente
  ngOnInit() {
    setTimeout(() => {
      //pantalla de animacion de carga
      console.log('Carga completada');
      const loadingElement = document.querySelector('.loading');
      if (loadingElement) {
        loadingElement.classList.remove('loading');
      }
    }, 2000); // Ajusta este valor según la duración de tu animación de carga
    //llenar el conbobox de ciudades
    this.servicioPublic.TraerCiudades().subscribe(response =>{
      if(response.CODIGO == 200){
        this.ciudades = response.DATOS!;
        console.log(this.ciudades);
      }
    });
    //llenar el conbobox de tipos de documentos
    this.servicioPublic.TraerTiposDocumentos().subscribe(response =>{
      if(response.CODIGO == 200){
        this.tipos_Documentos = response.DATOS!;
        console.log(this.tipos_Documentos);
      }
    });



    // construir el formulario
    this.ConstriurFormulariologin();
    this.ConstriurFormularioregister();
    //funcion que valida que el usuario no este en localstorage
    let datos =this.servicioSeguridad.ObteberDatosLocalStorage_USUARIO();
    if(datos != null){
      this.router.navigateByUrl('/seguridad/codigo-2fa');
    }
  }

    // funcion que me permite construir el formulario con las variables que se van a utilizar.
    //formulario login
    ConstriurFormulariologin() {
      this.fGroup = this.fb.group({
        usuario: ['',[Validators.required,]],
        clave: ['',[Validators.required,]],
      });
    }
    //formulario register
    ConstriurFormularioregister() {
      this.fGroup2 = this.fb.group({
        nombre: ['',[Validators.required,]],
        nickname: ['',[Validators.required,]],
        edad: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
        ciudad: ['',[Validators.required,]],
        email: ['',[Validators.required, Validators.email,]],
        celular: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
        clave: ['',[Validators.required,]],
        tipo_documento: ['',[Validators.required,]],
        numero_documento: ['',[Validators.required,]],
      });
    }
    // funcion que me permite enviar el formulario login

    EnviarLogin(){
      if (this.fGroup.invalid) {
        //console.log('Formulario invalido');
        return;
      }else{
        let usuario = this.fGroup.controls['usuario'].value;
        let clave = this.fGroup.controls['clave'].value;
        let claveEncriptada = MD5(clave).toString();
        //console.log(usuario);
        //console.log(clave);
        this.servicioSeguridad.IdentificarUsuario(usuario,claveEncriptada).subscribe({
          next: (respuesta:RespuestaServer) => {
            //console.log(respuesta);
            if(respuesta.CODIGO == 200){
              //alert('Usuario identificado con exito');
              this.toast.success({detail:"EXITO",summary:"Usuario identificado con exito",duration:5000, position:'topCenter'});
              console.log(respuesta.DATOS);
              localStorage.removeItem('datosUsuario');
              localStorage.removeItem('datosSesion');
              if (this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(respuesta)){
                this.router.navigate(['/seguridad/codigo-2fa']);
              }else{
                //alert('Error al identificar el usuario, ya existe un usuario identificado en el sistema');
                this.toast.error({detail:"ERROR",summary:"Error al identificar el usuario, ya existe un usuario identificado en el sistema",duration:5000, position:'topCenter'});
              }

            }else{
              //alert('Error al identificar el usuario');
              this.toast.error({detail:"ERROR",summary:"Error al identificar el usuario",duration:5000, position:'topCenter'});
            }

      }
    });
    }
  }
  //funcion que me permite enviar el formulario register
  EnviarRegister(){
    //console.log('enviando formulario');
    if (this.fGroup2.invalid) {
      //console.log('Formulario invalido');
      //alert('Formulario invalido');
      this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      return;
    }else{
      let nombre = this.fGroup2.controls['nombre'].value;
      let nickname = this.fGroup2.controls['nickname'].value;
      let edad = this.fGroup2.controls['edad'].value;
      let ciudad = this.fGroup2.controls['ciudad'].value;
      let email = this.fGroup2.controls['email'].value;
      let celular = this.fGroup2.controls['celular'].value;
      let clave = this.fGroup2.controls['clave'].value;
      let tipo_documento = this.fGroup2.controls['tipo_documento'].value;
      let numero_documento = this.fGroup2.controls['numero_documento'].value;
      //validar el tipo de dato
      //console.log(typeof(edad));
      //console.log(typeof(ciudad));
      try {
        edad = parseInt(edad);
        ciudad = parseInt(ciudad);
        tipo_documento = parseInt(tipo_documento);

      } catch (error) {
        //alert('Error en el tipo de dato');
        this.toast.error({detail:"ERROR",summary:"Error en el tipo de dato",duration:5000, position:'topCenter'});
        return;
      }

      //console.log(typeof(edad));
      //console.log(typeof(ciudad));
      //console.log(nombre);
      //console.log(nickname);
      //console.log(edad);
      //console.log(ciudad);
      //console.log(email);
      //console.log(celular);
      //console.log(clave);
      //console.log(tipo_documento);
      //console.log(numero_documento);
      this.servicioSeguridad.RegistrarUsuario(nombre,edad,celular,email,ciudad,nickname,clave,tipo_documento,numero_documento).subscribe({
        next: (respuesta:RespuestaServer) => {
          console.log(respuesta);
          if(respuesta.CODIGO == 200){
            //alert('Usuario registrado con exito');
            this.toast.success({detail:"EXITO",summary:"Usuario registrado con exito",duration:5000, position:'topCenter'});
            this.deactivateRightPanel();
          }else{
            //alert('Error al registrar el usuario');
            this.toast.error({detail:"ERROR",summary:"Error al registrar el usuario",duration:5000, position:'topCenter'});
          }
        }
      });

    }
  }

  //funcion que me permite obtener los controles del formulario
  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
  get obtenerFormGroup2(){
    return this.fGroup2.controls;
  }



//funcion que me permite activar y desactivar el panel derecho----------------------------------------------------------------
































  rightPanelActive = false;

  activateRightPanel(): void {
    this.rightPanelActive = true;
  }

  deactivateRightPanel(): void {
    this.rightPanelActive = false;
  }


}
