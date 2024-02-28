import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
})
export class CrearEquipoComponent {
  firstFormGroup = this._formBuilder.group({
    NombreEquipo: ['', Validators.required],
    FotoEquipo: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {

  }





}




