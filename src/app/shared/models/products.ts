import { Categories } from './categories';
export class Products {
  id?:string;
  supplierId?:number;
  categoryId?:number;
  serialNumber?:string
  productName?:string ;
  productDescription?: string;
  productPrice? :number;
  image?: string;
  active?:boolean ;
  discount?: number;
  stockQuanitity?:number ;
  supplier?:any ;
  category?:Categories;
  code?:string;
  rating?:number;

}
export class ordersProducts {
  customerId?:number;
  orderId?:number;
  products?:Products[];
}
