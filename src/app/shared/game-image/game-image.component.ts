import { Component, OnInit, Input } from '@angular/core';
import { IGame } from '@data/schema/game.model';

@Component({
  selector: 'app-game-image',
  templateUrl: './game-image.component.html',
  styleUrls: ['./game-image.component.scss']
})
export class GameImageComponent implements OnInit {

  @Input() game: IGame;
  @Input() size: string = 'thumbnail';
  src: string;

  constructor() { }

  ngOnInit(): void {
    if (this.game.version && this.game.version.image) {
      this.src = this.size === 'full' ? this.game.version.image : this.game.version.thumbnail;
    } else {
      this.src = this.size === 'full' ? this.game.image : this.game.thumbnail;
    }
  }
}
