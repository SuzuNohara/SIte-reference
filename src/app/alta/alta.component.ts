import { Component, OnInit, ViewChild } from '@angular/core';
import { AltaAnalizadorArchivoComponent } from '../alta-analizador-archivo/alta-analizador-archivo.component';
import { environment } from '../../environments/environment';
import { AltaServiceService } from '../../services/alta/alta-service.service';
import { AutomatasService } from '../../services/automatas/automatas.service';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
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
      let validacion: string[] = this.altaServ.validarArchivo(this.archivo);
      if(validacion.length == 0){
        this.validaArctext = 'El documento es valido';
        this.validaArcclass = 'progress-bar bg-success';
        this.fileClass = 'form-control file-input is-valid';
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
            }
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

}
