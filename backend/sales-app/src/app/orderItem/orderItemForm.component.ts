import { Component, OnInit } from '@angular/core';
import { OrderItem } from './orderItem';
import { OrderItemService } from './orderItem.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './orderItemForm.component.html'
})
export class OrderItemFormComponent implements OnInit {
  public orderItem: OrderItem = new OrderItem;
  public title = "Add OrderItem";
  constructor(private orderItemService: OrderItemService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderItem();
  }


    getOrderItem(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.orderItemService.getOrderItem(id).subscribe( (orderItem) => this.orderItem = orderItem)
        }
      })
    }

    create(): void {
      this.orderItemService.create(this.orderItem)
        .subscribe(orderItem => {
          swal('New orderItem', `OrderItem created`, 'success')
        }
        );
    }

    update():void{
      this.orderItemService.update(this.orderItem)
      .subscribe( orderItem => {
        swal('OrderItem Updated', `OrderItem updated`, 'success')
      }

      )
    }

}
