import { Customer } from 'src/app/shared/models/customer';
export class Orders {
  id?:number;
  customerId?:number;
  employeeId?:number;
  orderNumber?:number;
  orderDate?:Date;
  frieght?:number;
  customer?:Customer;
  employee?:any;


}
