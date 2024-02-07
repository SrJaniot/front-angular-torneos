import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // variables
  fGroup: FormGroup= new FormGroup({});

  // constructor que me permite inicializar las variables
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
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
    // construir el formulario
    this.ConstriurFormulario();
  }

    // funcion que me permite construir el formulario con las variables que se van a utilizar.
    //formulario login
    ConstriurFormulario() {
      this.fGroup = this.fb.group({
        usuario: ['',[Validators.required,]],
        clave: ['',[Validators.required,]],
      });
    }
    // funcion que me permite enviar el formulario
    
    EnviarLogin(){
      if (this.fGroup.invalid) {
        //console.log('Formulario invalido');
        return;
      }else{
        let usuario = this.fGroup.controls['usuario'].value;
        let clave = this.fGroup.controls['clave'].value;
        //console.log(usuario);
        //console.log(clave);
        this.servicioSeguridad.IdentificarUsuario(usuario,clave).subscribe({
          next: (respuesta:RespuestaServer) => {
            console.log(respuesta);
      }
    });
    }
  }



    get obtenerFormGroup(){
      return this.fGroup.controls;
    }


































  rightPanelActive = false;

  activateRightPanel(): void {
    this.rightPanelActive = true;
  }

  deactivateRightPanel(): void {
    this.rightPanelActive = false;
  }


}
