import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { sitio } from '../../implements/sitio';
import { endStatus } from '../../implements/endStatus';
import { rmdSelect } from '../../implements/rmdSelect';
import { rmdInsert } from '../../implements/rmdInsert';
import { rmdUpdate } from '../../implements/rmdUpdate';
import { condicion } from '../../implements/condicion';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tecnologia-sitio',
  templateUrl: './tecnologia-sitio.component.html',
  styleUrls: ['./tecnologia-sitio.component.css']
})
export class TecnologiaSitioComponent implements OnInit {

  status: string;
  siteLocal: sitio;
  showClass: string;

  @Input() public site: sitio;
  @Output() public init = new EventEmitter<number>();
  @Output() public validate = new EventEmitter<number>();
  @Output() public finish = new EventEmitter<endStatus>();
  @Output() public report = new EventEmitter<number>();

  private retornoTec: condicion[];
  private insertG: rmdInsert;
  private select: rmdSelect;

  constructor(private http: Http) {
    this.status = "Inicializando";
    this.showClass = 'progress-bar bg-info progress-bar-striped progress-bar-animated alta-progress';
    this.retornoTec = [];
    this.insertG = new rmdInsert();
  }

  ngOnInit() {
    this.processSite();
  }

  processSite(){
    let tec536878271: string = "";
    let tec536878272: string = "";
    let tec536878317: string = "";
    let tec536878269: string = "";
    let tec536878270: string = "";
    let idSite: string = "";

    this.status = 'Consultando informacion';
    this.select = new rmdSelect();
    let cond: condicion;
    for(let col of environment.COL_AMX){
        this.select.columnas.push(col);
    }
    cond = new condicion();
    cond.campo = "536870913";
    cond.realcion = "=";
    cond.valor = this.site.tecnologia;
    this.select.condiciones.push(cond);
    cond = new condicion();
    cond.campo = "536870923";
    cond.realcion = "=";
    cond.valor = this.site.tipo;
    this.select.condiciones.push(cond);
    this.select.usuario = environment.SISTEMA;
    this.select.formulario = environment.FORM_AMX;
    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + this.select.formulario;
    url += '&cColumnas=' + this.select.columnas.join(' ');
    for(let i = 0; i < this.select.condiciones.length; i++){
    condiciones += '\'' + this.select.condiciones[i].campo + '\'' + this.select.condiciones[i].realcion + '\'' + this.select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    this.select.url = url;
    if(environment.PAISES_NO_OPERABLES.indexOf(this.site.compania) < 0){
      this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
        this.select.rawResult = result;
        this.select.rawToResult();
        if(this.select.error){
            this.retornoTec = [];
        }else{
          for(let i = 0; i < 1 && i < this.select.result.length; i++){
              for(let id of this.select.result[i].entrada){
                  let con: condicion = new condicion();
                  con.campo = id.id;
                  con.realcion = "=";
                  con.valor = id.valor;
                  this.retornoTec.push(con);
              }
          }
          if(this.retornoTec.length == 0){
            this.status = "Error en tecnologia y tipo de sitio " + this.site.nemonico + " - " + this.site.tipo + "," + this.site.tecnologia;
            this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
            this.finishMethod( false, "Error en la selección de tecnología y tipo de sitio");
          }else{
            let condiciones: string = "";
            for(let con of this.retornoTec){
              if(con.campo == '536870922'){
                tec536878271 = con.valor;
              }else if(con.campo == '536870914'){
                tec536878272 = con.valor;
              }else if(con.campo == '536870918'){
                tec536878317 = con.valor;
              }else if(con.campo == '536870921'){
                tec536878269 = con.valor;
              }else if(con.campo == '536870920'){
                tec536878270 = con.valor;
              }
            }
            this.status = 'Comprobando sitio';
            this.select = new rmdSelect();
            let cond: condicion;
            for(let col of environment.COL_AMX){
                this.select.columnas.push(col);
            }
            cond = new condicion();
            cond.campo = "536870925";
            cond.realcion = "=";
            cond.valor = this.site.nemonico;
            this.select.condiciones.push(cond);
            cond = new condicion();
            cond.campo = "1000000001";
            cond.realcion = "=";
            cond.valor = this.site.compania.toUpperCase();
            this.select.condiciones.push(cond);
            this.select.usuario = environment.SISTEMA;
            this.select.formulario = environment.FORM_SITE;
            let url: string = environment.URL_SELECT;
            url += 'cSistema=' + environment.SISTEMA;
            url += '&cForma=' + this.select.formulario;
            url += '&cColumnas=1';
            for(let i = 0; i < this.select.condiciones.length; i++){
              condiciones += '\'' + this.select.condiciones[i].campo + '\'' + this.select.condiciones[i].realcion + '\'' + this.select.condiciones[i].valor + '\' ';
            }
            url += '&cCondiciones=' + condiciones;
            this.select.url = url;
            this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
              let update: rmdUpdate = new rmdUpdate();
              this.insertG = new rmdInsert();
              this.select.rawResult = result;
              this.select.rawToResult();
              if(this.select.error){
                this.status = 'Sitio no encontrado ' + this.site.nemonico;
                this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                this.finishMethod( false, "No se encontró un sitio con estas caracteristicas (" + this.site.nemonico + ", " + this.site.compania + ")");
                this.retornoTec = [];
              }else{
                for(let i = 0; i < 1 && i < this.select.result.length; i++){
                  for(let id of this.select.result[i].entrada){
                    let con: condicion = new condicion();
                    con.campo = id.id;
                    con.realcion = "=";
                    con.valor = id.valor;
                    idSite = id.valor;
                    this.retornoTec.push(con);
                  }
                }
                if(this.retornoTec.length == 0){
                  this.status = 'Sitio no encontrado ' + this.site.nemonico;
                  this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                  this.finishMethod( false, "No se encontró un sitio con estas caracteristicas (" + this.site.nemonico + ", " + this.site.compania + ")");
                }else{
                  let url: string = environment.URL_UPDATE;
                  let condiciones: string = "";
                  url += 'cSistema=' + environment.SISTEMA;
                  url += '&cForma=' + environment.FORM_SITE;
                  for(let con of this.retornoTec){
                    if(con.campo == '1'){
                      url += '&cID=' + idSite;
                    }
                  }
                  condiciones += '\'536878271\'=\'' + tec536878271;
                  condiciones += '\'536878272\'=\'' + tec536878272;
                  condiciones += '\'536878317\'=\'' + tec536878317;
                  condiciones += '\'536878269\'=\'' + tec536878269;
                  condiciones += '\'536878270\'=\'' + tec536878270;
                  url += '&cColumnas=' + condiciones;
                  update.url = url;
                  this.status = "Actualizando";
                  this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
                    if(result.indexOf('<UPDATED') >= 0){
                      this.status = "Sitio actualizado";
                      this.showClass = 'progress-bar bg-success progress-bar-striped alta-progress';
                      this.finishMethod( true, "Sitio actualizado " + this.site.nemonico);
                    }else if(result.indexOf('<ERROR') >= 0){
                      this.status = "Error al actualizar " + this.site.nemonico;
                      this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                      this.finishMethod( false, "Error al actualizar: " + result.substring(result.indexOf('<ERROR') + '<ERROR'.length, result.indexOf('</ERROR>')));
                    }else{
                      this.status = 'Error desconocido ' + this.site.nemonico;
                      this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                      this.finishMethod( false, "Error desconocido: " + result);
                    }
                  }, error =>{
                    this.status = 'Error de conexion al actualizar ' + this.site.nemonico;
                    this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                    this.finishMethod( false, "Error de conexion a Remedy Control");
                  });
                }
              }
            }, error =>{
              this.status = 'Error en la consulta ' + this.site.nemonico;
              this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
              this.finishMethod( false, "Error de conexion a Remedy Control");
            });
          }
        }
      }, error =>{
        this.status = 'Error en la consulta ' + this.site.nemonico;
        this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
        this.finishMethod( false, "Error de conexion a Remedy Control");
      });
    }else{
      this.status = 'Error ' + this.site.nemonico;
      this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
      this.finishMethod( false, this.site.compania + " se encuentra en las compañias excluidas de este sitio");
    }
  }

  initMethod(){
    this.init.emit(this.site.numero);
  }

  validateMethod(){
    this.validate.emit(this.site.numero);
  }

  finishMethod(stat: boolean, message: string){
    let end: endStatus = new endStatus();
    end.status = stat;
    end.texto = message;
    this.finish.emit(end);
  }

  reportMethod(){
    this.report.emit(this.site.numero);
  }

}
