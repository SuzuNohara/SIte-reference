import { Injectable } from '@angular/core';
import { RcontrolService } from '../rcontrol/rcontrol.service';

@Injectable({
  providedIn: 'root'
})
export class AltaServiceService {

  constructor(private rcontrol: RcontrolService){}
  
  validarCRQ(CRQ: string): boolean{
    let select : rmdSelect;
    select.columnas = ['','',''];
    //this.rcontrol.select();
    return true;
  }

  validarArchivo(archivo: string): boolean{
    let retorno:boolean = true;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){retorno = false;}
    for(let linea of lines){
      if(linea.split(",").length != 11){
        if(linea != '' && linea != '\n'){
          retorno = retorno && false;
        }
      }
    }
    //if(lines[0] != 'NUM,COMPANIA,NEMONICO,NOMBRE,REGION,TECNOLOGIA,SITIO CONECTADO A ,TIPO DE SITIO,GRUPO QUE ATIENDE,SITIO_ALARMA,IP'){retorno = false;}
    return retorno;
  }

  validarArchivoLog(archivo: string): string{
    let retorno: string = "<small><small>";
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){retorno += "<p>El archivo no contiene ningun registro para procesarse</p>";}
    /*if(lines[0] != 'NUM,COMPANIA,NEMONICO,NOMBRE,REGION,TECNOLOGIA,SITIO CONECTADO A ,TIPO DE SITIO,GRUPO QUE ATIENDE,SITIO_ALARMA,IP'){
      retorno += "<p>ERROR: El encabezado no cumple con el formato: NUM,COMPANIA,NEMONICO,NOMBRE,REGION,TECNOLOGIA,SITIO CONECTADO A ,TIPO DE SITIO,GRUPO QUE ATIENDE,SITIO_ALARMA,IP</p>";
    }*/
    for(let i: number = 0; i < lines.length; i++){
      if(lines[i].split(",").length != 11){
        if(lines[i] != '' && lines[i] != '\n'){
          retorno += "<p>ERROR: La linea " + i + " del documento no tiene el formato requerido</p>";
        }
      }
    }
    return retorno + "</small></small>";
  }
}
