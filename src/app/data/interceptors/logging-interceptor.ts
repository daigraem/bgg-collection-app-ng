import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { LoggerService } from '@services/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private logger: LoggerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;

    return next.handle(req).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
          }
        },
        error => status = 'failed'
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message = `${req.method} ${req.urlWithParams} ${status} in ${elapsedTime}ms`;

        this.logDetails(message);
      })
    );
  }
  private logDetails(msg: string) {
    this.logger.log(msg);
  }
}
