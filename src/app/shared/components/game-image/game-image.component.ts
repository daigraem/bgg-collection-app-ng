import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { IGame } from '@data/schema/game.model';

@Component({
  selector: 'app-game-image',
  templateUrl: './game-image.component.html',
  styleUrls: ['./game-image.component.scss']
})
export class GameImageComponent implements OnInit, DoCheck {

  @Input() game: IGame;
  @Input() context = 'list';
  src: string;

  constructor() { }

  ngOnInit(): void {
    this.setSrc();
  }

  ngDoCheck(): void {
    this.setSrc();
  }

  private setSrc(): void {
    if (this.game.version && this.game.version.image) {
      this.src = this.context === 'details' ? this.game.version.image : this.game.version.thumbnail;
    } else {
      this.src = this.context === 'details' ? this.game.image : this.game.thumbnail;
    }
  }
}
