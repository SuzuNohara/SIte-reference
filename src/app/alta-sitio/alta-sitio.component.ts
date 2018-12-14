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
    console.log(url);
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
      }
      if(this.retornoTec.length == 0){
        this.status = "Error en tecnologia y tipo de sitio";
        this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
      }else{
        console.log("Inicia construccion de insert");
        for(let con of this.retornoTec){
            this.insertG.columnas.push(con);
        }
        let url: string = environment.URL_INSERT;
        let condiciones: string = "";
        url += 'cSistema=' + environment.SISTEMA;
        url += '&cForma=' + this.insertG.formulario;
        for(let i = 0; i < this.insertG.columnas.length; i++){
            condiciones += '\'' + this.insertG.condiciones[i].campo + '\'' + this.insertG.condiciones[i].realcion + '\'' + this.insertG.condiciones[i].valor + '\' ';
        }
        url += '&cColumnas=' + condiciones;
        this.insertG.url = url;
        console.log(url);
        /*this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
            
        }, error =>{
            
        });*/
      }
    }, error =>{
      this.status = 'Error en la consulta';
      this.showClass = 'progress-bar bg-danger progress-bar-striped alta-progress';
    });
  }

  initMethod(){
    this.init.emit(this.site.numero);
  }

  validateMethod(){
    this.validate.emit(this.site.numero);
  }

  finishMethod(){
    let end: endStatus = new endStatus();
    end.status = true;
    end.texto = "Termina correctamente";
    this.finish.emit(end);
  }

  reportMethod(){
    this.report.emit(this.site.numero);
  }

}
