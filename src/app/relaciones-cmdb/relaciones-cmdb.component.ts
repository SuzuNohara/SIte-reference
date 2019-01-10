import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InformacionComponent } from '../informacion/informacion.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CMDBComponent } from '../cmdb/cmdb.component';
import { CICMDB } from '../../implements/cmdb';

@Component({
  selector: 'app-relaciones-cmdb',
  templateUrl: './relaciones-cmdb.component.html',
  styleUrls: ['./relaciones-cmdb.component.css']
})
export class RelacionesCMDBComponent implements OnInit {

  // Alerts
  @ViewChild(InformacionComponent) info: InformacionComponent;
  @ViewChild(AlertaComponent) alert: AlertaComponent;

  // icons
  faFile = faFile;
  faQuestionCircle = faQuestionCircle;
  docReference: string;

  // file
  fileClass:string;
  file;
  archivo: string;

  // boton
  showButton: boolean;

  // reporte
  reporte: string;

  // componentes
  cmdbPool: CICMDB[];
  cmdb: CICMDB[];

  constructor() {
    this.fileClass = 'form-control file-input';
    this.showButton = false;
    this.reporte = '';
    this.cmdb = [];
  }

  ngOnInit() {
  }

  cargarRelaciones(){
    if(this.archivo.length > 0){
      let lines: string[];
      lines = this.archivo.split('/n');
      for(let line of lines){
        let fields: string[];
        fields = line.split(',');
        let ci = new CICMDB();
        let cirel = new CICMDB();
        ci.name = fields[0];
        ci.company = fields[1];
        ci.dataset = fields[2];
        cirel.name = fields[3];
        cirel.company = fields[4];
        cirel.dataset = fields[5];
        ci.relation = cirel;
        this.cmdbPool.push(ci);
      }
      this.cargaComponentes();
    }else{
      this.alert.setInfo("Error","Aun no de ha cargado el archivo completo","ok");
      this.alert.show();
    }
  }

  cargaComponentes(){
    for(let ci of this.cmdbPool){
      this.cmdb.push(ci);
    }
  }

  // eventos de hijos
  inited(e){
    console.log(e);
  }
  
  validated(e){
    console.log(e);
  }
  
  finiched(e){
    console.log(e);
  }
  
  report(e){
    console.log(e);
  }

  // Funciones de entorno

  fileChargue(e){
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.archivo = fileReader.result.toString();
      this.showButton = true;
    }
    fileReader.readAsText(this.file);
  }

  reiniciar(){
    this.showButton = false;
    this.archivo = '';
  }

  showReport(){
    this.info.setInfo('Reporte actual', this.reporte, 'ok');
    this.info.show();
  }
}
