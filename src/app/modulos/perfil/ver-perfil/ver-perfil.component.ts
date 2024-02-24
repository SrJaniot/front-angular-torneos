import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../servicios/perfil.service';
import { RespuestaServerPerfilUsuario } from '../../../Modelos/RespuestaServer.PerfilUsuario.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { SeguridadService } from '../../../servicios/seguridad.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogDataExampleDialogComponent } from '../../../publico/dialog-data-example-dialog/dialog-data-example-dialog.component'; ;



@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent {
  //variables
  //parametros del perfil html
  estado_jugador?: boolean;
  foto_equipo?: string;
  foto_perfil?: string;
  id_datos?: number;
  id_game?: number;
  id_jugador?: number;
  liga_jugador?: string;
  link_cuenta_jugador?: string;
  nickname_jugador?: string;
  nom_equipo?: string;
  id_equipo?: number;
  link_perfil_equipo?: string;

  //lista de respuestas aleatorias para Sexo
  sexo?: string;
  troll?: string;


  text? :string ;
  displayedText = '';
  i = 0;
  speed = 10; // Ajusta la velocidad de la "escritura"


  //cargar archivos
  nombreArchivoCargado: String = '';
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;

  //logica de las fotos
  DuenoDelPerfil: boolean = false;





  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private seguridadService: SeguridadService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el ID de los parámetros de la ruta y realiza una llamada al servicio de perfil para obtener los datos del perfil correspondiente.
   */
  ngOnInit(): void {
    //variables
    let id = this.route.snapshot.params['id'];
    //lista de respuestas aleatorias para Sexo
    const lista_sexo = ['Mucho', 'Poco', 'Nunca', 'Siempre 😏', 'A veces', 'Casi siempre', 'Casi nunca', 'Regularmente', 'Raravez', 'Frecuentemente 😏', 'Ocasionalmente', 'Continuamente', 'Si 😏', 'Esporádicamente', 'Ayer', 'Mañana 😏', 'No', 'Rara veces'];
    //lista de respuestas aleatorias para Troll
    const lista_troll = ['Juega teemo ad', 'Se va afk', 'Flamea', '0/15 al minuto 10', 'Se rinde', 'No ayuda','gg report jg','Tranquilos, soy smurf'];
    //contenido sobre mi
    const lista_sobre_mi = [
      '¡Hola! Soy un apasionado de League of Legends, siempre buscando destacar en la grieta del invocador con mi juego estratégico y mi sentido del humor a veces un poco ácido. Sé que puedo ser un poco intenso en mis comentarios, ¡pero es solo porque estoy tan comprometido con la victoria! Aunque suene cliché, siempre tengo en mente encontrar a alguien que comparta mi pasión por el juego, aunque admito que en ocasiones subestimo el potencial de las mujeres en el juego. Pero ¿quién sabe? Tal vez en una de estas partidas, encuentre a alguien que me haga cambiar de opinión y conquiste mi corazón tanto como mi liga.',
       "¡Saludos, invocadores! Soy un entusiasta de League of Legends que siempre está listo para lanzarse a la grieta del invocador y dejar mi huella. Soy conocido por mi juego agresivo y mi lengua afilada, especialmente cuando las cosas no van como quiero. Pero, en el fondo, sé que el verdadero desafío está en encontrar a alguien que pueda igualar mi pasión por el juego y desafiarme a ser mejor. Aunque a veces tiendo a subestimar a las mujeres en el juego, estoy abierto a la idea de que puedan sorprenderme. Así que, ¿quién sabe? Tal vez en una partida casual encuentre a esa persona especial que me haga reconsiderar mis ideas preconcebidas y que me acompañe en el camino hacia la victoria, tanto en el juego como en el amor.",
       '¡Ey, soy ese tipo de jugador de League of Legends que siempre tiene algo que decir, ya sea antes, durante o después de la partida! Soy conocido por mi habilidad para criticar cada movimiento de mis compañeros de equipo y por lanzar comentarios sarcásticos a diestra y siniestra. A veces, puedo ser un poco... ¿cómo decirlo? Directo, especialmente cuando veo que alguien no está jugando como debería. No me sorprende si digo algo como "¡Claro, vamos mal, tenemos a una mujer en el equipo!" o "¿Qué haces en top? ¡Ve a supportear como Dios manda!" No es que realmente lo piense, ¡es solo la frustración hablando! Pero, al final del día, estoy aquí para ganar y disfrutar, ¡así que prepárate para un torrente de comentarios y retos 1 vs 1 después de cada partida!',
       '¡Saludos, invocadores! Soy ese jugador de League of Legends que nunca se queda callado, tanto dentro como fuera de la grieta del invocador. Siempre tengo una opinión sobre todo y no me detengo en expresarla, ya sea criticando las elecciones de campeones de mis compañeros de equipo o burlándome de los errores del enemigo. No puedo evitar soltar comentarios del tipo "¿En serio, una mujer en el equipo? Ahí está el problema" o "¡No, no, no, eso no es cómo se juega esa línea, niña!" No, lo hago con malas intenciones, ¡solo quiero ganar y  se me escapan las palabras! A pesar de todo, soy un compañero leal y estoy siempre buscando mejorar y ganar, así que prepárate para algunas risas y tal vez algunos roces en el camino hacia la victoria.',
       '¡Hola, comunidad de League of Legends! Soy ese jugador que nunca se cansa de expresar su opinión, ya sea durante la partida o después de ella. Siempre estoy rápido para señalar los errores de mis compañeros de equipo y no me detengo en enviarles algunos mensajes después de la partida para recordárselos. ¿Por qué? Porque no solo soy un jugador exigente, ¡sino también un ganador insaciable! Después de una partida, es probable que te encuentres con una solicitud de amistad de mi parte, solo para que pueda flamearte y humillarte aún más por tu mal desempeño. Y por supuesto, no puedo evitar desafiarte a un 1 vs 1 para demostrarte quién manda realmente en la grieta del invocador. Pero te advierto, suelo terminar humillado, ¡así que prepárate para una buena dosis de humildad!'
      ]

    let datos=this.perfilService.ObtenerPerfil(id).subscribe(
      (respuesta:RespuestaServerPerfilUsuario)=>{
        console.log(respuesta);
        //console.log(respuesta?.DATOS?.[0]?.fun_get_jugador_id_perfil?.liga_jugador);

        if(respuesta.CODIGO==200){
          this.CapturarParametrosHtml(respuesta);
          //console.log(this.estado_jugador);
          this.sexo = lista_sexo[Math.floor(Math.random() * lista_sexo.length)];
          this.troll = lista_troll[Math.floor(Math.random() * lista_troll.length)];
          this.text = lista_sobre_mi[Math.floor(Math.random() * lista_sobre_mi.length)];
          this.typeWriter();

          //construir el formulario de carga de archivos
          this.ConstruirFormularioArchivo();
          if (id == this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.idPostgres) {
            this.DuenoDelPerfil = true;
          }


        }
        else{
          this.router.navigate(['/error404']);
        }

        }
    );
  }

    /** Carga de archivo */

    ConstruirFormularioArchivo() {
      this.cargaArchivoFG = this.fb.group({
        archivo: ['', []]
      });
    }

    get obtenerFgArchivo() {
      return this.cargaArchivoFG.controls;
    }

    CargarArchivo() {
      const formData = new FormData();
      formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
      this.perfilService.CargarArchivoFotoUsuario(formData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.nombreArchivoCargado = data.file;
          //this.obtenerFgDatos["foto"].setValue(this.nombreArchivoCargado);
          let nombredelarchivo = this.nombreArchivoCargado;
          //console.log(nombredelarchivo);
          let id_jugador = this.id_jugador;
          console.log(id_jugador);
          let token = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.token;
          //console.log(token);
          this.perfilService.ActualizarFotoPerfilUsuario(id_jugador!, nombredelarchivo, token! ).subscribe({
            next: (data: RespuestaServer) => {
              if (data.CODIGO == 200) {
                alert(data.MENSAJE);
                location.reload();

              }else if (data.CODIGO == 401) {
                alert(data.MENSAJE);

              }

            },
            error: (err: any) => {
              console.log(err);
            }
          });

          this.archivoCargado = true;
          alert("Archivo cargado correctamente.");
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





  CapturarParametrosHtml(datos: RespuestaServerPerfilUsuario) {
    //capturar los parametros del html
    this.estado_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.estado_jugador;
    this.foto_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.foto_equipo;
    this.foto_perfil = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.foto_perfil;
    this.id_datos = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_datos;
    this.id_game = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_game;
    this.id_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_jugador;
    this.liga_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.liga_jugador;
    this.link_cuenta_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.link_cuenta_jugador;
    this.nickname_jugador = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nickname_jugador;
    this.nom_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.nom_equipo;
    this.id_equipo = datos?.DATOS?.[0]?.fun_get_jugador_id_perfil?.id_equipo;
    //console.log(this.nom_equipo)

    if (this.id_equipo != null) {
      this.link_perfil_equipo = "/perfil/perfil-equipo/" + this.id_equipo;
    }
  }


  typeWriter() {
    if (this.i < this.text!.length) {
      this.displayedText += this.text!.charAt(this.i);
      this.i++;
      setTimeout(() => this.typeWriter(), this.speed);
    }
  }



  RouteCrearEquipo() {
    this.router.navigate(['/equipo/crear-equipo']);
  }


  openDialog(imageSrc: string) {
    const dialogRef = this.dialog.open(DialogDataExampleDialogComponent, {
      data: {
        img: imageSrc
      }
    });

    document.body.classList.add('dialog-open');

    dialogRef.afterClosed().subscribe(() => {
      document.body.classList.remove('dialog-open');
    });
  }


}






