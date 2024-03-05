import { ListaJugadores } from "./ListaJugadores.model";

export class PerfilEquipo {
  fun_get_equipofull?: {
    id_equipo?: number;
    nom_equipo?: string;
    desc_equipo?: string;
    foto_equipo?: string;
    id_game?: number;
    estado_equipo?: boolean;
    tamanio_equipo?: number;
    lider_equipo?: number;
    numero_torneos_ganados?: number;
    jugadores?: [ListaJugadores];
  };
}
