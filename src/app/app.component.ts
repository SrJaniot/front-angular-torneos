import { Component } from '@angular/core';
import { SeguridadService } from './servicios/seguridad.service';
import { UsuarioValidadoModel } from './Modelos/UsuarioValidado.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // variables
  title = 'Torneos';
  status = true;
  sesionActiva= false;

  constructor(
    private servicioSeguridad: SeguridadService

  ){

  }

  ngOnInit() {
    this.ValidarSesionActiva();
  }

  ValidarSesionActiva() {
    this.servicioSeguridad.ObteberDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel) => {
        if (datos.token!= "") {
          this.sesionActiva = true;

        }else{
          this.sesionActiva = false;

        }
        //console.log(datos);

      },
      error: (error:any) => {
        //console.log(error);
        this.sesionActiva = false;
      }
    });


  }










addToggle()
{
  this.status = !this.status;
}


}
