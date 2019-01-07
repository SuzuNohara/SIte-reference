import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { Router } from "@angular/router"
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  activeSession: boolean;
  sessionName: string;
  userLoged: string;
  logoRef: string;
  key;
  sessionRoot: boolean;

  @HostListener('document:keypress', ['$event']) handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
    if(this.activeSession){
      switch(this.key){
        case 'a':
          this.router.navigate(['/alta']);
        break;
        case 'o':
          this.router.navigate(['/conectado']);
        break;
        case 'e':
          this.router.navigate(['/estado']);
        break;
        case 'g':
          this.router.navigate(['/grupos']);
        break;
        case 'n':
          this.router.navigate(['/nombre']);
        break;
        case 'p':
          this.router.navigate(['/prioridad']);
        break;
        case 't':
          if(this.sessionRoot){
            this.router.navigate(['/tecnologia']);
          }
        break;
        case 'm':
          if(this.sessionRoot){
            this.router.navigate(['/model']);
          }
        break;
      }
    }
  }

  constructor(private cookies: CookieService, private router: Router){
    this.sessionRoot = false;
    this.logoRef = environment.AUTO_REFERENCE + "/img/sitios.png";
    this.router.navigate(['/']);
    this.userLoged = "";
    this.activeSession = false;
    this.sessionName = cookies.get(environment.SESSION_COOKIE);
    if(this.sessionName.length > 0){
      this.sessionRoot = this.sessionName == environment.USER_ROOT;
      this.activeSession = true;
      this.userLoged = this.sessionName;
      this.router.navigate(['/']);
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
    window.location.href = './SitiosV3';
  }
}
