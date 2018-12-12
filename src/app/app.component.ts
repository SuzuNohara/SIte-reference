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

  constructor(private cookies: CookieService, private router: Router){
    this.router.navigate(['/inicio']);
    this.activeSession = false;
    this.sessionName = cookies.get(environment.SESSION_COOKIE);
    if(this.sessionName.length > 0){
      this.activeSession = true;
      this.router.navigate(['/inicio']);
    }
  }

  onSession(session: boolean){
    console.log("evento detectado");
    let cookie: CookieService;
    this.sessionName = cookie.get(environment.SESSION_COOKIE);
    if(this.sessionName){
      this.activeSession = true;
    }
  }
}
