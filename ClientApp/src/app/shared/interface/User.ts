export interface User {
  id: number;
  name: string;
  token: string;
}
export class User {
  constructor(public name: string, public token: string) {}
}
