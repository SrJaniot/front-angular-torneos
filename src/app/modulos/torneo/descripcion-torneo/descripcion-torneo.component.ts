import { Component } from '@angular/core';

@Component({
  selector: 'app-descripcion-torneo',
  templateUrl: './descripcion-torneo.component.html',
  styleUrl: './descripcion-torneo.component.css'
})
export class DescripcionTorneoComponent {
  activeTab: string = 'info';

  changeTab(tab: string) {
      this.activeTab = tab;
      console.log(this.activeTab);
  }

}
