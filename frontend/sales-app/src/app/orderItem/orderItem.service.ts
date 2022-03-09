import { Injectable } from '@angular/core';
import { OrderItem } from './orderItem';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderItemService {
  private urlEndPoint: string = 'http://localhost:8080/api/orderItems';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getOrderItems(): Observable<OrderItem[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as OrderItem[])
    );
  }

  create(orderItem: OrderItem) : Observable<OrderItem> {
    return this.http.post<OrderItem>(this.urlEndPoint, orderItem, {headers: this.httpHeaders})
  }

  getOrderItem(id): Observable<OrderItem>{
    return this.http.get<OrderItem>(`${this.urlEndPoint}/${id}`)
  }

  update(orderItem: OrderItem): Observable<OrderItem>{
    return this.http.put<OrderItem>(`${this.urlEndPoint}/${orderItem.id}`, orderItem, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<OrderItem>{
    return this.http.delete<OrderItem>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
