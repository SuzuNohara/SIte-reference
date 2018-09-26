import { Component, OnInit, ViewChild } from '@angular/core';
import { AltaAnalizadorArchivoComponent } from '../alta-analizador-archivo/alta-analizador-archivo.component';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  @ViewChild(AltaAnalizadorArchivoComponent) analizador: AltaAnalizadorArchivoComponent;

  constructor() { 
    console.log(environment.URL_SELECT);
  }

  ngOnInit() {
    
  }

  cargaArchivos():void{
    this.analizador.cargaEmulate(0);
  }

}
