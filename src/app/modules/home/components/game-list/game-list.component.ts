import { Component, OnInit, Input } from '@angular/core';
import { IBoardGame } from '@data/schema/board-game.model';
import { JsonApiService } from '@data/service/json-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: IBoardGame[] = [];

  constructor(
    private jsonApi: JsonApiService
  ) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection() {
    this.jsonApi.getCollection().subscribe({
      next: games => {
        this.games = games;
      },
      error: err => console.log(err)
    });
  }

}
