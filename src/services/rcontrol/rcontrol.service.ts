import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { rmdSelect } from '../../implements/rmdSelect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RcontrolService {

  constructor(private http: Http) { }

  async select(seleccion: rmdSelect): Promise<rmdSelect>{
    if(!seleccion.url){
      let url: string = environment.URL_SELECT;
      let condiciones: string = "";
      url += 'cSistema=' + environment.SISTEMA;
      url += '&cForma=' + seleccion.formulario;
      url += '&cColumnas=' + seleccion.columnas.join(' ');
      for(let i = 0; i < seleccion.condiciones.length; i++){
        condiciones += '\'' + seleccion.condiciones[i].campo + '\'' + seleccion.condiciones[i].realcion + '\'' + seleccion.condiciones[i].valor + '\' ';
      }
      url += '&cCondiciones=' + condiciones;
      seleccion.url = url;
    }
    seleccion.rawResult = <string>await this.getMethod(seleccion.url);
    return seleccion;
  }

  private getMethod(url: string):string{
    let retorno;
    this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
      retorno = result;
    });
    return retorno;
  }
}
