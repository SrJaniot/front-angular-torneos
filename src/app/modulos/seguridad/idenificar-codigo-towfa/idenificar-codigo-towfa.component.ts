import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-idenificar-codigo-towfa',
  templateUrl: './idenificar-codigo-towfa.component.html',
  styleUrl: './idenificar-codigo-towfa.component.css'
})
export class IdenificarCodigoTowfaComponent {
  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  ngOnInit() {

  }

  onOtpChange(event: any) {
    this.otp = event;
    console.log(this.otp);
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if(this.otp.length == this.configOptions.length) {
      console.log('Ready to go');

    }
  }









}
