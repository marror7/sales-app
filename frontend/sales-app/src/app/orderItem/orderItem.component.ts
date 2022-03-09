import {Component, OnInit} from '@angular/core';
import {OrderItem} from './orderItem';
import {OrderItemService} from './orderItem.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-orderItems',
  templateUrl: './orderItem.component.html'
})

export class OrderItemComponent implements OnInit {

orderItems: OrderItem[];

 constructor(private orderItemService: OrderItemService){}

 ngOnInit(){
   this.orderItemService.getOrderItems().subscribe(
     orderItems => this.orderItems = orderItems
   );
 }

 delete(orderItem: OrderItem): void {
   swal({
     title: 'Are you sure?',
     text: `Do you want to delete this orderItem?`,
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

       this.orderItemService.delete(orderItem.id).subscribe(
         response => {
           this.orderItems = this.orderItems.filter(cli => cli !== orderItem)
           swal(
             'OrderItem Deleted',
             `OrderItem succesfully deleted.`,
             'success'
           )
         }
       )

     }
   })
 }
}
