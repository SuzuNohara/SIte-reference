import { Component, OnInit, ViewChild } from '@angular/core';
import { AltaAnalizadorArchivoComponent } from '../alta-analizador-archivo/alta-analizador-archivo.component';
import { environment } from '../../environments/environment';
import { AltaServiceService } from '../../services/alta/alta-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  @ViewChild(AltaAnalizadorArchivoComponent) analizador: AltaAnalizadorArchivoComponent;

  validaCR: boolean;
  validaCRclass: string;
  validaCRtext: string;
  validaCRcarga: number;

  validaDoc: boolean;

  constructor( altaServ: AltaServiceService) {
    this.validaCR = false;
    this.validaCRclass = 'progress-bar bg-dark';
    this.validaCRtext = 'Validando CRQ...';
    this.validaCRcarga = 0;
    
    this.validaDoc = false;
  }

  ngOnInit() {
    
  }

  cargaArchivos():void{
    this.analizador.cargaEmulate(0);
  }

}
