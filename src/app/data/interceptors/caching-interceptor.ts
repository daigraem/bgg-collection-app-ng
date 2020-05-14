import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from '@data/services/cache/cache-map.service';
import { LoggerService } from '@shared/services/logger.service';

const CACHABLE_URL = '/api/collection';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
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
    return (req.method === 'GET') && (req.url.indexOf(CACHABLE_URL) > -1);
  }
}
