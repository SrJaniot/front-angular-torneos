import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { EquipoService } from '../../../servicios/equipo.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { RespuestaServerCrearEquipo } from '../../../Modelos/RespuestaServer.CrearEquipo.model';


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





  // variables stepper para que los pasos sean lineales y obligatorios
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private EquipoService: EquipoService,
    private SeguridadService: SeguridadService,

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
            alert("Archivo cargado correctamente.");

            //asignar el nombre del archivo al campo del formulario del formgroup
            this.firstFormGroup.patchValue({
              FotoEquipo: data.file
            });


          },
          error: (err: any) => {
            alert("Error cargando el archivo formato no valido o archivo muy pesado.");
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
      alert('Formulario invalido');
      return;
    }
    if (this.secondFormGroup.invalid) {
      alert('Formulario invalido');
      return;
    }
    if (this.thirdFormGroup.invalid) {
      alert('Formulario invalido por favor ingrese un correo valido en los campos de invitacion');
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
      alert('Error en el tipo de dato');
      return;
    }

    this.EquipoService.CrearEquipo(NombreEquipo,Descripcion,FotoEquipo,IdLiderEquipoparceado).subscribe({
      next: (respuesta:RespuestaServerCrearEquipo) => {
        //console.log(respuesta);
        if(respuesta.CODIGO == 200){
          alert('Equipo registrado con exito');
          //console.log(respuesta.DATOS!);
          //capturo el id del equipo y el hash del equipo que viene en la respuesta respuesta.DATOS! como json
          let idEquipo = respuesta.DATOS!.idEquipo;
          let hashEquipo = respuesta.DATOS!.hashEquipo;
          //console.log(idEquipo);
          //console.log(hashEquipo);

          //PENDIENTE CREAR LA LOGICA DE INVITACIONES DE CORREO Y LINK DE INVITACION -----------------------------------------------------------------------
          


        }else{
          alert('Error al registrar el Equipo');
        }
      }
    });








  }









}




