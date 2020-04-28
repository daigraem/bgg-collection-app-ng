import { Deserializable } from './deserializable.model';
import { IBoardGameStats, BoardGameStats } from './board-game-stats.model';

export interface IBoardGame {
  _objectid: number;
  _subtype: string;
  originalname?: string;
  name: object;
  thumbnail: string;
  image: string;
  yearpublished: string;
  stats: IBoardGameStats;
  isExpansion(): boolean;
  getName(): string;
  getTypeName(): string;
}

export class BoardGame implements IBoardGame, Deserializable {
  _objectid: number;
  _subtype: string;
  originalname?: string;
  name: object;
  thumbnail: string;
  image: string;
  yearpublished: string;
  stats: IBoardGameStats;

  isExpansion(): boolean {
    return this._subtype === 'boardgameexpansion';
  };
  getName(): string {
    return this.name["__text"];
  }

  getTypeName(): string {
    let name: string;

    switch (this._subtype) {
      case 'boardgameexpansion':
        name = 'Expansion';
        break;
      default:
        name = 'Game';
        break;
    }

    return name;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    this.stats = new BoardGameStats().deserialize(input.stats);

    return this;
  }
}
