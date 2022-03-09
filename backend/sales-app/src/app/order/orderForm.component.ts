import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { OrderItem } from '../orderItem/orderItem';
import { OrderItemService } from '../orderItem/orderItem.service';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './orderForm.component.html'
})
export class OrderFormComponent implements OnInit {
  public order: Order = new Order;
  public orderItem: OrderItem = new OrderItem;
  public orderItems: Array<OrderItem> = [];
  public products: Product[];
  public customers: Customer[];
  public productForm:FormGroup;
  public customerForm:FormGroup;

  public title = "Add Order";
  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private orderItemService: OrderItemService,
              private customerService: CustomerService,
              private fb:FormBuilder,
              private config: NgbModalConfig,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOrder();

    this.productService.getProducts().subscribe(
      products => this.products = products
    );
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );
    this.productForm = this.fb.group({
      product: [null],
      quantity: '',
    });
    this.customerForm = this.fb.group({
      customer: [null]
    });
  }

  open(content) {
      this.modalService.open(content);
  }


    getOrder(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.orderService.getOrder(id).subscribe( (order) => this.order = order)
        }
      })
    }

    submit() {
      this.orderItem.product = this.productForm.value.product.id
      this.orderItem.quantity = this.productForm.value.quantity
      this.orderItems.push(this.orderItem)
      this.orderItemService.create(this.orderItem)
        .subscribe(orderItem => {
          this.modalService.dismissAll()
        });
    }

    create(): void {
      this.orderService.create(this.order)
        .subscribe(order => {
          this.orderItems.forEach(function (orderItem) {
            orderItem.order = order.id
          });
          this.router.navigate(['/order'])
          swal('New order', `Order created`, 'success')
        });
    }

    updateOrderItems(): void{
      this.orderItems.forEach(function (orderItem) {
        this.orderItemService.update(orderItem)
      });
    }

    update():void{
      this.orderService.update(this.order)
      .subscribe( order => {
        this.router.navigate(['/order'])
        swal('Order Updated', `Order updated`, 'success')
      }

      )
    }

}
