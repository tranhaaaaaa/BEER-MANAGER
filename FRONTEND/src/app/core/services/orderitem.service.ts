import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../models/odata-response.model';
import { OrderItem } from '../models/db.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllOrderItem(): Observable<ODataResponse> {
    let url = '/OrderItems?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<OrderItem> = this.jsonConvert.deserializeArray(
          odataRes.value,
          OrderItem
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getOrderItemById(Id: any): Observable<ODataResponse> {
    let url = `/OrderItems?$filter=Id eq ${Id}&$expand=OrderU
&$expand=ProductU
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<OrderItem> = this.jsonConvert.deserializeArray(
          odateRes.value,
          OrderItem
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateOrderItem(formData: any): Observable<OrderItem> {
    let url = `/OrderItems`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateOrderItem(formData: any, Id: any): Observable<OrderItem> {
    let url = `/OrderItems`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteOrderItem(id: any): Observable<OrderItem> {
    return super.deleteEntity('/OrderItems', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getOrderItemByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/OrderItems?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<OrderItem> = this.jsonConvert.deserializeArray(
          odataRes.value,
          OrderItem
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
