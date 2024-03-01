import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar-invitacion-equipo',
  templateUrl: './validar-invitacion-equipo.component.html',
  styleUrl: './validar-invitacion-equipo.component.css'
})
export class ValidarInvitacionEquipoComponent {
  idEquipo: string = '';
  hashEquipo: string = '';


  constructor(
    private route: ActivatedRoute
  ) {
  }
  ngOnInit( ) {
    this.idEquipo = this.route.snapshot.params["idEquipo"];
    this.hashEquipo = this.route.snapshot.params["hashEquipo"];
    console.log(this.idEquipo);
    console.log(this.hashEquipo);
  }
}
