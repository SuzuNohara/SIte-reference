import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  titulo: string;
  contenido: string;
  cierre: string;
  showInfo: boolean;

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
    this.showInfo = true;
  }

  hide(){
    this.showInfo = false;
  }
}
