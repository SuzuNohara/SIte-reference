import { rmdSelect } from './rmdSelect';
import { rmdInsert } from './rmdInsert';
import { condicion } from './condicion';
import { environment } from '../environments/environment';

export class sitio{

    numero: number;
    compania: string;
    nemonico: string;
    nombre: string;
    region: string;
    tecnologia: string;
    conectado: string;
    tipo: string;
    grupoSoporte: string;
    sitioAlarma: string;
    ip: string;
    status: number;

    private retornoTec: condicion[];
    private insertG: rmdInsert;

    constructor(){
        this.numero = 0;
        this.compania = "";
        this.nemonico = "";
        this.nombre = "";
        this.region = "";
        this.tecnologia = "";
        this.conectado = "";
        this.tipo = "";
        this.grupoSoporte = "";
        this.sitioAlarma = "";
        this.ip = "";
        this.status = 0;
    }

    async insert(): Promise<string>{
        let retorno: string = "";
        this.insertG = new rmdInsert();
        let cond: condicion;
        this.insertG.usuario = environment.SISTEMA;
        cond = new condicion();
        cond.campo = "536870925";
        cond.realcion = "=";
        cond.valor = this.nombre;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "8";
        cond.realcion = "=";
        cond.valor = this.nemonico;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536870989";
        cond.realcion = "=";
        cond.valor = this.conectado;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536871141";
        cond.realcion = "=";
        cond.valor = this.ip;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "1000000001";
        cond.realcion = "=";
        cond.valor = this.compania;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536878321";
        cond.realcion = "=";
        cond.valor = this.sitioAlarma;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536870914";
        cond.realcion = "=";
        cond.valor = this.region;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "730000001";
        cond.realcion = "=";
        cond.valor = this.tecnologia;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536870974";
        cond.realcion = "=";
        cond.valor = this.tipo;
        this.insertG.columnas.push(cond);
        cond = new condicion();
        cond.campo = "536871003";
        cond.realcion = "=";
        cond.valor = this.grupoSoporte;
        this.insertG.columnas.push(cond);
        await this.selectParams();
        return new Promise<string>(resolve => retorno);
    }

    update(fields: string[]): string{
        let retorno: string;

        return retorno;
    }

    select(){

    }

    private async selectParams(){
        this.retornoTec = [];
        let select: rmdSelect = new rmdSelect();
        let cond: condicion;
        for(let col of environment.COL_AMX){
            select.columnas.push(col);
        }
        cond = new condicion();
        cond.campo = "536870913";
        cond.realcion = "=";
        cond.valor = this.tecnologia;
        select.condiciones.push(cond);
        cond = new condicion();
        cond.campo = "536870923";
        cond.realcion = "=";
        cond.valor = this.tipo;
        select.condiciones.push(cond);
        select.usuario = environment.SISTEMA;
        select.formulario = environment.FORM_AMX;
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
        console.log(url);
        /*await this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
            select.rawResult = result;
            select.rawToResult();
            if(select.error){
                this.retornoTec = [];
            }else{
                for(let i = 0; i < 1 && i < select.result.length; i++){
                    for(let id of select.result[i].entrada){
                        let con: condicion = new condicion();
                        con.campo = id.id;
                        con.realcion = "=";
                        con.valor = id.valor;
                        this.retornoTec.push(con);
                    }
                }
            }
            if(this.retornoTec.length == 0){
                
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
                /*
                this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
                    
                }, error =>{
                    
                });
            }
        }, error =>{
            this.retornoTec = [];
        });*/
    }
}