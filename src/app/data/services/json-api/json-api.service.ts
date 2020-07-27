import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAjaxResponse } from '@data/schema/ajax-response.model';
import { IGame, Game } from '@data/schema/game.model';
import { ICollection, Collection } from '@data/schema/collection.model';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  private apiUrl = '/api/collection';

  constructor(private http: HttpClient) { }

  getResponse(): Observable<IAjaxResponse<ICollection>> {
    return this.http.get<IAjaxResponse<ICollection>>(this.apiUrl);
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
}
