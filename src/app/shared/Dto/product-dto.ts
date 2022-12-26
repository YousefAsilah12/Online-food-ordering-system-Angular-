import { Categories } from "../models/categories";

export class ProductDto {
  id?:string;
  supplierId?:number;
  categoryId?:number;
  serialNumber?:number
  productName?:string ;
  productDescription?: string;
  productPrice? :number;
  image?: string;
  active?:boolean ;
  discount?: number;
  stockQuanitity?:number ;
}
