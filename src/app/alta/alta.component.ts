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

  crqModel: string;
  validaCR: boolean;
  validaCRclass: string;
  validaCRtext: string;
  validaCRcarga: number;
  crqClass:string;
  fileClass:string;
  file:any;
  archivo: string;

  validaDoc: boolean;

  @ViewChild(AltaAnalizadorArchivoComponent) analizador: AltaAnalizadorArchivoComponent;

  constructor(private altaServ: AltaServiceService) {
    this.validaCR = false;
    this.validaCRclass = 'progress-bar bg-dark';
    this.validaCRtext = 'Validando CRQ...';
    this.validaCRcarga = 0;
    this.crqClass = 'form-control';
    this.fileClass = 'form-control file-input';
    this.validaDoc = false;
  }

  ngOnInit() {}

  fileChargue(e) {
      this.file = e.target.files[0];
      console.log('capturado');
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.archivo = fileReader.result.toString();
        this.altaServ.validarArchivo(this.archivo);
      }
      fileReader.readAsText(this.file);
  }

  cargaArchivos():void{
    this.analizador.cargaEmulate(0);
  }

}
