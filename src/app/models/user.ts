export class User{
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public email: string,
    public rfc: string,
    public password: string,
    public role: string,
    public image: string,  
  ){}
}