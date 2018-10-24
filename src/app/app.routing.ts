import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaComponent } from './alta/alta.component';
import { ConexionesComponent } from './conexiones/conexiones.component';
import { EstadoComponent } from './estado/estado.component';
import { GruposComponent } from './grupos/grupos.component';
import { NombreComponent } from './nombre/nombre.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ApiDevComponent } from './api-dev/api-dev.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/api', pathMatch: 'full' },
    { path: 'api', component: ApiDevComponent }
    /*
    { path: 'alta', component: AltaComponent },
    { path: 'conectado', component: ConexionesComponent },
    { path: 'estado', component: EstadoComponent },
    { path: 'grupos', component: GruposComponent },
    { path: 'nombre', component: NombreComponent },
    { path: 'prioridad', component: PrioridadComponent},
    { path: 'tecnologia', component: TecnologiaComponent },
    { path: 'inicio', component: InicioComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/inicio'}*/
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);