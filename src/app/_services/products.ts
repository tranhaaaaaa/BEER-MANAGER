import { Injectable } from '@angular/core';
import { ODataResponse } from '../_models/data-response.model';
import { JsonConvert } from 'json2typescript';
import { Api } from './api';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../_models/db.model';

@Injectable({
  providedIn: 'root',
})
export class Products extends Api{
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllProduct(): Observable<ODataResponse> {
    let url = '/Products';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Product> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Product
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getProductById(Id: any): Observable<ODataResponse> {
    let url = `/Products?$filter=ProductUid eq ${Id}
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Product> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Product
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateProduct(formData: any): Observable<Product> {
    let url = `/Products`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateProduct(formData: any, Id: any): Observable<Product> {
    let url = `/Products`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteProduct(id: any): Observable<Product> {
    return super.deleteEntity('/Products', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getProductByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Products?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Product> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Product
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
