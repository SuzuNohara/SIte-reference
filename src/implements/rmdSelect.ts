import { idValue } from "./idValue";
import { entry } from "./entry";
import { condicion } from "./condicion";

export class rmdSelect{
    usuario: string;
    formulario: string;
    consulta: string;
    columnas: string[];
    condiciones: condicion[];
    url: string;
    result?: entry[];
    rawResult?: string;
    jsonResult?: JSON;
    error:boolean;
    errorDesc: string;

    constructor(){
        this.usuario = "";
        this.formulario = "";
        this.consulta = "";
        this.columnas = [];
        this.condiciones = [];
        this.url = "";
        this.result = [];
        this.rawResult = "";
        this.error = false;
    }

    printResult():void{
        for(let i = 0; i < this.result.length; i++){
            if(this.result[i]){
                console.log('-' + i);
                for(let j = 0; j < this.result[i].entrada.length; j++){
                    if(this.result[i].entrada[j]){
                        console.log('--' + this.result[i].entrada[j].id + ' - ' + this.result[i].entrada[j].valor);
                    }
                }
            }
        }
    }

    rawToResult():void {
        let aux: idValue = new idValue();
        let aux1: entry = new entry();
        let res: string = this.rawResult.trim();
        let result: string[];
        let resultres: string[];
        if(res){
            if(res.indexOf('<RESULTADO>') > 0){
                this.error = false;
                res = res.substr(res.indexOf('<RESULTADO>') + '<RESULTADO>'.length);
                res = res.substr(0, res.indexOf('</RESULTADO>'));
                res = res.substr('<Entry>'.length + 1);
                res = res.substr(0, res.length - '</Entry>'.length - 1);
                result = res.split('</Entry>\n<Entry>');
                for(let i: number = 0; i < result.length; i++){
                    result[i] = result[i].substr('<Field>'.length, result[i].length - '</Field>'.length);
                    resultres = result[i].split('</Field>\n<Field>');
                    for(let j = 0; j < resultres.length; j++){
                        let auxus: string = resultres[j];
                        aux.id = resultres[j].substr(auxus.indexOf('<id>') + '<id>'.length);
                        aux.id = aux.id.substr(0,aux.id.indexOf('</id>'));
                        aux.valor = resultres[j].substr(auxus.indexOf('<value>') + '<value>'.length);
                        aux.valor = aux.valor.substr(0, aux.valor.indexOf('</value>'));
                        aux1.entrada.push(aux);
                        aux = new idValue();
                    }
                    this.result.push(aux1);
                    aux1 = new entry();
                }
                // this.printResult();
            }else{
                this.error = true;
                this.errorDesc = "Resultado incompleto";
            }
        }
    }
}