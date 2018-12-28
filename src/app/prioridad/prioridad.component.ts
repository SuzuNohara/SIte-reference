import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AltaServiceService } from '../../services/alta/alta-service.service';
import { AutomatasService } from '../../services/automatas/automatas.service';
import { InformacionComponent } from '../informacion/informacion.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.css']
})
export class PrioridadComponent implements OnInit {
  
  //icons
  faQuestionCircle = faQuestionCircle;

  //Alert/Info
  @ViewChild(InformacionComponent) info: InformacionComponent;
  @ViewChild(AlertaComponent) alert: AlertaComponent;

  //CRQ
  crqModel: string;
  crqClass:string;
  validaCR: boolean;
  validaCRclass: string;
  validaCRtext: string;
  validaCRcarga: number;
  crqValid: boolean;

  //TECNOLOGIA
  tecModel: string;
  tecClass:string;
  validaTEC: boolean;
  validaTECclass: string;
  validaTECtext: string;
  validaTECcarga: number;
  tecValid: boolean;
  tecnologias: string[];

  //TIPO
  tipoModel: string;
  tipoClass:string;
  validaTIPO: boolean;
  validaTIPOclass: string;
  validaTIPOtext: string;
  validaTIPOcarga: number;
  tipoValid: boolean;
  tipos: string[];

  //COMPAÑIA
  compModel: string;
  compClass:string;
  validaCOMP: boolean;
  validaCOMPclass: string;
  validaCOMPtext: string;
  validaCOMPcarga: number;
  compValid: boolean;
  companias: string[];

  //PRIORIDAD
  prioModel: string;
  prioClass:string;
  validaPRIO: boolean;
  validaPRIOclass: string;
  validaPRIOtext: string;
  validaPRIOcarga: number;
  prioValid: boolean;

  constructor(private altaServ: AltaServiceService, private automatas: AutomatasService, private http: Http) {
    this.crqClass = 'form-control';
    this.validaCR = false;
    this.validaCRclass = 'progress-bar bg-dark';
    this.validaCRtext = 'Validando CRQ...';
    this.validaCRcarga = 0;
    this.crqValid = true;

    //TECNOLOGIA
    this.tecClass = 'form-control';
    this.validaTEC = false;
    this.validaTECclass = 'progress-bar bg-dark';
    this.validaTECtext = 'Validando tecnología...';
    this.validaTECcarga = 0;
    this.tecValid = false;
    this.tecnologias = [];
  
    //TIPO
    this.tipoClass = 'form-control';
    this.validaTIPO = false;
    this.validaTIPOclass = 'progress-bar bg-dark';
    this.validaTIPOtext = 'Validando tipo...';
    this.validaTIPOcarga = 0;
    this.tipoValid = false;
    this.tipos = [];
  
    //COMPAÑIA
    this.compClass = 'form-control';
    this.validaCOMP = false;
    this.validaCOMPclass = 'progress-bar bg-dark';
    this.validaCOMPtext = 'Validando compañía...';
    this.validaCOMPcarga = 0;
    this.compValid = false;
    this.companias = [];
  
    //PRIORIDAD
    this.prioClass = 'form-control';
    this.validaPRIO = false;
    this.validaPRIOclass = 'progress-bar bg-dark';
    this.validaPRIOtext = 'Registrando prioridad...';
    this.validaPRIOcarga = 0;
    this.prioValid = false;
  }

  ngOnInit() {
    this.cargaCompania();
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
        this.cargaCompania();
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
              this.validaCRclass = 'progress-bar';
            }else{
              this.validaCRtext = "El CRQ es valido";
              this.crqClass = "form-control is-valid";
              this.validaCRclass = 'progress-bar bg-success';
              this.crqValid = true;
              this.cargaCompania();
            }
          }, error =>{
            this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
            this.alert.show();
          });
        }else{
          this.validaCRclass = 'progress-bar';
          this.validaCRtext = 'El CRQ no tiene el formato correcto';
          this.validaCRcarga = 100;
          this.crqClass = 'form-control is-invalid';
        }
      }
    }else{
      this.crqClass = "form-control is-invalid";
      this.validaCRtext = "El CRQ no es valido";
      this.validaCRclass = 'progress-bar';
    }
  }

  cargaCompania(){
    this.companias;
    let select: rmdSelect;
    this.validaCOMPcarga = 0;
    this.validaCOMP = true;
    this.validaCOMPclass = 'progress-bar bg-dark';
    this.validaCOMPtext = 'Obteniendo compañías...';
    select = new rmdSelect();
    select.columnas.push('1');
    select.columnas.push('1000000001');
    let con: condicion = new condicion();
    con.campo = '1000003965';
    con.realcion = '=';
    con.valor = '%25';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000006';
    con.realcion = '=';
    con.valor = '%25Operating Company%25';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '1';
    select.condiciones.push(con);
    select.formulario = environment.FORM_COMPANIAS;
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
      this.validaCOMPcarga = 100;
      if(select.error){
        this.compClass = "form-control is-invalid";
        this.validaCOMPtext = "Error al buscar compañías";
        this.validaCOMPclass = 'progress-bar';
      }else{
        this.validaCOMPtext = "Compañías cargadas";
        this.validaCOMPclass = 'progress-bar bg-success';
        this.compValid = true;
        for(let ress of select.result){
          for(let resss of ress.entrada){
            if(resss.id == '1000000001'){
              this.companias.push(resss.valor);
            }
          }
        }
      }
    }, error =>{
      this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
      this.alert.show();
      this.compClass = "form-control is-invalid";
      this.validaCOMPtext = "Error al buscar compañías";
      this.validaCOMPclass = 'progress-bar';
      this.validaCOMPcarga = 100;
    });
  }

  cargaTecnologia(){
    if(this.compModel){
      this.tecnologias = [];
      let select: rmdSelect;
      this.validaTECcarga = 0;
      this.validaTEC = true;
      this.validaTECclass = 'progress-bar bg-dark';
      this.validaTECtext = 'Obteniendo tecnologías...';
      select = new rmdSelect();
      select.columnas.push('1');
      select.columnas.push('536870913');
      let con: condicion = new condicion();
      con.campo = '1000000001';
      con.realcion = '=';
      con.valor = this.compModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '7';
      con.realcion = '=';
      con.valor = '0';
      select.condiciones.push(con);
      select.formulario = environment.FORM_TECNOLOGIAS;
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
        this.validaTECcarga = 100;
        if(select.error){
          this.tecClass = "form-control is-invalid";
          this.validaTECtext = "Error al buscar tecnologías";
          this.validaTECclass = 'progress-bar';
        }else{
          this.validaTECtext = "Tecnologías cargadas";
          this.validaTECclass = 'progress-bar bg-success';
          this.tecValid = true;
          for(let ress of select.result){
            for(let resss of ress.entrada){
              if(resss.id == '536870913'){
                this.tecnologias.push(resss.valor);
              }
            }
          }
        }
      }, error =>{
        this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
        this.alert.show();
        this.tecClass = "form-control is-invalid";
        this.validaTECtext = "Error al buscar compañías";
        this.validaTECclass = 'progress-bar';
        this.validaTECcarga = 100;
      });
    }
  }

  cargaTipo(){
    if(this.compModel && this.tecModel){
      this.tipos = [];
      let select: rmdSelect;
      this.validaTIPOcarga = 0;
      this.validaTIPO = true;
      this.validaTIPOclass = 'progress-bar bg-dark';
      this.validaTECtext = 'Obteniendo tipos de sitio...';
      select = new rmdSelect();
      select.columnas.push('1');
      select.columnas.push('536870923');
      let con: condicion = new condicion();
      con.campo = '1000000001';
      con.realcion = '=';
      con.valor = this.compModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '536870913';
      con.realcion = '=';
      con.valor = this.tecModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '7';
      con.realcion = '=';
      con.valor = '0';
      select.condiciones.push(con);
      select.formulario = environment.FORM_TIPO_SITIO;
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
        this.validaTIPOcarga = 100;
        if(select.error){
          this.tipoClass = "form-control is-invalid";
          this.validaTIPOtext = "Error al buscar tecnologías";
          this.validaTIPOclass = 'progress-bar';
        }else{
          this.validaTIPOtext = "Tipos de sitios cargados";
          this.validaTIPOclass = 'progress-bar bg-success';
          this.tipoValid = true;
          for(let ress of select.result){
            for(let resss of ress.entrada){
              if(resss.id == '536870923'){
                this.tipos.push(resss.valor);
              }
            }
          }
        }
      }, error =>{
        this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
        this.alert.show();
        this.tipoClass = "form-control is-invalid";
        this.validaTIPOtext = "Error al buscar compañías";
        this.validaTIPOclass = 'progress-bar';
        this.validaTIPOcarga = 100;
      });
    }
  }

  obtenerPrioridad(){
    if(this.compModel && this.tecModel && this.tipoModel){
      this.prioModel = '';
      let select: rmdSelect;
      this.validaPRIOcarga = 0;
      this.validaPRIO = true;
      this.validaPRIOclass = 'progress-bar bg-dark';
      this.validaPRIOtext = 'Obteniendo prioridad...';
      select = new rmdSelect();
      select.columnas.push('1');
      select.columnas.push('536870924');
      let con: condicion = new condicion();
      con.campo = '1000000001';
      con.realcion = '=';
      con.valor = this.compModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '536870913';
      con.realcion = '=';
      con.valor = this.tecModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '536870923';
      con.realcion = '=';
      con.valor = this.tipoModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '7';
      con.realcion = '=';
      con.valor = '0';
      select.condiciones.push(con);
      select.formulario = environment.FORM_TIPO_SITIO;
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
        this.validaPRIOcarga = 100;
        if(select.error){
          this.prioClass = "form-control is-invalid";
          this.validaPRIOtext = "Error al buscar prioridad";
          this.validaPRIOclass = 'progress-bar';
        }else{
          this.validaPRIOtext = "Prioridad Obtenida";
          this.validaPRIOclass = 'progress-bar bg-success';
          this.prioValid = true;
          for(let ress of select.result){
            for(let resss of ress.entrada){
              if(resss.id == '536870924'){
                this.prioModel = resss.valor;
              }
            }
          }
        }
      }, error =>{
        this.alert.setInfo("Error", "<p>Error al consultar la informacion, comprueba tu conexion a internet</p><p>" + error + "</p>", "ok");
        this.alert.show();
        this.prioClass = "form-control is-invalid";
        this.validaPRIOtext = "Error al buscar compañías";
        this.validaPRIOclass = 'progress-bar';
        this.validaPRIOcarga = 100;
      });
    }
  }
}
