import { IDeserializable } from './deserializable.model';

export interface IGameVersion {
  thumbnail: string;
  image: string;
  name: object;
  yearpublished: object;
}

export class GameVersion implements IGameVersion, IDeserializable {
  thumbnail: string;
  image: string;
  name: object;
  yearpublished: object;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
