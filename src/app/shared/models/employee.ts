import { Orders } from './orders';
export class Employee {
  id?:number;
  firstName?:string;
  lastName?:string;
  image?:string;
  password?:string;
  homeNo?:number;
  street?:string;
  city?:string;
  hireDate?:Date;
  birthDate?:Date;
  email?:string;
  role?:string;
  orders?:Orders
}
