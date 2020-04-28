import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IAjaxResponse } from '@data/schema/ajax-response.model';
import { IBoardGame, BoardGame } from '@data/schema/board-game.model';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  private apiUrl = './api/collection.json';

  constructor(private http: HttpClient) { }

  getResponse(): Observable<IAjaxResponse<IBoardGame[]>> {
    return this.http.get<IAjaxResponse<IBoardGame[]>>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCollection(): Observable<IBoardGame[]> {
    return this.getResponse()
      .pipe(
        map((response: IAjaxResponse<IBoardGame[]>): IBoardGame[] => response.data),
        map(data => data.map(data => new BoardGame().deserialize(data)))
      );
  }

  getGame(id: number): Observable<IBoardGame | undefined> {
    return this.getResponse()
      .pipe(
        map((response: IAjaxResponse<IBoardGame[]>) => response.data.find(g => g._objectid === id)),
        map(data => new BoardGame().deserialize(data))
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
