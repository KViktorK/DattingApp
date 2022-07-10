import { IPhoto } from "./IPhoto";

export interface IMember {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: IPhoto[];
}
