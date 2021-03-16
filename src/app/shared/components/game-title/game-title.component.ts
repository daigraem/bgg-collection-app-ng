import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '@data/schema/game.model';

@Component({
  selector: 'app-game-title',
  templateUrl: './game-title.component.html',
  styleUrls: ['./game-title.component.scss']
})
export class GameTitleComponent implements OnInit {

  @Input() game: IGame;
  @Input() context = 'list';
  versionName: string;
  versionYear: string;

  constructor() { }

  ngOnInit(): void {
    if (this.game.version) {
      this.versionName =  this.game.version.name._value;
      this.versionYear = this.game.version.yearpublished._value;
    }
  }

}
