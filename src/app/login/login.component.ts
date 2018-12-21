import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { environment } from '../../environments/environment'
import { AlertaComponent } from '../alerta/alerta.component'
import { CookieService } from 'ngx-cookie-service';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  @Output() session = new EventEmitter<boolean>();

  usuarioModel: string;
  usuarioDis: boolean;
  contraModel: string;
  contraDis: boolean;
  processing: boolean;
  progreso: string;

  constructor(private http: Http, private cookieService: CookieService, private router: Router) {
    this.progreso = "Iniciando sesion...";
    this.usuarioDis = false;
    this.contraDis = false;
    this.processing = false;
    this.usuarioModel = "";
    this.contraModel = "";
  }

  ngOnInit() {}

  login(){
    if(this.usuarioModel.length > 0 && this.contraModel.length > 0){
      this.usuarioDis = true;
      this.contraDis = true;
      this.processing = true;
      if(this.usuarioModel == environment.USER_ROOT && this.contraModel == environment.PASS_ROOT){
        this.progreso = "Acceso corrrecta";
        this.cookieService.set(environment.SESSION_COOKIE,'zzzROOT');
        this.session.emit(true);
        window.location.href = './SitiosV3';
      }else{
        this.validaUsuario();
      }
    }else{
      this.alerta.setInfo("Error al iniciar sesión", "<p>No has ingresado los parametros de usuario y contraseña requeridos</p>", "OK");
      this.alerta.show();
    }
  }

  validaUsuario(){
    this.progreso = "Validando credenciales...";
    if(this.usuarioModel.split(".")[0] == this.contraModel){
      this.progreso = "Validando grupos de soporte";
      let select = new rmdSelect();
      let con: condicion = new condicion();
      select.columnas.push('1');
      con.campo = '4';
      con.realcion = '=';
      con.valor = this.usuarioModel;
      select.condiciones.push(con);
      con = new condicion();
      con.campo = '1000000079';
      con.realcion = '=';
      con.valor = environment.QUERY_GRUP;
      select.condiciones.push(con);
      select.formulario = environment.FORM_GRUP_ASS;
      select.usuario = environment.SISTEMA;

      let url: string = environment.URL_SELECT;
      let condiciones: string = "";
      url += 'cSistema=' + environment.SISTEMA;
      url += '&cForma=' + select.formulario;
      url += '&cColumnas=' + select.columnas.join(' ');
      for(let i = 0; i < select.condiciones.length; i++){
        condiciones += '\'' + select.condiciones[i].campo + '\'' + select.condiciones[i].realcion + '\'' + select.condiciones[i].valor + '\' ';
      }
      url += '&cCondiciones=' + condiciones;
      select.url = url;
      this.http.get(url).pipe(map(res => res.text())).subscribe(result => {
        select.rawResult = result;
        select.rawToResult();
        if(select.error){
          this.usuarioDis = false;
          this.contraDis = false;
          this.progreso = "";
          this.processing = false;
          this.alerta.setInfo("Error al iniciar sesión", "<p>Hubo un error al validar tus grupos de soporte, intenta nuevamente o verifica que los grupos de soporte a los que perteneces tengan el acceso permitido a éste sistema</p>", "OK");
          this.alerta.show();
        }else{
          if(select.result.length > 0){
            this.progreso = "Acceso correcto";
            this.cookieService.set(environment.SESSION_COOKIE, this.usuarioModel);
            this.session.emit(true);
            window.location.href = './SitiosV3';
          }
        }
      }, error =>{
        this.usuarioDis = false;
          this.contraDis = false;
          this.progreso = "";
          this.processing = false;
          this.alerta.setInfo("Error al iniciar sesión", "<p>Error al conectarse con el servidor, intentalo de nuevo</p><p>" + error + "</p>", "OK");
          this.alerta.show();
      });
    }else{
      this.usuarioDis = false;
      this.contraDis = false;
      this.progreso = "";
      this.processing = false;
      this.alerta.setInfo("Error al iniciar sesión", "<p>La combinación de usuario y contraseña no es valida</p>", "OK");
      this.alerta.show();
    }
  }
}
