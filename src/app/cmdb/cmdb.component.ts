import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CICMDB } from '../../implements/cmdb';
import { endStatus } from '../../implements/endStatus';
import { rmdSelect } from '../../implements/rmdSelect';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
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

  constructor(private http: Http) {
    this.status = "Inicializando";
    this.showClass = 'progress-bar bg-info progress-bar-striped progress-bar-animated alta-progress';
  }

  ngOnInit() {
    this.ci = this.ciInput;
    this.status = 'Inicializando';
    this.info = this.ci.name;
    this.process();
  }

  process(){
    
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
}
