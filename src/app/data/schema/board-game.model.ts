import { Deserializable } from './deserializable.model';

export interface IBoardGame {
  _objectid: number;
  _subtype: string;
  originalname: string;
  name: object;
  thumbnail: string;
  image: string;
  getName(): string;
  getOriginalName(): string;
}

export class BoardGame implements IBoardGame, Deserializable {
  _objectid: number;
  _subtype: string;
  originalname: string;
  name: object;
  thumbnail: string;
  image: string;

  getName(): string {
    return this.name["#text"];
  }

  getOriginalName(): string {
    return this.originalname ? this.originalname : this.name["#text"];
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
