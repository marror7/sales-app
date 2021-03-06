import { Injectable } from '@angular/core';
import { Customer } from './customer';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  private urlEndPoint: string = 'http://localhost:8080/api/customers';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Customer[])
    );
  }

  create(customer: Customer) : Observable<Customer> {
    return this.http.post<Customer>(this.urlEndPoint, customer, {headers: this.httpHeaders})
  }

  getCustomer(id): Observable<Customer>{
    return this.http.get<Customer>(`${this.urlEndPoint}/${id}`)
  }

  update(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.urlEndPoint}/${customer.id}`, customer, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Customer>{
    return this.http.delete<Customer>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
