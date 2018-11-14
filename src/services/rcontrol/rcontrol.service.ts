import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RcontrolService {

  constructor(private http: Http) { }

  select(seleccion: rmdSelect): rmdSelect{
    if(!seleccion.url){
      let url: string = environment.URL_SELECT;
      let condiciones: string = "";
      url += 'cSistema=' + environment.SISTEMA;
      url += '&cForma=' + seleccion.formulario;
      url += '&cColumnas=' + seleccion.columnas.join(' ');
      for(let i; i < seleccion.condiciones.length; i++){
        if(i % 2 == 0){
          condiciones += ' \'' + seleccion.condiciones[i].campo + '\'';
        }else{
          condiciones += '=\'' + seleccion.condiciones[i].valor + '\'';
        }
      }
      url += '&cCondiciones=' + condiciones;
      seleccion.url = url;
    }
    seleccion.rawResult = this.getMethod(seleccion.url);
    return seleccion;
  }

  insert(insercion: rmdInsert): rmdInsert{
    return insercion;
  }

  update(update: rmdUpdate): rmdUpdate{
    return update;
  }

  private getMethod(url: string):string{
    let retorno: string;
    this.http.get(url).pipe(map(res => res.json())).subscribe(result => {
      retorno = result;
    });
    return retorno;
  }

  private postMethod(url: string): string{
    let retorno: string;
    this.http.post(url, null).pipe(map(res => res.json())).subscribe(result => {
      retorno = result();
    });
    return retorno;
  }
}
