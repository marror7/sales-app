import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html'
})

export class CustomerComponent implements OnInit {

customers: Customer[];

 constructor(private customerService: CustomerService){}

 ngOnInit(){
   this.customerService.getCustomers().subscribe(
     customers => this.customers = customers
   );
 }

 delete(customer: Customer): void {
   swal({
     title: 'Are you sure?',
     text: `Do you want to delete this costumer ${customer.name}?`,
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

       this.customerService.delete(customer.id).subscribe(
         response => {
           this.customers = this.customers.filter(cli => cli !== customer)
           swal(
             'Customer Deleted',
             `Customer ${customer.name} succesfully deleted.`,
             'success'
           )
         }
       )

     }
   })
 }
}
