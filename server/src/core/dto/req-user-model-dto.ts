export class ReqUserModel {
  userId: string = null;

  sub: string = null;

  name: string = null;

  token: string = null;

  /**
   *
   */
  constructor(userId?: string, sub?: string, name?: string, token?: string) {
    this.userId = userId;
    this.sub = sub;
    this.name = name;
    this.token = token;
  }
}
