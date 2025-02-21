export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;

  constructor(name: string, email: string, password: string, admin: boolean) {
    this.id = "";
    this.name = name;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
