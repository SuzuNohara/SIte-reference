import { condicion } from './condicion';

export class rmdUpdate{
    usuario: string;
    formulario: string;
    id: string;
    campos: condicion[];
    url: string;
    rawResult?: string;
    succes: boolean;
    error:boolean;
    errorDesc: string;

    constructor(){
        this.usuario = "";
        this.formulario = "";
        this.id = "";
        this.campos = [];
        this.url = "";
        this.rawResult = "";
        this.succes = false;
        this.error = false;
        this.errorDesc = "";
    }
}