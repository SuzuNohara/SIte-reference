import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AltaComponent } from './alta/alta.component';
import { ConexionesComponent } from './conexiones/conexiones.component';
import { NombreComponent } from './nombre/nombre.component';
import { EstadoComponent } from './estado/estado.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { GruposComponent } from './grupos/grupos.component';
import { PrioridadComponent } from './prioridad/prioridad.component';

import { HttpModule } from '@angular/http';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }