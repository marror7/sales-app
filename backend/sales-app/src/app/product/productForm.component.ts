import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './productForm.component.html'
})
export class ProductFormComponent implements OnInit {
  public product: Product = new Product;
  public title = "Add Product";
  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }


    getProduct(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.productService.getProduct(id).subscribe( (product) => this.product = product)
        }
      })
    }

    create(): void {
      this.productService.create(this.product)
        .subscribe(product => {
          this.router.navigate(['/product'])
          swal('New product', `Product ${product.description} created`, 'success')
        }
        );
    }

    update():void{
      this.productService.update(this.product)
      .subscribe( product => {
        this.router.navigate(['/product'])
        swal('Product Updated', `Product ${product.description} updated`, 'success')
      }

      )
    }

}
