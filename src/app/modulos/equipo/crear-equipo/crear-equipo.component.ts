import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { EquipoService } from '../../../servicios/equipo.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { RespuestaServerCrearEquipo } from '../../../Modelos/RespuestaServer.CrearEquipo.model';
import { NotificacionCorreoService } from '../../../servicios/notificacion-correo.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
})
export class CrearEquipoComponent {
  //variables
  //cargar archivos
  nombreArchivoCargado: String = '';
  cargaArchivoFG: FormGroup = new FormGroup({});
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;

  linkInvitacion: string = '';
  creoEquipo: Boolean = false;





  // variables stepper para que los pasos sean lineales y obligatorios
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private EquipoService: EquipoService,
    private SeguridadService: SeguridadService,
    private NotificacionCorreoService: NotificacionCorreoService,
    private router: Router,
    private toast: NgToastService,


    ) {
  }

  ngOnInit() {
    this.ConstruirFormularioArchivo();
    this.ConstruirFormularioFirstFormGroup();
    this.ConstruirFormularioSecondFormGroup();
    this.ConstruirFormulariothirdFormGroup();
  }

      /** Carga de archivo */

  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }
  ConstruirFormularioFirstFormGroup() {
    this.firstFormGroup = this.fb.group({
      NombreEquipo: ['', [Validators.required]],
      FotoEquipo: ['', [Validators.required]],
    });
  }
  ConstruirFormularioSecondFormGroup() {
    this.secondFormGroup = this.fb.group({
      Descripcion: ['', [Validators.required]],
    });
  }
  ConstruirFormulariothirdFormGroup() {
    this.thirdFormGroup = this.fb.group({
      InvitacionCorreo1: ['',[Validators.email] ],
      InvitacionCorreo2: ['',[Validators.email] ],
      InvitacionCorreo3: ['',[Validators.email] ],
      InvitacionCorreo4: ['',[Validators.email] ],
    });
  }
  get obtenerFgFirstFormGroup() {
    return this.firstFormGroup.controls;
  }
  get obtenerFgSecondFormGroup() {
    return this.secondFormGroup.controls;
  }
  get obtenerFgThirdFormGroup() {
    return this.thirdFormGroup.controls;
  }
  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }

  CargarArchivo() {
        const formData = new FormData();
        formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
        this.EquipoService.CargarArchivoFotoEquipo(formData).subscribe({
          next: (data: any) => {
            console.log(data);
            this.archivoCargado = true;
            this.nombreArchivoCargado = data.file;
            //console.log(this.nombreArchivoCargado);
            //alert("Archivo cargado correctamente.");
            this.toast.success({detail:"EXITO",summary:"Archivo cargado correctamente",duration:5000, position:'topCenter'});

            //asignar el nombre del archivo al campo del formulario del formgroup
            this.firstFormGroup.patchValue({
              FotoEquipo: data.file
            });


          },
          error: (err: any) => {
            //alert("Error cargando el archivo formato no valido o archivo muy pesado.");
            this.toast.error({detail:"ERROR",summary:"Error cargando el archivo formato no valido o archivo muy pesado",duration:5000, position:'topCenter'});
          }
        });
  }
  CuandoSeleccionaArchivo(event: any) {
        if (event.target.files.length > 0) {
          const f = event.target.files[0];
          this.obtenerFgArchivo["archivo"].setValue(f);
          //console.log(f);
          this.CargarArchivo();
        }
  }



  //metodo para enviar el formulario
  EnviarFormulario() {
    //comprueba si los formularios son validos
    if (this.firstFormGroup.invalid) {
      //alert('Formulario invalido');
      this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      return;
    }
    if (this.secondFormGroup.invalid) {
      //alert('Formulario invalido');
      this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      return;
    }
    if (this.thirdFormGroup.invalid) {
      //alert('Formulario invalido por favor ingrese un correo valido en los campos de invitacion');
      this.toast.error({detail:"ERROR",summary:"Formulario invalido por favor ingrese un correo valido en los campos de invitacion",duration:5000, position:'topCenter'});
      return;
    }
    //console.log(this.firstFormGroup.value);
    //console.log(this.secondFormGroup.value);
    //console.log(this.thirdFormGroup.value);
    //Definir variables
    let NombreEquipo = this.firstFormGroup.controls["NombreEquipo"].value;
    let Descripcion = this.secondFormGroup.controls["Descripcion"].value;
    let FotoEquipo = this.firstFormGroup.controls["FotoEquipo"].value;
    let IdLiderEquipo = this.SeguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres;
    //console.log(IdLiderEquipo);
    //console.log(NombreEquipo);
    //console.log(Descripcion);
    //console.log(FotoEquipo);
    let IdLiderEquipoparceado: number;
    try {
      IdLiderEquipoparceado = parseInt(IdLiderEquipo!);
    } catch (error) {
      //alert('Error en el tipo de dato');
      this.toast.error({detail:"ERROR",summary:"Error en el tipo de dato",duration:5000, position:'topCenter'});
      return;
    }

    this.EquipoService.CrearEquipo(NombreEquipo,Descripcion,FotoEquipo,IdLiderEquipoparceado).subscribe({
      next: (respuesta:RespuestaServerCrearEquipo) => {
        //console.log(respuesta);
        if(respuesta.CODIGO == 200){
          //alert('Equipo registrado con exito');
          this.toast.success({detail:"EXITO",summary:"Equipo registrado con exito",duration:5000, position:'topCenter'});
          //console.log(respuesta.DATOS!);
          //capturo el id del equipo y el hash del equipo que viene en la respuesta respuesta.DATOS! como json
          let idEquipo = respuesta.DATOS!.idEquipo;
          let idEquipoParceadoString = idEquipo!.toString();
          let hashEquipo = respuesta.DATOS!.hashEquipo;
          //console.log(idEquipo);
          //console.log(hashEquipo);


          //PENDIENTE CREAR LA LOGICA DE INVITACIONES DE CORREO Y LINK DE INVITACION -----------------------------------------------------------------------
          //TOMAR LOS CORREOS DE LOS INVITADOS Y ENVIARLES UN CORREO CON EL LINK DE INVITACION siempre y cuando el campo no este vacio
          let correo1= this.thirdFormGroup.controls["InvitacionCorreo1"].value;
          let correo2= this.thirdFormGroup.controls["InvitacionCorreo2"].value;
          let correo3= this.thirdFormGroup.controls["InvitacionCorreo3"].value;
          let correo4= this.thirdFormGroup.controls["InvitacionCorreo4"].value;

          let nombreLiderEquipo = this.SeguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.nombre;

          //envia el correo a los invitados que no esten vacios
          if(correo1 != ""){
            //console.log(correo1);
            //enviar correo
            this.NotificacionCorreoService.EnviarCorreoInvitacionJugador(correo1,"Jugador",idEquipoParceadoString,hashEquipo!,NombreEquipo,nombreLiderEquipo!).subscribe({
              next: (respuesta:any) => {
                console.log(respuesta);
              }
            });
            //this.EquipoService.EnviarCorreoInvitacion(correo1, idEquipo, hashEquipo);
          }
          if(correo2 != ""){
            //console.log(correo2);
            //enviar correo
            this.NotificacionCorreoService.EnviarCorreoInvitacionJugador(correo2,"Jugador",idEquipoParceadoString,hashEquipo!,NombreEquipo,nombreLiderEquipo!).subscribe({
              next: (respuesta:any) => {
                console.log(respuesta);
              }
            });

            //this.EquipoService.EnviarCorreoInvitacion(correo2, idEquipo, hashEquipo);
          }
          if(correo3 != ""){
            //console.log(correo3);
            //enviar correo
            this.NotificacionCorreoService.EnviarCorreoInvitacionJugador(correo3,"Jugador",idEquipoParceadoString,hashEquipo!,NombreEquipo,nombreLiderEquipo!).subscribe({
              next: (respuesta:any) => {
                console.log(respuesta);
              }
            });
            //this.EquipoService.EnviarCorreoInvitacion(correo3, idEquipo, hashEquipo);
          }
          if(correo4 != ""){
            //console.log(correo4);
            //enviar correo
            this.NotificacionCorreoService.EnviarCorreoInvitacionJugador(correo4,"Jugador",idEquipoParceadoString,hashEquipo!,NombreEquipo,nombreLiderEquipo!).subscribe({
              next: (respuesta:any) => {
                console.log(respuesta);
              }
            });
            //this.EquipoService.EnviarCorreoInvitacion(correo4, idEquipo, hashEquipo);
          }
          //CREA EL LINK DE INVITACION Y LO COPIA AL PORTAPAPELES
           this.linkInvitacion = "http://localhost:4200/equipo/validar-invitacion-equipo/"+idEquipoParceadoString+"/"+hashEquipo;
          //console.log(linkInvitacion);
          //copiar al portapapeles
          navigator.clipboard.writeText(this.linkInvitacion).then(function() {
            //alert('Link de invitacion copiado al portapapeles');

          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
          this.toast.info({detail:"INFO",summary:"Link de invitacion copiado al portapapeles",duration:5000, position:'topCenter'});

          this.creoEquipo = true;

          //redirigir a la pagina de inicio si el link fue copiado al portapapeles


          //this.router.navigate(['/']);
          //pasa al siguiente paso

        }else{
          //alert('Error al registrar el Equipo');
          this.toast.error({detail:"ERROR",summary:"Error al registrar el Equipo",duration:5000, position:'topCenter'});
        }
      }
    });








  }



  Volverinicio(){
    window.location.href = '/noticias/home';
    }

  copiarLinkInvitacion() {
    navigator.clipboard.writeText(this.linkInvitacion).then(() => {
      console.log('Async: Copying to clipboard was successful!');
      // Muestra tu popup aquí
      //alert('Link de invitacion copiado al portapapeles');
      this.toast.info({detail:"INFO",summary:"Link de invitacion copiado al portapapeles",duration:5000, position:'topCenter'});
    }, (err) => {
      console.error('Async: Could not copy text: ', err);
    });
  }







}




