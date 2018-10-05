import { Injectable } from '@angular/core';
import TsMap from 'ts-map';

@Injectable({
  providedIn: 'root'
})
export class XmlParserService {

  constructor() { }

  parseMap(raw: string): any{
    let retorno = new TsMap();
    
    return retorno;
  }
}