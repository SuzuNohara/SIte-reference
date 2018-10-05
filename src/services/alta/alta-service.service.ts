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
    
    return retorno;
  }
}
