import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) {
    this.logger.debug('Your log message goes here');
    this.logger.debug('Multiple', 'Argument', 'support');
    this.logger.error('Error de prueba');
  }

  public error(error: string){
    this.logger.error(error);
  }

  public info(info: string){
    this.logger.info('info');
  }

  public debug(debug: string){
    this.logger.debug(debug);
  }

  public warning(warning: string){
    this.logger.warn(warning);
  }
}
