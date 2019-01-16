import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AltaServiceService } from '../../services/alta/alta-service.service';
import { AutomatasService } from '../../services/automatas/automatas.service';
import { InformacionComponent } from '../informacion/informacion.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { AltaSitioComponent } from '../alta-sitio/alta-sitio.component';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { sitio } from '../../implements/sitio';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { endStatus } from '../../implements/endStatus';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  faFile = faFile;
  docReference: string;

  @ViewChild(InformacionComponent) info: InformacionComponent;
  @ViewChild(AlertaComponent) alert: AlertaComponent;

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

  fileValid: boolean;
  crqValid: boolean;

  endReport: endStatus[];

  reportVisible: boolean;

  sitios: sitio[];

  constructor(private altaServ: AltaServiceService, private automatas: AutomatasService, private http: Http) {
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
    this.fileValid = false;
    this.crqValid = false;
    this.sitios = [];
    this.endReport = [];
    this.reportVisible = false;
    this.docReference = environment.AUTO_REFERENCE + '/formatos/CAMBIO_ESTADO.csv';
  }

  ngOnInit() {
  }

  fileChargue(e) {
    this.fileValid = false;
    this.fileClass = 'form-control file-input';
    this.validaArcclass = 'progress-bar bg-dark';
    this.validaArctext = 'Validando documento...';
    this.validaArccarga = 0;
    this.validaArcLog = "";
    
    this.file = e.target.files[0];
    this.validaDoc = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.validaArccarga = 100;
      this.archivo = fileReader.result.toString();
      let validacion: string[] = this.altaServ.validarArchivoEstado(this.archivo);
      if(validacion.length == 0){
        this.validaArctext = 'El documento es valido';
        this.validaArcclass = 'progress-bar bg-success';
        this.fileClass = 'form-control file-input is-valid';
        this.fileValid = true;
      }else{
        this.validaArctext = 'El documento no es valido';
        this.validaArcclass = 'progress-bar bg-danger';
        this.fileClass = 'form-control file-input is-invalid';
        this.validaArcLog = "";
        for(let i = 0; i < validacion.length; i++){
          this.validaArcLog += validacion[i] + "<br>";
        }
      }
    }
    fileReader.readAsText(this.file);
  }

  validaCRQ(){
    this.crqValid = false;
    let select: rmdSelect;
    this.validaCRcarga = 0;
    if(this.crqModel.length < 15){
      this.validaCR = false;
      this.validaCRclass = 'progress-bar bg-dark';
      this.validaCRtext = 'Validando CRQ...';
      this.validaCRcarga = 0;
      this.crqClass = 'form-control';
    }else if(this.crqModel.length == 15){
      this.validaCR = true;
      this.validaCRclass = 'progress-bar bg-dark';
      this.validaCRtext = 'Validando CRQ...';
      if(this.crqModel == environment.ROOT_CRQ){
        this.validaCRtext = "El CRQ es valido";
        this.crqClass = "form-control is-valid";
        this.validaCRclass = 'progress-bar bg-success';
        this.validaCRcarga = 100;
        this.crqValid = true;
      }else{
        if(this.automatas.automatCRQ(this.crqModel)){
          select = new rmdSelect();
          let con: condicion = new condicion();
          select.columnas.push('1');
          con.campo = '7';
          con.realcion = '=';
          con.valor = '7';
          select.condiciones.push(con);
          con = new condicion();
          con.campo = '1000000182';
          con.realcion = '=';
          con.valor = this.crqModel;
          select.condiciones.push(con);
          select.formulario = environment.FORM_CR;
          select.usuario = environment.SISTEMA;
          let url: string = environment.URL_SELECT;
          let condiciones: string = "";
          url += 'cSistema=' + environment.SISTEMA;
          url += '&cForma=' + select.formulario;
          url += '&cColumnas=' + select.columnas.join(' ');
          for(let i = 0; i < select.condiciones.length; i++){
            condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
          }
          url += '&cCondiciones=' + condiciones;
          select.url = url;
          this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
            select.rawResult = result;
            select.rawToResult();
            this.validaCRcarga = 100;
            if(select.error){
              this.crqClass = "form-control is-invalid";
              this.validaCRtext = "El CRQ no es valido";
              this.validaCRclass = 'progress-bar bg-danger';
            }else{
              this.validaCRtext = "El CRQ es valido";
              this.crqClass = "form-control is-valid";
              this.validaCRclass = 'progress-bar bg-success';
              this.crqValid = true;
            }
          }, error =>{
            this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
            this.alert.show();
          });
        }else{
          this.validaCRclass = 'progress-bar bg-danger';
          this.validaCRtext = 'El CRQ no tiene el formato correcto';
          this.validaCRcarga = 100;
          this.crqClass = 'form-control is-invalid';
        }
      }
    }else{
      this.crqClass = "form-control is-invalid";
      this.validaCRtext = "El CRQ no es valido";
      this.validaCRclass = 'progress-bar bg-danger';
    }
  }

  restauraValores(): void{
    this.fileClass = 'form-control file-input';
    this.validaDoc = false;
    this.validaArcclass = 'progress-bar bg-dark';
    this.validaArctext = 'Validando documento...';
    this.validaArccarga = 0;
  }

  restaurarValoresCR(): void{
    this.validaCR = false;
    this.validaCRclass = 'progress-bar bg-dark';
    this.validaCRtext = 'Validando CRQ...';
    this.validaCRcarga = 0;
    this.crqClass = 'form-control';
  }

  showInfo(){
    this.info.setInfo('Cambio de estado','<h4>¿Cómo usar esta página?</h4><p>Debes colocar en el fomulario de CRQ el crq que has generado o que se te proporcionó para '+
    'generar los sitios.<br>EL CRQ debe estar en status Implantación en curso y debe ser de tipo Estándar</p><hr><img src="' + environment.AUTO_REFERENCE + '/img/alta01.png"' +
    ' class="img-respoonsive"><hr><p>Cuando termines de escribir el CRQ, el sistema buscará si este es valido.</p><p>Una vez hayas ingresado el CRQ debes ingresar el archivo</p>' + 
    '<hr><img src="' + environment.AUTO_REFERENCE + '/img/alta02.png" class="img-responsive"><hr><p>El nombre del archivo no es relevante, sin embargo, como esta formado si ' + 
    'es importante</p><hr><img src="' + environment.AUTO_REFERENCE + '/img/alta08.png" class="img-responsive"><hr><p>El archivo tiene el formato de un CSV, pero además se recomienda ' +
    'que éste se edite en un editor de texto plano "Sublime-text", "Notepad ++" "Notepad", etc. Ya que se deben de asegurar que no contenga lineas con comas (,) y sin datos ' +
    'o lineas en balnco al final del documento. (Puedes descargar el archivo con el boton que se encuentra a un lado del boton de ayuda)</p><hr><img src="' 
    + environment.AUTO_REFERENCE + '/img/alta03.png" class="img-responsive"><hr><p>Una vez el archivo sea valido y el ' +
    'CRQ ingresado sea correcto aparecerá el boton de alta de sitios, al dar click en él, comenzará la carga de los sitios</p><p>Los sitios erroneos aparecerán en rojo</p> ' +
    '<hr><img src="' + environment.AUTO_REFERENCE + '/img/alta04.png" class="img-responsive"><hr><p>Los correctos aparecerán en verde</p><hr><img src="' + environment.AUTO_REFERENCE 
    + '/img/alta06.png" ' +
    ' class="img-responsive"><hr><p>Al final de la carga de todos los sitios se te alertará por la finalización y podras consultar abajo del recuadro donde aparece la ' +
    'información un botón en el que podras consultar el registro de errores o creaciones de sitios</p>', "OK");
    this.info.show();
  }

  cambioEstado(){
    let lines: string[] = this.archivo.split("\n");
    let campos: string[];
    let site: sitio;
    for(let i = 1; i < lines.length; i++){
      if(lines[i].length >= 2 && lines[i].charAt(0) != ','){
        site = new sitio();
        campos = lines[i].split(",");
        site.numero = Number(campos[0]);
        site.nemonico = campos[1];
        site.compania = campos[2];
        site.status = Number(campos[3]);
        this.sitios.push(site);
      }
    }
  }

  siteInit(event){
    //console.log("SiteInit - " + event);
  }

  siteValidate(event){
    // console.log("SiteValidate - " + event);
  }

  siteFinish(event){
    // console.log("SiteFinish - " + event.status + " - " + event.texto);
    let end = new endStatus;
    end.status = event.status;
    end.texto = event.texto;
    this.endReport.push(end);
    if(this.sitios.length <= this.endReport.length){
      this.alert.setInfo("Reporte", "El cambio de estado de sitios terminó, lea el reporte generado al final del log para ver los resultados de su ejecucion", "OK");
      this.reportVisible = true;
      this.alert.show();
    }
  }

  siteReport(event){
    // console.log("SiteReport - " + event);
  }

  showReport(){
    let informacion: string = "";
    for(let end of this.endReport){
      if(end.status){
        informacion += '<div class="alert alert-success alerta" role="alert">' + end.texto + '</div>';
      }else{
        informacion += '<div class="alert alert-danger alerta" role="alert">' + end.texto + '</div>';
      }
    }
    this.info.setInfo("Reporte", informacion, "OK");
    this.info.show();
  }

}
