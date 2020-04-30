import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IAjaxResponse } from '@data/schema/ajax-response.model';
import { IGame, Game } from '@data/schema/game.model';
import { ICollection, Collection } from '@data/schema/collection.model';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  private apiUrl = './api/collection.json';

  constructor(private http: HttpClient) { }

  getResponse(): Observable<IAjaxResponse<ICollection>> {
    return this.http.get<IAjaxResponse<ICollection>>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCollection(): Observable<ICollection> {
    return this.getResponse()
      .pipe(
        map((response: IAjaxResponse<ICollection>): ICollection => response.data),
        map(data => new Collection().deserialize(data))
      );
  }

  getGame(id: number): Observable<IGame | undefined> {
    return this.getCollection()
      .pipe(
        map((response: ICollection) => response.item.find(g => g._objectid === id)),
        map(data => new Game().deserialize(data))
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
