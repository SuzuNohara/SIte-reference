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
  crqClass:string;

  validaCR: boolean;
  validaCRclass: string;
  validaCRtext: string;
  validaCRcarga: number;

  fileClass:string;
  validaArcclass: string;
  validaArctext: string;
  validaArccarga: number;
  validaArcLog: string;

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
    this.validaArcclass = 'progress-bar bg-dark';
    this.validaArctext = 'Validando documento...';
    this.validaArccarga = 0;
  }

  ngOnInit() {}

  fileChargue(e) {
    this.fileClass = 'form-control file-input';
    this.validaArcclass = 'progress-bar bg-dark';
    this.validaArctext = 'Validando documento...';
    this.validaArccarga = 0;
    
    this.file = e.target.files[0];
    this.validaDoc = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.validaArccarga = 100;
      this.archivo = fileReader.result.toString();
      if(this.altaServ.validarArchivo(this.archivo)){
        this.validaArctext = 'El documento es valido';
        this.validaArcclass = 'progress-bar bg-success';
        this.fileClass = 'form-control file-input is-valid';
      }else{
        this.validaArctext = 'El documento no es valido';
        this.validaArcclass = 'progress-bar bg-danger';
        this.fileClass = 'form-control file-input is-invalid';
        this.validaArcLog = this.altaServ.validarArchivoLog(this.archivo);
      }
    }
    fileReader.readAsText(this.file);
  }

  cargaArchivos():void{
    this.analizador.cargaEmulate(0);
  }

}
