import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { sitio } from '../../implements/sitio';
import { endStatus } from '../../implements/endStatus';
import { rmdSelect } from '../../implements/rmdSelect';
import { rmdInsert } from '../../implements/rmdInsert';
import { condicion } from '../../implements/condicion';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alta-sitio',
  templateUrl: './alta-sitio.component.html',
  styleUrls: ['./alta-sitio.component.css']
})
export class AltaSitioComponent implements OnInit {

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
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      this.insertG = new rmdInsert();
      this.status = 'Insertando sitio';
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
          let url: string = environment.URL_INSERT;
          let condiciones: string = "";
          url += 'cSistema=' + environment.SISTEMA;
          url += '&cForma=' + environment.FORM_SITE;
          condiciones += '\'536870925\'=\'' + this.site.nemonico + '\' ';
          condiciones += '\'8\'=\'' + this.site.nombre + '\' ';
          condiciones += '\'536870989\'=\'' + this.site.conectado + '\' ';
          condiciones += '\'536871141\'=\'' + this.site.ip + '\' ';
          condiciones += '\'1000000001\'=\'' + this.site.compania + '\' ';
          condiciones += '\'536878321\'=\'' + this.site.sitioAlarma + '\' ';
          condiciones += '\'536870914\'=\'' + this.site.region + '\' ';
          condiciones += '\'730000001\'=\'' + this.site.tecnologia + '\' ';
          condiciones += '\'536870974\'=\'' + this.site.tipo + '\' ';
          condiciones += '\'536871003\'=\'' + this.site.grupoSoporte + '\' ';
          for(let con of this.retornoTec){
            if(con.campo == '536870922'){
              condiciones += '\'536878271\'' + con.realcion + '\'' + con.valor + '\' ';
            }else if(con.campo == '536870914'){
              condiciones += '\'536878272\'' + con.realcion + '\'' + con.valor + '\' ';
            }else if(con.campo == '536870918'){
              condiciones += '\'536878317\'' + con.realcion + '\'' + con.valor + '\' ';
            }else if(con.campo == '536870921'){
              condiciones += '\'536878269\'' + con.realcion + '\'' + con.valor + '\' ';
            }else if(con.campo == '536870920'){
              condiciones += '\'536878270\'' + con.realcion + '\'' + con.valor + '\' ';
            }
          }
          url += '&cColumnas=' + condiciones;
          this.insertG.url = url;
          this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
            if(result.indexOf('<NUEVO>') >= 0){
              this.status = "Sitio insertado " + this.site.nemonico + " - " + this.site.nemonico + " - " + result.substring(result.indexOf('<NUEVO>') + '<NUEVO>'.length,result.indexOf('</NUEVO>'));
              this.showClass = 'progress-bar bg-success progress-bar-striped alta-progress';
              this.finishMethod( true, "Sitio creado correctamente " + result.substring(result.indexOf('<NUEVO>') + '<NUEVO>'.length,result.indexOf('</NUEVO>')));
            }else if(result.indexOf('<ERROR>') >= 0){
              this.status = "Error de datos " + this.site.nemonico;
              this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
              this.finishMethod( false, "Error en los datos ingresados: " + result.substring(result.indexOf('<ERROR>') + '<ERROR>'.length,result.indexOf('</ERROR>')));
            }else{
              this.status = 'Error desconocido ' + this.site.nemonico;
              this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
              this.finishMethod( false, "Error desconocido: " + result);
            }
          }, error =>{
            this.status = 'Error de conexion al insertar ' + this.site.nemonico;
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
