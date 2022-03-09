import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import {OrderService} from './order.service';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';

import swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html'
})

export class OrderComponent implements OnInit {

orders: Order[];
products: Product[];

 constructor(private orderService: OrderService,
              private productService: ProductService){}

 ngOnInit(){
   this.orderService.getOrders().subscribe(
     orders => this.orders = orders
   );
   this.productService.getProducts().subscribe(
     products => this.products = products
   );
 }

 delete(order: Order): void {
   swal({
     title: 'Are you sure?',
     text: `Do you want to delete this order?`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Confirm',
     cancelButtonText: 'Cancel',
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false,
     reverseButtons: true
   }).then((result) => {
     if (result.value) {

       this.orderService.delete(order.id).subscribe(
         response => {
           this.orders = this.orders.filter(cli => cli !== order)
           swal(
             'Order Deleted',
             `Order succesfully deleted.`,
             'success'
           )
         }
       )

     }
   })
 }
}
