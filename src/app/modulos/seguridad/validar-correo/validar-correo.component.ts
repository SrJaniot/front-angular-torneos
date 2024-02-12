import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute } from '@angular/router';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import e from 'express';

@Component({
  selector: 'app-validar-correo',
  templateUrl: './validar-correo.component.html',
  styleUrl: './validar-correo.component.css'
})
export class ValidarCorreoComponent {
  validado = false;
  hash: string = '';

  constructor(
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit( ) {
    this.hash = this.route.snapshot.params["hash"];
    console.log(this.hash);
    this.ValidarHash();
  }

  ValidarHash(){
    this.servicioSeguridad.ValidarHashCorreopublico(this.hash).subscribe({
      next: (response:RespuestaServer) => {
        if(response.CODIGO == 200){
          this.validado = true;
        }
        error: (error:RespuestaServer) => {
          console.log(error);
        }
      }
    })
  }

}
