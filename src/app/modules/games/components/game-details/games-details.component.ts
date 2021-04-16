import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGame } from '@data/schema/game.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  game: IGame;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadGame();
  }

  loadGame() {
    const game$ = this.route.data.pipe(map((data) => data.game));
    game$.subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (err) => console.error(err),
    });
  }
}
