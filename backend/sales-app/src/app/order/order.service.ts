import { Injectable } from '@angular/core';
import { Order } from './order';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  private urlEndPoint: string = 'http://localhost:8080/api/orders';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Order[])
    );
  }

  create(order: Order) : Observable<Order> {
    return this.http.post<Order>(this.urlEndPoint, order, {headers: this.httpHeaders})
  }

  getOrder(id): Observable<Order>{
    return this.http.get<Order>(`${this.urlEndPoint}/${id}`)
  }

  update(order: Order): Observable<Order>{
    return this.http.put<Order>(`${this.urlEndPoint}/${order.id}`, order, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Order>{
    return this.http.delete<Order>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
