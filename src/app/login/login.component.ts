import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { environment } from '../../environments/environment'
import { AlertaComponent } from '../alerta/alerta.component'
import { CookieService } from 'ngx-cookie-service';
import { rmdSelect } from '../../implements/rmdSelect';
import { condicion } from '../../implements/condicion';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


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

  constructor(private http: Http, private cookieService: CookieService) {
    this.progreso = "Iniciando sesion..."
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
        console.log("sesion correcta");
        this.cookieService.set(environment.SESSION_COOKIE,'zzzROOT');
        this.session.emit(true);
        window.location.reload();
      }else{
        this.validaUsuario();
      }
    }else{
      this.alerta.setInfo("Error al iniciar sesión", "<p>No has ingresado los parametros de usuario y contraseña requeridos</p>", "OK");
      this.alerta.show();
    }
  }

  validaUsuario(){
    /*let select = new rmdSelect();
    let con: condicion = new condicion();
    select.columnas.push('1');
    con.campo = '7';
    con.realcion = '=';
    con.valor = '7';
    select.condiciones.push(con);
    con = new condicion();
    con.campo = '1000000182';
    con.realcion = '=';
    con.valor = this.crqModel;
    select.condiciones.push(con);
    select.formulario = environment.FORM_CR;
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
      this.validaCRcarga = 100;
      if(select.error){
        this.crqClass = "form-control is-invalid";
        this.validaCRtext = "El CRQ no es valido";
        this.validaCRclass = 'progress-bar bg-danger';
      }else{
        this.validaCRtext = "El CRQ es valido";
        this.crqClass = "form-control is-valid";
        this.validaCRclass = 'progress-bar bg-success';
      }
    });*/
  }
}
