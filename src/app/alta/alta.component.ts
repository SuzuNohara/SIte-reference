import { Component, OnInit, ViewChild } from '@angular/core';
import { AltaAnalizadorArchivoComponent } from '../alta-analizador-archivo/alta-analizador-archivo.component';
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

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  @ViewChild(InformacionComponent) info: InformacionComponent;
  @ViewChild(AlertaComponent) alert: AlertaComponent;
  @ViewChild(AltaSitioComponent) sitiosRef: AltaSitioComponent[];

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

  @ViewChild(AltaAnalizadorArchivoComponent) analizador: AltaAnalizadorArchivoComponent;

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
  }

  ngOnInit() {}

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
      let validacion: string[] = this.altaServ.validarArchivo(this.archivo);
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

  cargaArchivos():void{
    this.analizador.cargaEmulate(0);
  }

  showInfo(){
    this.info.setInfo("Alta de sitios", "Esta es la información correspondiente al alta de sitios", "OK");
    this.info.show();
  }

  cargaSitios(){
    let lines: string[] = this.archivo.split("\n");
    let campos: string[];
    let site: sitio;
    for(let i = 1; i < lines.length; i++){
      site = new sitio();
      campos = lines[i].split(",");
      site.numero = Number(campos[0]);
      site.compania = campos[1];
      site.nemonico = campos[2];
      site.nombre = campos[3];
      site.region = campos[4];
      site.tecnologia = campos[5];
      site.conectado = campos[6];
      site.tipo = campos[7];
      site.grupoSoporte = campos[8];
      site.sitioAlarma = campos[9];
      site.ip = campos[10];
      this.sitios.push(site);
    }
  }

  siteInit(event){
    console.log("SiteInit - " + event);
  }

  siteValidate(event){
    console.log("SiteValidate - " + event);
  }

  siteFinish(event){
    console.log("SiteFinish - " + event);
  }

  siteReport(event){
    console.log("SiteReport - " + event);
  }

}
