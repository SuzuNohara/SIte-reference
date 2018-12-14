import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { Router } from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  activeSession: boolean;
  sessionName: string;
  userLoged: string;

  constructor(private cookies: CookieService, private router: Router){
    this.router.navigate(['/inicio']);
    this.userLoged = "";
    this.activeSession = false;
    this.sessionName = cookies.get(environment.SESSION_COOKIE);
    if(this.sessionName.length > 0){
      this.activeSession = true;
      this.userLoged = this.sessionName;
      this.router.navigate(['/inicio']);
    }
  }

  onSession(session: boolean){
    let cookie: CookieService;
    this.sessionName = cookie.get(environment.SESSION_COOKIE);
    if(this.sessionName){
      this.activeSession = true;
    }
  }

  cerrarSesion(){
    this.cookies.delete(environment.SESSION_COOKIE);
    window.location.reload();
  }
}
