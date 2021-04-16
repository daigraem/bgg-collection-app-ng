import { IDeserializable } from './deserializable.model';

export interface IGameStats {
  rating: any;
  _minplayers?: number;
  _maxplayers?: number;
  _playingtime?: number;
  _minplaytime?: number;
  _maxplaytime?: number;
  getPlayerCount(): string;
  getPlaytime(): string;
  getRating(): number;
}

export class GameStats implements IGameStats, IDeserializable {
  rating: any;
  _minplayers?: number;
  _maxplayers?: number;
  _playingtime?: number;
  _minplaytime?: number;
  _maxplaytime?: number;

  getPlayerCount(): string {
    return this._minplayers === this._maxplayers
      ? `${this._minplayers}`
      : `${this._minplayers} - ${this._maxplayers}`;
  }

  getPlaytime(): string {
    return this._minplaytime === this._maxplaytime
      ? `${this._playingtime}`
      : `${this._minplaytime} - ${this._maxplaytime}`;
  }

  getRating(): number {
    return this.rating.average._value;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
