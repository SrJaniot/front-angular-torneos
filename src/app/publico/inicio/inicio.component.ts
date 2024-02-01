import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) { }
  zoomImage(event: Event) {
    const html = document.documentElement;
    const body = document.body;
    const heroElement = event.target as Element;
    heroElement.classList.toggle('zoomed');

    if (heroElement.classList.contains('zoomed')) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';

      // Espera un poco antes de navegar para permitir que termine la animación de zoom
      setTimeout(() => {
        this.router.navigate(['/seguridad/login']); // Reemplaza '/ruta-del-componente' con la ruta de tu componente
      }, 300); // Ajusta este valor según la duración de tu animación de zoom
    } else {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    }
  }

}
