import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  titulo: string;
  contenido: string;
  cierre: string;
  showAlert: boolean;

  constructor() {
    this.titulo = "titulo";
    this.contenido = "contenido";
    this.cierre = "cerrar";
  }

  ngOnInit() {
  }

  setInfo(titulo: string, contenido: string, cierre: string): boolean{
    this.titulo = titulo;
    this.contenido = contenido;
    this.cierre = cierre;
    return true;
  }

  show(){
    this.showAlert = true;
  }

  hide(){
    this.showAlert = false;
  }
}
