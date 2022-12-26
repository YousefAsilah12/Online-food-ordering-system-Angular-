import { Products } from 'src/app/shared/models/products';
export class Cart {
  id?:number;
  orderId?:number;
  totalAmount?:number;
  paymentType?:string;
  tax?:number;
  Products?:Products;
}
