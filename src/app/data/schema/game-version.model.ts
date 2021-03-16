import { IDeserializable } from './deserializable.model';

export interface IGameVersion {
  thumbnail: string;
  image: string;
  name: any;
  yearpublished: any;
}

export class GameVersion implements IGameVersion, IDeserializable {
  thumbnail: string;
  image: string;
  name: any;
  yearpublished: any;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
