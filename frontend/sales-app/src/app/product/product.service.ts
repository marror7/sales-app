import { Injectable } from '@angular/core';
import { Product } from './product';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private urlEndPoint: string = 'http://localhost:8080/api/products';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Product[])
    );
  }

  create(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.urlEndPoint, product, {headers: this.httpHeaders})
  }

  getProduct(id): Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`)
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.urlEndPoint}/${product.id}`, product, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
