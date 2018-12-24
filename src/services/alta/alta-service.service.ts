import { Injectable } from '@angular/core';
import { RcontrolService } from '../rcontrol/rcontrol.service';
import { environment } from '../../environments/environment';
import { AutomatasService } from '../automatas/automatas.service';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';

@Injectable({
  providedIn: 'root'
})
export class AltaServiceService {

  constructor(private rcontrol: RcontrolService, private automatas: AutomatasService){}

  select: rmdSelect;
  
  async validarCRQ(crq: string): Promise<boolean>{
    return new Promise<boolean>(resolve => {
        setTimeout(() => {
          let retorno: boolean = true;
          
        }, 1000);
    });
  }

  validarArchivo(archivo: string): string[]{
    let retorno:string[] = [];
    let index: number = 0;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){
      retorno.push("El documento no contiene sitios que dar de alta");
    }
    for(let linea of lines){
      if(index == 0){
        if(linea.indexOf(environment.ALTA_ENCABEZADOS) != 0){ 
          retorno.push("El encabezado no está en el formato: " + environment.ALTA_ENCABEZADOS);
        }
      }
      index++;
      if(linea.split(",").length != environment.ALTA_ENCABEZADOS.split(",").length){
        if(linea != '' && linea != '\n'){
          retorno.push("La linea " + index + " no posee el formato correcto");
        }
      }
    }
    return retorno;
  }

  validarArchivoConectado(archivo: string): string[]{
    let retorno:string[] = [];
    let index: number = 0;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){
      retorno.push("El documento no contiene sitios que dar de alta");
    }
    for(let linea of lines){
      if(index == 0){
        if(linea.indexOf(environment.CONN_ENCABEZADOS) != 0){ 
          retorno.push("El encabezado no está en el formato: " + environment.CONN_ENCABEZADOS);
        }
      }
      index++;
      if(linea.split(",").length != environment.CONN_ENCABEZADOS.split(",").length){
        if(linea != '' && linea != '\n'){
          retorno.push("La linea " + index + " no posee el formato correcto");
        }
      }
    }
    return retorno;
  }

  validarArchivoEstado(archivo: string): string[]{
    let retorno:string[] = [];
    let index: number = 0;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){
      retorno.push("El documento no contiene sitios que dar de alta");
    }
    for(let linea of lines){
      if(index == 0){
        if(linea.indexOf(environment.EST_ENCABEZADOS) != 0){ 
          retorno.push("El encabezado no está en el formato: " + environment.EST_ENCABEZADOS);
        }
      }
      index++;
      if(linea.split(",").length != environment.EST_ENCABEZADOS.split(",").length){
        if(linea != '' && linea != '\n'){
          retorno.push("La linea " + index + " no posee el formato correcto");
        }
      }
    }
    return retorno;
  }

  validarArchivoGrupo(archivo: string): string[]{
    let retorno:string[] = [];
    let index: number = 0;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){
      retorno.push("El documento no contiene sitios que dar de alta");
    }
    for(let linea of lines){
      if(index == 0){
        if(linea.indexOf(environment.GRUPO_ENCABEZADOS) != 0){ 
          retorno.push("El encabezado no está en el formato: " + environment.GRUPO_ENCABEZADOS);
        }
      }
      index++;
      if(linea.split(",").length != environment.GRUPO_ENCABEZADOS.split(",").length){
        if(linea != '' && linea != '\n'){
          retorno.push("La linea " + index + " no posee el formato correcto");
        }
      }
    }
    return retorno;
  }

  validarArchivoNombre(archivo: string): string[]{
    let retorno:string[] = [];
    let index: number = 0;
    let lines: string[] = archivo.split("\n");
    if(lines.length <= 1){
      retorno.push("El documento no contiene sitios que dar de alta");
    }
    for(let linea of lines){
      if(index == 0){
        if(linea.indexOf(environment.NOMBRE_ENCABEZADOS) != 0){ 
          retorno.push("El encabezado no está en el formato: " + environment.NOMBRE_ENCABEZADOS);
        }
      }
      index++;
      if(linea.split(",").length != environment.NOMBRE_ENCABEZADOS.split(",").length){
        if(linea != '' && linea != '\n'){
          retorno.push("La linea " + index + " no posee el formato correcto");
        }
      }
    }
    return retorno;
  }
}
