import { Component,  } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( ){ }

  ngOnInit() {
    setTimeout(() => {
      console.log('Carga completada');
      const loadingElement = document.querySelector('.loading');
      if (loadingElement) {
        loadingElement.classList.remove('loading');
      }
    }, 2000); // Ajusta este valor según la duración de tu animación de carga
  }

  rightPanelActive = false;

  activateRightPanel(): void {
    this.rightPanelActive = true;
  }

  deactivateRightPanel(): void {
    this.rightPanelActive = false;
  }


}
