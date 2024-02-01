import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Torneos';
  status = true;
addToggle()
{
  this.status = !this.status;
}
}
