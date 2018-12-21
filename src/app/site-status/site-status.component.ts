import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { sitio } from '../../implements/sitio';
import { endStatus } from '../../implements/endStatus';
import { rmdSelect } from '../../implements/rmdSelect';
import { rmdInsert } from '../../implements/rmdInsert';
import { condicion } from '../../implements/condicion';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { rmdUpdate } from '../../implements/rmdUpdate';

@Component({
  selector: 'app-site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.css']
})
export class SiteStatusComponent implements OnInit {

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
    this.status = 'Comprobando sitio';
    this.select = new rmdSelect();
    let cond: condicion;
    let prev: number;
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
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + this.select.formulario;
    url += '&cColumnas=1 7';
    for(let i = 0; i < this.select.condiciones.length; i++){
    condiciones += '\'' + this.select.condiciones[i].campo + '\'' + this.select.condiciones[i].realcion + '\'' + this.select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    this.select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      let update: rmdUpdate = new rmdUpdate();
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
              url += '&cID=' + con.valor;
            }else if(con.campo = '7'){
              prev = Number(con.valor);
            }
          }
          if(this.prevNextValidate( prev, this.site.status)){
            condiciones += '\'7\'=\'' + this.site.status + '\' ';
            if(this.site.status == 6){
              condiciones += '\'536871183\'=\'-\'';
            }
            url += '&cColumnas=' + condiciones;
            update.url = url;
            this.status = "Actualizando";
            this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
              if(result.indexOf('<UPDATED') >= 0){
                this.status = "Sitio actualizado";
                this.showClass = 'progress-bar bg-success progress-bar-striped alta-progress';
                this.finishMethod( true, "Sitio " + this.site.nemonico + " actualizado");
              }else if(result.indexOf('<ERROR') >= 0){
                this.status = "Error al actualizar " + this.site.nemonico;
                this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                this.finishMethod( false, "Error al actualizar: " + this.site.nemonico + " - " + result.substring(result.indexOf('<ERROR') + '<ERROR'.length, result.indexOf('</ERROR>')));
              }else{
                this.status = 'Error desconocido';
                this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
                this.finishMethod( false, "Error desconocido: " + this.site.nemonico + " - " + result);
              }
            }, error =>{
              this.status = 'Error de conexion al actualizar ' + this.site.nemonico;
              this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
              this.finishMethod( false, "Error de conexion a Remedy Control");
            });
          }else{
            this.status = "Error al actualizar";
            this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
            this.finishMethod( false, "Error al actualizar: El cambio de estado de " + this.site.nemonico + " no esta permitido (" + environment.STAT_NAMES[prev] + " - " + environment.STAT_NAMES[this.site.status] + ")");
          }
        }
      }
    }, error =>{
      this.status = 'Error en la consulta ' + this.site.nemonico;
      this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
      this.finishMethod( false, "Error de conexion a Remedy Control");
    });
  }

  prevNextValidate(prev: number, ant: number): boolean{
    let retorno: boolean = false;
    let actual: string = prev + '-' + ant;
    for(let ind of environment.SATE_CHANGE_ALLOWED){
      if(ind == actual){
        retorno = true;
      }
    }
    return retorno;
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
