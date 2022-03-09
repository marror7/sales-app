import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './customer/customer.service';
import { CustomerFormComponent } from './customer/customerForm.component';
import { ProductFormComponent } from './product/productForm.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import { OrderFormComponent } from './order/orderForm.component';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order/order.service';
import { OrderItemFormComponent } from './orderItem/orderItemForm.component';
import { OrderItemComponent } from './orderItem/orderItem.component';
import { OrderItemService } from './orderItem/orderItem.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer/form', component: CustomerFormComponent},
  {path: 'customer/form/:id', component: CustomerFormComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product/form', component: ProductFormComponent},
  {path: 'product/form/:id', component: ProductFormComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order/form', component: OrderFormComponent},
  {path: 'order/form/:id', component: OrderFormComponent},
  {path: 'orderItem', component: OrderItemComponent},
  {path: 'orderItem/form', component: OrderItemFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    CustomerFormComponent,
    ProductComponent,
    ProductFormComponent,
    OrderComponent,
    OrderFormComponent,
    OrderItemComponent,
    OrderItemFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CustomerService, ProductService, OrderService, OrderItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
