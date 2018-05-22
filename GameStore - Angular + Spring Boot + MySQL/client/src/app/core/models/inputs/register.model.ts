export class RegisterModel {

  constructor(
    public fullName: string,
    public email: string,
    public username: string,
    public password: string,
    public confirmPassword?: string
  ) {}
}
