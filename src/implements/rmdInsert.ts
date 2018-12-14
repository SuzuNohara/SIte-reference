import { condicion } from './condicion';

export class rmdInsert{
    usuario: string;
    formulario: string;
    columnas: condicion[];
    condiciones: condicion[];
    url: string;
    rawResult?: string;
    succes: boolean;
    error:boolean;
    errorDesc: string;

    constructor(){
        this.usuario = "";
        this.formulario = "";
        this.columnas = [];
        this.condiciones = [];
        this.url = "";
        this.rawResult = "";
        this.succes = false;
        this.error = false;
        this.errorDesc = "";
    }
}