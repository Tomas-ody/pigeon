export class Auth {
    constructor(
      public username: string,
      public password: string
    ){}
  
    toString() {
      return `Name: ${this.username}, password: ${this.password}`;
    }
  }