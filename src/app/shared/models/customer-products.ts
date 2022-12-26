import { Products } from 'src/app/shared/models/products';
export class CustomerProducts {
  id?:number;
  cartId?:number;
  productId?:number;
  quantity:number;
  product:Products;
  cart:any;

}
