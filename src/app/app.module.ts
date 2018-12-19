import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AltaComponent } from './alta/alta.component';
import { ConexionesComponent } from './conexiones/conexiones.component';
import { NombreComponent } from './nombre/nombre.component';
import { EstadoComponent } from './estado/estado.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { GruposComponent } from './grupos/grupos.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { AltaAnalizadorArchivoComponent } from './alta-analizador-archivo/alta-analizador-archivo.component';
import { AlertaComponent } from './alerta/alerta.component';
import { InformacionComponent } from './informacion/informacion.component';
import { CookieService } from 'ngx-cookie-service';
import { AltaSitioComponent } from './alta-sitio/alta-sitio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SiteConectComponent } from './site-conect/site-conect.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaComponent,
    ConexionesComponent,
    NombreComponent,
    EstadoComponent,
    TecnologiaComponent,
    GruposComponent,
    PrioridadComponent,
    InicioComponent,
    LoginComponent,
    AltaAnalizadorArchivoComponent,
    AlertaComponent,
    InformacionComponent,
    AltaSitioComponent,
    SiteConectComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    routing,
    FormsModule,
    HttpModule,
    FontAwesomeModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }