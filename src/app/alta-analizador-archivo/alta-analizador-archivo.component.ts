import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-analizador-archivo',
  templateUrl: './alta-analizador-archivo.component.html',
  styleUrls: ['./alta-analizador-archivo.component.css']
})
export class AltaAnalizadorArchivoComponent implements OnInit {

  estado: string;
  cargaN: number;

  constructor() { }

  ngOnInit() {
    this.cargaN = 0;
    this.estado = 'progress-bar bg-dark';
  }

  cargaEmulate(num: number){
    if(num == 100){
      return true;
    }else{
      this.cargaN += 1;
      this.delay(1);
      return this.cargaEmulate(num + 1);
    }
  }

  async delay(ms: number) {
    let some: number;
    for(let i = 0; i < (10000 * ms); i++){
      some = 12873109 + 1912093890123;
    }
  }

}
