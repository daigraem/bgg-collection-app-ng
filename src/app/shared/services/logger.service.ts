import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface ILoggerService {
  log(message?: any, ...optionalParams: any[]): void;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILoggerService {
  log(message?: any, ...optionalParams: any[]): void {
    if (!environment.production)
      console.log(message, ...optionalParams);
  }
}
