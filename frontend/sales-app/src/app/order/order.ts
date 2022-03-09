import { Customer } from '../customer/customer';
//import { Address } from '../address/address';
import { OrderItem } from '../orderItem/orderItem';


export class Order {
  id: number;
  number: string;
  paymentType: string;
  createdDate: Date;
  customer: Customer;
  totalValue: number;
  //address: Address;
  orderItems: Array<OrderItem>;
}
