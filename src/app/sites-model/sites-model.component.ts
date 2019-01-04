import { Component, OnInit } from '@angular/core';
import { bar } from '../../implements/bar';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { endStatus } from '../../implements/endStatus';
import { environment } from '../../environments/environment';
import { entry } from '../../implements/entry';
import { Nodo } from '../../implements/nodo';
import { Arista } from '../../implements/arista';
//import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-sites-model',
  templateUrl: './sites-model.component.html',
  styleUrls: ['./sites-model.component.css']
})
export class SitesModelComponent implements OnInit {

  lineChartData: Array<any>;
  lineChartLabels: Array<any>;
  lineChartOptions: any;
  lineChartColors: Array<any>;
  lineChartLegend: boolean;
  lineChartType: string;
  bars: bar[];
  nodos: Nodo[];
  arista: Arista[];
  private nuevos: number[];
  private operando: number[];
  private nooperando: number[];
  private desinstalado: number[];
  private cancelado: number[];
  private operandoData: entry[];

  constructor(private http: Http) {
    this.nodos = [];
    this.arista = [];
    this.operandoData = [];
    this.nuevos = [0,0,0,0];
    this.operando = [0,0,0,0];
    this.nooperando = [0,0,0,0];
    this.desinstalado = [0,0,0,0];
    this.cancelado = [0,0,0,0];
    this.lineChartData = [
      {data: this.operando, label: 'Operando'}
    ];
    this.lineChartLabels = ['Sin info', 'IP', 'Direccion', 'Coordenadas'];
    this.lineChartOptions = {responsive: true};
    this.lineChartLegend = false;
    this.lineChartType = 'line';
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(14,159,177,0.2)',
        borderColor: 'rgba(14,159,177,1)',
        pointBackgroundColor: 'rgba(14,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(14,159,177,0.8)'
      },{ // dark grey
        backgroundColor: 'rgba(148,15,177,0.2)',
        borderColor: 'rgba(148,15,177,1)',
        pointBackgroundColor: 'rgba(148,15,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,15,177,0.8)'
      },{ // grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },{ // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },{ // grey
        backgroundColor: 'rgba(148,159,17,0.2)',
        borderColor: 'rgba(148,159,17,1)',
        pointBackgroundColor: 'rgba(148,159,17,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,17,0.8)'
      }
    ];
    this.bars = [];
  }

  ngOnInit() {
    //this.sitiosNuevos();
    this.sitiosOperando();
    //this.sitiosNoOperando();
    //this.sitiosDesinstalados();
    //this.sitiosCancelados();
  }

  sitiosNuevos(): void{
    let barSN: bar = new bar();
    this.bars.push(barSN);
    let select: rmdSelect = new rmdSelect();
    barSN.title = "Consultando Sitios Nuevos";
    barSN.show = true;
    barSN.color = 'rgba(148,159,177,1)';
    let con: condicion = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '0';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000001';
    con.realcion = '=';
    con.valor = environment.COUNTRY_DEFAULT;
    select.condiciones.push(con);

    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + environment.FORM_SITE;
    url += '&cColumnas=1 536870925 1000000001 536870989 7 ' + environment.COORDS_FIELDS.join(' ') + ' ' + environment.ADRESS_FIELDS.join(' ') + ' ' + environment.IP_FIELD;
    for(let i = 0; i < select.condiciones.length; i++){
      condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      select.rawResult = result;
      select.rawToResult();
      barSN.carga = 100;
      if(select.error){
        barSN.title = "Nuevo (SIN DATOS)";
      }else{
        barSN.title = "Nuevos";
        for(let sitio of select.result){
          let coordenadas: boolean = true;
          let direccion: boolean = true;
          let ip: boolean = true;
          for(let field of sitio.entrada){
            if(environment.COORDS_FIELDS.indexOf(field.id)){
              coordenadas = coordenadas && field.valor != null && field.valor != "";
            }else if(environment.ADRESS_FIELDS.indexOf(field.id)){
              direccion = direccion && field.valor != null && field.valor != "";
            }else if(environment.IP_FIELD == field.id){
              ip = ip && field.valor != null && field.valor != "";
            }
          }
          if(coordenadas){
            this.nuevos[3]++;
          }else if(direccion){
            this.nuevos[2]++;
          }else if(ip){
            this.nuevos[1]++;
          }else{
            this.nuevos[0]++;
          }
        }
        this.lineChartData[0].data = this.nuevos;
        this.lineChartData = [
          {data: this.nuevos, label: 'Nuevo'},
          {data: this.operando, label: 'Operando'},
          {data: this.nooperando, label: 'No operando'},
          {data: this.desinstalado, label: 'Desinstalado'},
          {data: this.cancelado, label: 'Cancelado'}
        ];
      }
    }, error =>{
      //error
    });
  }

  sitiosOperando(): void{
    let barSN: bar = new bar();
    this.bars.push(barSN);
    let select: rmdSelect = new rmdSelect();
    barSN.title = "Consultando Sitios Operando";
    barSN.show = true;
    barSN.color = 'rgba(14,159,177,1)';
    let con: condicion = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '4';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000001';
    con.realcion = '=';
    con.valor = environment.COUNTRY_DEFAULT;
    select.condiciones.push(con);

    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + environment.FORM_SITE;
    url += '&cColumnas=1 536870925 1000000001 536870989 7 ' + environment.COORDS_FIELDS.join(' ') + ' ' + environment.ADRESS_FIELDS.join(' ') + ' ' + environment.IP_FIELD;
    for(let i = 0; i < select.condiciones.length; i++){
      condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      select.rawResult = result;
      select.rawToResult();
      barSN.carga = 100;
      if(select.error){
        barSN.title = "Operando (SIN DATOS)";
      }else{
        barSN.title = "Operando";
        for(let sitio of select.result){
          let coordenadas: boolean = true;
          let direccion: boolean = true;
          let ip: boolean = true;
          for(let field of sitio.entrada){
            if(environment.COORDS_FIELDS.indexOf(field.id)){
              coordenadas = coordenadas && field.valor != null && field.valor != "";
            }else if(environment.ADRESS_FIELDS.indexOf(field.id)){
              direccion = direccion && field.valor != null && field.valor != "";
            }else if(environment.IP_FIELD == field.id){
              ip = ip && field.valor != null && field.valor != "";
            }
          }
          if(coordenadas){
            this.operando[3]++;
            this.operandoData.push(sitio);
          }else if(direccion){
            this.operando[2]++;
          }else if(ip){
            this.operando[1]++;
          }else{
            this.operando[0]++;
          }
        }
        this.lineChartData[0].data = this.nuevos;
        this.lineChartData = [
          {data: this.operando, label: 'Operando'}
        ];
      }
      this.modelData();
    }, error =>{
      //error
    });
  }

  sitiosNoOperando(): void{
    let barSN: bar = new bar();
    this.bars.push(barSN);
    let select: rmdSelect = new rmdSelect();
    barSN.title = "Consultando Sitios No Operando";
    barSN.show = true;
    barSN.color = 'rgba(14,159,177,1)';
    let con: condicion = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '5';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000001';
    con.realcion = '=';
    con.valor = environment.COUNTRY_DEFAULT;
    select.condiciones.push(con);

    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + environment.FORM_SITE;
    url += '&cColumnas=1 536870925 1000000001 536870989 7 ' + environment.COORDS_FIELDS.join(' ') + ' ' + environment.ADRESS_FIELDS.join(' ') + ' ' + environment.IP_FIELD;
    for(let i = 0; i < select.condiciones.length; i++){
      condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      select.rawResult = result;
      select.rawToResult();
      barSN.carga = 100;
      if(select.error){
        barSN.title = "No Operando (SIN DATOS)";
      }else{
        barSN.title = "No Operando";
        for(let sitio of select.result){
          let coordenadas: boolean = true;
          let direccion: boolean = true;
          let ip: boolean = true;
          for(let field of sitio.entrada){
            if(environment.COORDS_FIELDS.indexOf(field.id)){
              coordenadas = coordenadas && field.valor != null && field.valor != "";
            }else if(environment.ADRESS_FIELDS.indexOf(field.id)){
              direccion = direccion && field.valor != null && field.valor != "";
            }else if(environment.IP_FIELD == field.id){
              ip = ip && field.valor != null && field.valor != "";
            }
          }
          if(coordenadas){
            this.nooperando[3]++;
          }else if(direccion){
            this.nooperando[2]++;
          }else if(ip){
            this.nooperando[1]++;
          }else{
            this.nooperando[0]++;
          }
        }
        this.lineChartData[0].data = this.nuevos;
        this.lineChartData = [
          {data: this.nuevos, label: 'Nuevo'},
          {data: this.operando, label: 'Operando'},
          {data: this.nooperando, label: 'No operando'},
          {data: this.desinstalado, label: 'Desinstalado'},
          {data: this.cancelado, label: 'Cancelado'}
        ];
      }
    }, error =>{
      //error
    });
  }

  sitiosDesinstalados(): void{
    let barSN: bar = new bar();
    this.bars.push(barSN);
    let select: rmdSelect = new rmdSelect();
    barSN.title = "Consultando Sitios Desinstalados";
    barSN.show = true;
    barSN.color = 'rgba(148,15,177,1)';
    let con: condicion = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '6';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000001';
    con.realcion = '=';
    con.valor = environment.COUNTRY_DEFAULT;
    select.condiciones.push(con);

    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + environment.FORM_SITE;
    url += '&cColumnas=1 536870925 1000000001 536870989 7 ' + environment.COORDS_FIELDS.join(' ') + ' ' + environment.ADRESS_FIELDS.join(' ') + ' ' + environment.IP_FIELD;
    for(let i = 0; i < select.condiciones.length; i++){
      condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      select.rawResult = result;
      select.rawToResult();
      barSN.carga = 100;
      if(select.error){
        barSN.title = "Desinstalado (SIN DATOS)";
      }else{
        barSN.title = "Desinstalado";
        for(let sitio of select.result){
          let coordenadas: boolean = true;
          let direccion: boolean = true;
          let ip: boolean = true;
          for(let field of sitio.entrada){
            if(environment.COORDS_FIELDS.indexOf(field.id)){
              coordenadas = coordenadas && field.valor != null && field.valor != "";
            }else if(environment.ADRESS_FIELDS.indexOf(field.id)){
              direccion = direccion && field.valor != null && field.valor != "";
            }else if(environment.IP_FIELD == field.id){
              ip = ip && field.valor != null && field.valor != "";
            }
          }
          if(coordenadas){
            this.desinstalado[3]++;
          }else if(direccion){
            this.desinstalado[2]++;
          }else if(ip){
            this.desinstalado[1]++;
          }else{
            this.desinstalado[0]++;
          }
        }
        this.lineChartData[0].data = this.nuevos;
        this.lineChartData = [
          {data: this.nuevos, label: 'Nuevo'},
          {data: this.operando, label: 'Operando'},
          {data: this.nooperando, label: 'No operando'},
          {data: this.desinstalado, label: 'Desinstalado'},
          {data: this.cancelado, label: 'Cancelado'}
        ];
      }
    }, error =>{
      //error
    });
  }

  sitiosCancelados(): void{
    let barSN: bar = new bar();
    this.bars.push(barSN);
    let select: rmdSelect = new rmdSelect();
    barSN.title = "Consultando Sitios Cancelados";
    barSN.show = true;
    barSN.color = 'rgba(148,159,17,1)';
    let con: condicion = new condicion();
    con.campo = '7';
    con.realcion = '=';
    con.valor = '7';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000001';
    con.realcion = '=';
    con.valor = environment.COUNTRY_DEFAULT;
    select.condiciones.push(con);

    let url: string = environment.URL_SELECT;
    let condiciones: string = "";
    url += 'cSistema=' + environment.SISTEMA;
    url += '&cForma=' + environment.FORM_SITE;
    url += '&cColumnas=1 536870925 1000000001 536870989 7 ' + environment.COORDS_FIELDS.join(' ') + ' ' + environment.ADRESS_FIELDS.join(' ') + ' ' + environment.IP_FIELD;
    for(let i = 0; i < select.condiciones.length; i++){
      condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
    }
    url += '&cCondiciones=' + condiciones;
    select.url = url;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      select.rawResult = result;
      select.rawToResult();
      barSN.carga = 100;
      if(select.error){
        barSN.title = "Cancelado (SIN DATOS)";
      }else{
        barSN.title = "Cancelado";
        for(let sitio of select.result){
          let coordenadas: boolean = true;
          let direccion: boolean = true;
          let ip: boolean = true;
          for(let field of sitio.entrada){
            if(environment.COORDS_FIELDS.indexOf(field.id)){
              coordenadas = coordenadas && field.valor != null && field.valor != "";
            }else if(environment.ADRESS_FIELDS.indexOf(field.id)){
              direccion = direccion && field.valor != null && field.valor != "";
            }else if(environment.IP_FIELD == field.id){
              ip = ip && field.valor != null && field.valor != "";
            }
          }
          if(coordenadas){
            this.cancelado[3]++;
          }else if(direccion){
            this.cancelado[2]++;
          }else if(ip){
            this.cancelado[1]++;
          }else{
            this.cancelado[0]++;
          }
        }
        this.lineChartData[0].data = this.nuevos;
        this.lineChartData = [
          {data: this.nuevos, label: 'Nuevo'},
          {data: this.operando, label: 'Operando'},
          {data: this.nooperando, label: 'No operando'},
          {data: this.desinstalado, label: 'Desinstalado'},
          {data: this.cancelado, label: 'Cancelado'}
        ];
      }
    }, error =>{
      //error
    });
  }

  async modelData(){
    let limites: number[] = [-90,-180,90,180];
    for(let site of this.operandoData){
      for(let ent of site.entrada){
        if(ent.id == '536870994'){ // latitud (vertical)
          if(Number(ent.valor) > limites[0]){limites[0] = Number(ent.valor);}
          if(Number(ent.valor) < limites[2]){limites[2] = Number(ent.valor);}
        }else if(ent.id == '536870993'){ // Lingitud (horizontal)
          if(Number(ent.valor) > limites[1]){limites[1] = Number(ent.valor);}
          if(Number(ent.valor) < limites[3]){limites[3] = Number(ent.valor);}
        }
      }
    }
    for(let i: number = 0; i < limites.length; i++){
      limites[i] = Math.floor(limites[i]) + (limites[i] > 0? 1:0);
    }
    for(let site of this.operandoData){
      let nodo: Nodo = new Nodo();
      nodo.bgcolor = 'rgba(14,159,177,1)';
      nodo.border = 0.05;
      nodo.font = 0.1;
      nodo.informacion = '<p><n><c><l><lo></p>';
      for(let data of site.entrada){
        if(data.id == '536870925'){
          nodo.informacion = nodo.informacion.replace('<n>','Nemonico: ' + data.valor + '<br>');
          nodo.identificador = data.valor;
        } else if(data.id == '1000000001'){
          nodo.informacion = nodo.informacion.replace('<c>','Compañía: ' + data.valor + '<br>');
        } else if(data.id == '536870994'){
          nodo.informacion = nodo.informacion.replace('<l>','Latitud: ' + data.valor + '<br>');
          nodo.top = (Number(data.valor) - limites[0])*(-50);
        } else if(data.id == '536870993'){
          nodo.informacion = nodo.informacion.replace('<lo>','Longitud: ' + data.valor + '');
          nodo.left = (Number(data.valor) - limites[3])*(50);
        }else if(data.id == '536870989'){nodo.relaciones = [data.valor];}
      }
      nodo.opacidad = 1;
      nodo.padding = 0.4;
      nodo.posicion = 0;
      nodo.radius = 0.5;
      nodo.relval = [];
      nodo.size = 1;
      nodo.value = '-';
      nodo.visitado = false;
      this.nodos.push(nodo);
      console.log(nodo.left + '*' + nodo.top);
    }
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
