import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RcontrolService {

  constructor(http: HttpClient) { }

  select(seleccion: rmdSelect): rmdSelect{
    
    
    return seleccion;
  }
}
