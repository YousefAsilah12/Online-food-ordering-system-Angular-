import { Categories } from "./categories";

export interface ProductCopy {
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
  supplier?:any ;
  category?:Categories;
  code?:string;
  rating?:number;
}
