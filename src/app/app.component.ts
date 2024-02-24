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
  id_postgres: string = "";

  constructor(
    private servicioSeguridad: SeguridadService

  ){

  }

  ngOnInit() {
    this.ValidarSesionActiva();
    //console.log(this.sesionActiva)
  }

  ValidarSesionActiva() {
    this.servicioSeguridad.ObteberDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel) => {
        if (datos.token!= "") {
          this.sesionActiva = true;
          this.id_postgres = datos.usuario?.idPostgres!;

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
