import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {
  rightPanelActive = false;

  activateRightPanel(): void {
    this.rightPanelActive = true;
  }

  deactivateRightPanel(): void {
    this.rightPanelActive = false;
  }

}
