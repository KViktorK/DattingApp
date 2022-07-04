export interface User {
  id: number;
  username: string;
  token: string;
  firstName: string;
  lastName: string;
}
export interface IAuthUser {
  username: string;
  password: string;
}
export class User {
  constructor(
    public username: string,
    public token: string,
    public firstName: string,
    public lastName: string
  ) {}
}
