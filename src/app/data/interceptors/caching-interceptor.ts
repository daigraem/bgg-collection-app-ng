import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from '@data/services/cache/cache-map.service';
import { LoggerService } from '@services/logger/logger.service';
import { AppConfigService } from '@services/app-config/app-config.service';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  protected cacheableUrl = AppConfigService.config.apiUrl;

  constructor(private cache: CacheMapService, private logger: LoggerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRequestCachable(req)) {
      this.logger.log('[cache] Request is not cachable.');
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    if (cachedResponse !== null) {
      this.logger.log('[cache] Request served from cache.');
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.logger.log('[cache] Request response put to cache.');
          this.cache.put(req, event);
        }
      })
    );
  }
  private isRequestCachable(req: HttpRequest<any>) {
    return (req.method === 'GET') && (req.url.indexOf(this.cacheableUrl) > -1);
  }
}
