import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InformacionComponent } from '../informacion/informacion.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
    this.fileClass = 'form-control file-input';
    this.showButton = false;
  }

  ngOnInit() {
  }

  cargarRelaciones(){
    if(this.archivo.length > 0){
      
    }else{
      this.alert.setInfo("Error","Aun no de ha cargado el archivo completo","ok");
    }
  }

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
}
