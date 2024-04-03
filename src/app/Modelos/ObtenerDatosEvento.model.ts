import { ListTorneos } from "./ListTorneos.model";

export class ObtenerDatosEvento {
  fun_get_evento2?:{
  id_evento?: number;
  nom_evento?: string;
  desc_evento?: string;
  fecha_inicio_evento?: Date;
  fecha_fin_evento?: Date;
  foto_evento?: string;
  premio_evento_1?: string;
  premio_evento_2?: string;
  premio_evento_3?: string;
  video_explica_evento?: string;
  cantidad_personas?: number;
  valor_dinero_evento?: number;
  estado_evento?: number;
  informacion_general?: string;
  informacion_reglas?: string;
  foto_premio_evento_1?: string;
  foto_premio_evento_2?: string;
  foto_premio_evento_3?: string;
  foto_carta_fondo?: string;
  foto_carta_titulo?: string;
  foto_carta_personaje?: string;
  torneos?: [ListTorneos];
  };
}
