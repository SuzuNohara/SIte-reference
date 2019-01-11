import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CICMDB } from '../../implements/cmdb';
import { endStatus } from '../../implements/endStatus';
import { rmdSelect } from '../../implements/rmdSelect';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cmdb',
  templateUrl: './cmdb.component.html',
  styleUrls: ['./cmdb.component.css']
})
export class CMDBComponent implements OnInit {

  status: string;
  info: string;
  ci: CICMDB;

  showClass: string;

  @Input() public ciInput: CICMDB;
  @Output() public init = new EventEmitter<string>();
  @Output() public validate = new EventEmitter<string>();
  @Output() public finish = new EventEmitter<endStatus>();
  @Output() public report = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.status = "Inicializando";
    this.showClass = 'progress-bar bg-info progress-bar-striped progress-bar-animated alta-progress';
  }

  ngOnInit() {
    this.ci = this.ciInput;
    this.status = 'Inicializando';
    this.info = this.ci.name;
    this.process();
  }

  async process(){
    await this.delay(600);
    this.status = 'Validando';
    await this.delay(600);
    this.status = 'Obteniendo informacion';
    await this.delay(600);
    this.status = 'Generando conexiones';
    await this.delay(600);
    this.status = 'Compobando informacion';
    await this.delay(600);
    this.status = 'Terminado';
    this.showClass = 'progress-bar bg-success progress-bar-striped alta-progress';
    this.finishMethod(true, this.ci.name + " Terminó correctamente");
  }

  initMethod(){
    this.init.emit(this.ci.name);
  }

  validateMethod(){
    this.validate.emit(this.ci.name);
  }

  finishMethod(stat: boolean, message: string){
    let end: endStatus = new endStatus();
    end.status = stat;
    end.texto = message;
    this.finish.emit(end);
  }

  reportMethod(){
    this.report.emit(this.ci.name);
  }

  select(select: rmdSelect): Promise<rmdSelect>{
    return new Promise((resolve, reject) => {
      resolve(select);
    });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
