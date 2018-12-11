import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment'
import { AlertaComponent } from '../alerta/alerta.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(AlertaComponent) alerta: AlertaComponent;

  usuarioModel: string;
  usuarioDis: boolean;
  contraModel: string;
  contraDis: boolean;
  processing: boolean;
  progreso: string;

  constructor() {
    this.progreso = "Iniciando sesion..."
    this.usuarioDis = false;
    this.contraDis = false;
    this.processing = false;
    this.usuarioModel = "";
    this.contraModel = "";
  }

  ngOnInit() {}

  login(){
    if(this.usuarioModel.length > 0 && this.contraModel.length > 0){
      this.usuarioDis = true;
      this.contraDis = true;
      this.processing = true;

    }else{
      this.alerta.setInfo("Error al iniciar sesión", "<p>No has ingresado los parametros de usuario y contraseña requeridos</p>", "OK");
      this.alerta.show();
    }
  }

}
