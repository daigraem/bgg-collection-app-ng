import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBoardGame } from '@data/schema/board-game.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  game: IBoardGame;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadGame();
  }

  loadGame() {
    let game$ = this.route.data.pipe(map(data => data.game));
    game$.subscribe({
      next: game => {
        this.game = game;
      },
      error: err => console.log(err)
    });
  }

}
