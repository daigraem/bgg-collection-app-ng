import { IDeserializable } from './deserializable.model';
import { IGameStats, GameStats } from './game-stats.model';
import { IGameVersion, GameVersion } from './game-version.model';

export interface IGame {
  _objectid: number;
  _subtype: string;
  originalname?: string;
  name: object;
  thumbnail: string;
  image: string;
  yearpublished: string;
  stats: IGameStats;
  version?: IGameVersion;
  isExpansion(): boolean;
  getName(): string;
  getTypeName(): string;
}

export class Game implements IGame, IDeserializable {
  _objectid: number;
  _subtype: string;
  originalname?: string;
  name: object;
  thumbnail: string;
  image: string;
  yearpublished: string;
  stats: IGameStats;
  version?: IGameVersion;

  isExpansion(): boolean {
    return this._subtype === 'boardgameexpansion';
  };

  getName(): string {
    return this.name["$"];
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

    if (!(input.stats instanceof GameStats)) {
      this.stats = new GameStats().deserialize(input.stats);
    }

    if (!(input.version instanceof GameVersion)) {
      if (input.version && input.version.item) {
        this.version = new GameVersion().deserialize(input.version.item[0]);
      } else {
        this.version = null;
      }
    }

    return this;
  }
}
