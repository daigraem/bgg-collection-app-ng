import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IGame } from '@data/schema/game.model';
import { JsonApiService } from '@data/services/json-api/json-api.service';

@Injectable({
  providedIn: 'root'
})
export class GameResolverService  implements Resolve<IGame> {
  constructor(
    private jsonApi: JsonApiService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.jsonApi.getGame(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
