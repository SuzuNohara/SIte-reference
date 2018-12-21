import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomatasService {

  constructor() { }

  public automatCRQ(crq: string): boolean{
    let retorno: boolean = this.crq001(crq,0);
    return retorno;
  }

  private crq001(crq:string, i: number): boolean{
    if(i == crq.length){
      return false;
    }else if(crq.charAt(i) == 'C'){
      return this.crq002(crq, i + 1);
    }else{
      return false;
    }
  }

  private crq002(crq:string, i: number): boolean{
    if(i == crq.length){
      return false;
    }else if(crq.charAt(i) == 'R'){
      return this.crq003(crq, i+1);
    }else{
      return false;
    }
  }

  private crq003(crq:string, i: number): boolean{
    if(i == crq.length){
      return false;
    }else if(crq.charAt(i) == 'Q'){
      return this.crq004(crq, i+1);
    }else{
      return false;
    }
  }

  private crq004(crq:string, i:number): boolean{
    if(i == crq.length){
      return false;
    }else if(crq.charAt(i) == '0'){
      return this.crq004(crq,i+1);
    }else if(crq.charAt(i) == '1' || crq.charAt(i) == '2' || crq.charAt(i) == '3' || crq.charAt(i) == '4' || crq.charAt(i) == '5' || crq.charAt(i) == '6' || crq.charAt(i) == '7' || crq.charAt(i) == '8' || crq.charAt(i) == '9'){
      return this.crq005(crq, i + 1);
    }else{
      return false;
    }
  }

  private crq005(crq:string, i: number): boolean{
    if(i == crq.length){
      return true;
    }else if(crq.charAt(i) == '0' || crq.charAt(i) == '1' || crq.charAt(i) == '2' || crq.charAt(i) == '3' || crq.charAt(i) == '4' || crq.charAt(i) == '5' || crq.charAt(i) == '6' || crq.charAt(i) == '7' || crq.charAt(i) == '8' || crq.charAt(i) == '9'){
      return this.crq005(crq, i+1);
    }else{
      return false;
    }
  }
}
