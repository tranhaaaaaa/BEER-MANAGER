import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../models/odata-response.model';
import { Shop } from '../models/db.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllShop(): Observable<ODataResponse> {
    let url = '/Shops?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Shop> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Shop
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getShopById(Id: any): Observable<ODataResponse> {
    let url = `/Shops?$filter=Id eq ${Id}&$expand=Orders
&$expand=Products
&$expand=Users
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Shop> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Shop
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateShop(formData: any): Observable<Shop> {
    let url = `/Shops`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateShop(formData: any, Id: any): Observable<Shop> {
    let url = `/Shops`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteShop(id: any): Observable<Shop> {
    return super.deleteEntity('/Shops', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getShopByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Shops?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Shop> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Shop
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
