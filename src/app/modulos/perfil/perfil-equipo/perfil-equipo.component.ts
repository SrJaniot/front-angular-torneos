import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilEquipo } from '../../../Modelos/RespuestaServer.PerfilEquipo.model';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.component.html',
  styleUrl: './perfil-equipo.component.css'
})
export class PerfilEquipoComponent {

  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private PerfilService: PerfilService,


  ) { }

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['idEquipo'];
    //console.log(idEquipo);
    let datos = this.PerfilService.ObtenerPerfilEquipo(id);
    datos.subscribe((respuesta: RespuestaServerPerfilEquipo) => {
      if (respuesta.CODIGO == 200) {
        console.log(respuesta);
      }
      else {
        this.Router.navigate(['/error404']);

      }

    });
  }

}
