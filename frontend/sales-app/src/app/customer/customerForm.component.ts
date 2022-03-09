import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './customerForm.component.html'
})
export class CustomerFormComponent implements OnInit {
  public customer: Customer = new Customer;
  public title = "Add Customer";
  constructor(private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }


    getCustomer(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.customerService.getCustomer(id).subscribe( (customer) => this.customer = customer)
        }
      })
    }

    create(): void {
      this.customerService.create(this.customer)
        .subscribe(customer => {
          this.router.navigate(['/customers'])
          swal('New customer', `Customer ${customer.name} created`, 'success')
        }
        );
    }

    update():void{
      this.customerService.update(this.customer)
      .subscribe( customer => {
        this.router.navigate(['/customers'])
        swal('Customer Updated', `Customer ${customer.name} updated`, 'success')
      }

      )
    }

}
