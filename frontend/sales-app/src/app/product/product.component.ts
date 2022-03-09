import {Component, OnInit} from '@angular/core';
import {Product} from './product';
import {ProductService} from './product.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {

products: Product[];

 constructor(private productService: ProductService){}

 ngOnInit(){
   this.productService.getProducts().subscribe(
     products => this.products = products
   );
 }

 delete(product: Product): void {
   swal({
     title: 'Are you sure?',
     text: `Do you want to delete this product ${product.description}?`,
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

       this.productService.delete(product.id).subscribe(
         response => {
           this.products = this.products.filter(cli => cli !== product)
           swal(
             'Product Deleted',
             `Product ${product.description} succesfully deleted.`,
             'success'
           )
         }
       )

     }
   })
 }
}
