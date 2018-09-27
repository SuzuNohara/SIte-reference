import { Injectable } from '@angular/core';
import { RcontrolService } from '../rcontrol/rcontrol.service';

@Injectable({
  providedIn: 'root'
})
export class AltaServiceService {

  constructor(rcontrol: RcontrolService){}
  
  validarCRQ(CRQ: string): boolean{
    
    return true;
  }
}
