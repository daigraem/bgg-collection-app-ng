import { IGame, Game } from './game.model';
import { IDeserializable } from './deserializable.model';

export interface ICollection {
  item: IGame[];
  _totalitems: number;
  _pubdate: string;
}

export class Collection implements ICollection, IDeserializable {
  item: IGame[];
  _totalitems: number;
  _pubdate: string;

  deserialize(input: any): this {
    Object.assign(this, input.items);
    this.item = this.item.map(item => new Game().deserialize(item));

    return this;
  }
}
