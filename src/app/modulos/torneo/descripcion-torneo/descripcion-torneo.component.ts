import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../servicios/torneo.service';
import { RespuestaServerObtenerDatosTorneo } from '../../../Modelos/RespuestaServer.ObtenerDatosTorneo.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-descripcion-torneo',
  templateUrl: './descripcion-torneo.component.html',
  styleUrl: './descripcion-torneo.component.css'
})
export class DescripcionTorneoComponent {
  //variables parte 1 general
  foto_torneo: string = "";
  nombre_torneo: string = "";
  resumen_torneo: string = "";
  video_torneo?: SafeResourceUrl ;
  //variables parte 2 informacion
  informacion_general_torneo: string = "";
  informacion_reglas_torneo: string = "";
  //variables premios
  descripcion_premio_1: string = "";
  foto_premio_1: string = "";
  descripcion_premio_2: string = "";
  foto_premio_2: string = "";
  descripcion_premio_3: string = "";
  foto_premio_3: string = "";

  id_evento: number = 0;






  constructor(
    private route: ActivatedRoute,
    private TorneoService: TorneoService,
    private router: Router,
    private sanitizer: DomSanitizer,


  ){}

  ngOnInit(): void {
    //capturamos el id del equipo de la url
    let id = this.route.snapshot.params['id_torneo'];
    //console.log(id);
    let datos = this.TorneoService.ObtenerDatosTorneo_Id(id).subscribe(
      (respuesta: RespuestaServerObtenerDatosTorneo) => {
        //console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          this.CapturarParametrosHtml(respuesta);
          //console.log(this.id_evento);
        }else{
          //console.log(respuesta);
          this.router.navigate(['/noticias/error404']);
        }
      }
    );

  }

  CapturarParametrosHtml(respuesta: RespuestaServerObtenerDatosTorneo) {
    //parte 1
    this.foto_torneo= respuesta.DATOS?.foto_torneo!;
    this.nombre_torneo= respuesta.DATOS?.nom_torneo!;
    this.resumen_torneo= respuesta.DATOS?.desc_torneo!;
    this.video_torneo= this.sanitizer.bypassSecurityTrustResourceUrl(respuesta.DATOS?.video_explica_torneo!);
    //parte 2
    this.informacion_general_torneo= respuesta.DATOS?.informacion_general!;
    this.informacion_reglas_torneo= respuesta.DATOS?.informacion_reglas!;
    //parte 3
    this.descripcion_premio_1= respuesta.DATOS?.premio_torneo_1!;
    this.foto_premio_1= respuesta.DATOS?.foto_premio_torneo_1!;
    this.descripcion_premio_2= respuesta.DATOS?.premio_torneo_2!;
    this.foto_premio_2= respuesta.DATOS?.foto_premio_torneo_2!;
    this.descripcion_premio_3= respuesta.DATOS?.premio_torneo_3!;
    this.foto_premio_3= respuesta.DATOS?.foto_premio_torneo_3!;
    //id evento
    this.id_evento= respuesta.DATOS?.id_evento!;
  }

  //funcion para el boton registrate
  RegistrarseEvento(){
    //console.log(this.id_evento);
    this.TorneoService.RegistrarAsistenciaEvento(this.id_evento).subscribe(
      (respuesta:any) => {
        //console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          alert('Te has registrado correctamente');
        } else {
          alert('No se pudo registrar');
        }
      }
    );
  }




















  // variable para el cambio de tabs
  activeTab: string = 'info';
  changeTab(tab: string) {
      this.activeTab = tab;
      console.log(this.activeTab);
  }

}
