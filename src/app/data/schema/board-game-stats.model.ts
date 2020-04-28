import { Deserializable } from './deserializable.model';

export interface IBoardGameStats {
  rating: object;
  _minplayers: number;
  _maxplayers: number;
  getPlayerCount(): string;
  getRating(): number;
}

export class BoardGameStats implements IBoardGameStats, Deserializable {
  rating: object;
  _minplayers: number;
  _maxplayers: number;

  getPlayerCount(): string {
    return this._minplayers === this._maxplayers ? `${this._minplayers}` : `${this._minplayers} - ${this._maxplayers}`;
  };

  getRating(): number {
    return this.rating['average']['_value'];
  };

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
