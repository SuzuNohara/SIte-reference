import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { InformacionComponent } from '../informacion/informacion.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CICMDB } from '../../implements/cmdb';
import { endStatus } from '../../implements/endStatus';

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

  // Operacion actual
  current: number;
  total: number;
  processed: number;
  carga: number;

  constructor() {
    this.fileClass = 'form-control file-input';
    this.showButton = false;
    this.reporte = '';
    this.cmdb = [];
    this.cmdbPool = [];
    this.reporte = '';
    this.current = 0;
    this.carga = 0;
    this.processed = 0;
    this.total = 0;
  }

  ngOnInit() {
  }

  cargarRelaciones(){
    if(this.archivo.length > 0){
      console.log(this.archivo);
      let lines: string[];
      lines = this.archivo.split('\n');
      this.total = lines.length;
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
    this.cmdb = [];
    if(this.cmdbPool.length > 0){
      for(let i = 0; i < this.cmdbPool.length && i < 15; i++){
        this.cmdb.push(this.cmdbPool.pop());
        this.current ++;
      }
    }else{
      this.alert.setInfo('Terminado','Ya no hay mas CI que procesar','OK');
      this.alert.show();
    }
  }

  // eventos de hijos
  inited(e){
    console.log(e);
  }
  
  validated(e){
    console.log(e);
  }
  
  finished(e){
    let end: endStatus = e;
    this.reporte += end.texto + '<br>';
    this.current--;
    this.processed++;
    this.carga = 100 * (this.processed / this.total);
    if(this.current == 0){
      this.cargaComponentes();
    }
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
