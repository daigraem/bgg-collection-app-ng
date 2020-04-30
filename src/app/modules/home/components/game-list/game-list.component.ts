import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '@data/schema/game.model';
import { JsonApiService } from '@data/service/json-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: IGame[] = [];
  updated: string;
  total: number;

  constructor(
    private jsonApi: JsonApiService
  ) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection() {
    this.jsonApi.getCollection().subscribe({
      next: collection => {
        this.games = collection.item;
        this.updated = collection._pubdate;
        this.total = collection._totalitems;
      },
      error: err => console.log(err)
    });
  }

}
